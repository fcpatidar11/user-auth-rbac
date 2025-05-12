const appMessage = require("@messages/app.message");
const responseFormatter = require("@formatters/grpc.response");
const userHelper = require("@helpers/user.helper");
const userRelationshipHelper = require("@helpers/userRelationship.helper");
const { DEFAULT_ROLES } = require("@shared/constants/app.constant");

module.exports = {
    authorizeUser: (isActUser, method) => async (call, callback) => {
        try {
            const metadata = call.metadata?.getMap() || {};
            const userId = metadata["auth-user-id"] || null;

            // Validate user exists
            const authUserData = await userHelper.retrieve({ _id: userId });
            if (!authUserData) {
                return responseFormatter.handleUnauthenticated(call, callback, appMessage.authorization.tokenInvalid);
            }

            if (!authUserData.isEmailVerified) {
                return responseFormatter.handleUnauthenticated(call, callback, appMessage.user.emailNotVerified);
            }

            if (!authUserData.isActive) {
                return responseFormatter.handleUnauthenticated(call, callback, appMessage.user.blocked);
            }

            // Handle relationship checks
            const reqParams = call.request.reqParams || {};
            let userRelationshipInfo = null;
            let isRelationship = false;
            let actUserData = null;

            if (isActUser && reqParams.userId && userId !== reqParams.userId) {
                actUserData = await userHelper.retrieve({ _id: reqParams.userId });
                if (!actUserData) {
                    return responseFormatter.handleUnauthenticated(call, callback, appMessage.user.notFound);
                }

                // Check relationships in parallel
                const [userParentRelationshipInfo, userChildrenRelationshipInfo] = await Promise.all([
                    userRelationshipHelper.retrieve({ parentUser: userId, childUser: reqParams.userId }),
                    userRelationshipHelper.retrieve({ parentUser: reqParams.userId, childUser: userId })
                ]);

                userRelationshipInfo = userParentRelationshipInfo;
                isRelationship = Boolean(userParentRelationshipInfo || userChildrenRelationshipInfo);
                call.metadata.add("is-auth-and-act-users-relationship", isRelationship.toString());
            }

            // Process act user roles if available
            if (actUserData?.roles) {
                for (const role of actUserData.roles) {
                    if (role.isSystem) {
                        call.metadata.add("act-user-system-role-names", role.name);
                        call.metadata.add("act-user-system-role-ids", role._id.toString());
                    }
                }
            }

            // Add user metadata efficiently
            // Individual permissions
            if (authUserData.grantPermissions?.length) {
                authUserData.grantPermissions.forEach(permission => {
                    call.metadata.add("auth-user-grant-permission-codes", permission.code);
                    call.metadata.add("auth-user-grant-permission-ids", permission._id.toString());
                });
            }

            // User roles and their permissions
            if (authUserData.roles?.length) {
                for (const role of authUserData.roles) {
                    call.metadata.add("auth-user-role-names", role.name);
                    call.metadata.add("auth-user-role-ids", role._id.toString());

                    if (role.isSystem) {
                        call.metadata.add("auth-user-system-role-names", role.name);
                        call.metadata.add("auth-user-system-role-ids", role._id.toString());
                    }

                    // Add role permissions
                    if (role.permissions?.length) {
                        role.permissions.forEach(permission => {
                            call.metadata.add("auth-user-role-permission-codes", permission.code);
                            call.metadata.add("auth-user-role-permission-ids", permission._id.toString());

                            if (role.isSystem) {
                                call.metadata.add("auth-user-system-role-permission-codes", permission.code);
                                call.metadata.add("auth-user-system-role-permission-ids", permission._id.toString());
                            }
                        });
                    }
                }
            }

            // Revoked permissions
            if (authUserData.revokePermissions?.length) {
                authUserData.revokePermissions.forEach(permission => {
                    call.metadata.add("auth-user-system-revoke-permission-codes", permission.code);
                    call.metadata.add("auth-user-revoke-permission-ids", permission._id.toString());
                });
            }

            // Relationship permissions
            if (userRelationshipInfo?.permissions?.length) {
                userRelationshipInfo.permissions.forEach(permission => {
                    call.metadata.add("act-user-permission-codes", permission.code);
                    call.metadata.add("act-user-permission-ids", permission._id.toString());
                });
            }

            call.metadata.add("auth-user-email", authUserData._id.toString());
            return method(call, callback);
        } catch (error) {
            return responseFormatter.handleUnauthenticated(call, callback, appMessage.authorization.tokenInvalid);
        }
    },

    authorizePermission: (requiredPermissions, method) => (call, callback) => {
        // Early return if no permissions required
        if (!requiredPermissions?.length) return method(call, callback);

        // Extract metadata using destructuring for cleaner code
        const metadata = call.metadata?.getMap() || {};
        const grantPermissionCodes = call.metadata?.get("auth-user-grant-permission-codes") || [];
        const revokePermissionCodes = call.metadata?.get("auth-user-system-revoke-permission-codes") || [];
        const rolePermissionCodes = call.metadata?.get("auth-user-role-permission-codes") || [];
        const userActPermissionCodes = call.metadata?.get("act-user-permission-codes") || [];
        const systemRoleNames = call.metadata?.get("auth-user-system-role-names") || [];
        const systemActUserRoleNames = call.metadata?.get("act-user-system-role-names") || [];
        const isRelationshipFlag = call.metadata?.get("is-auth-and-act-users-relationship") || false;
        const isRelationship = Boolean(isRelationshipFlag);
        const reqParams = call.request.reqParams || {};
        const userId = metadata["auth-user-id"] || null;

        // Create Sets for faster lookups - avoids repeated array iterations
        const combinedPermissionCodes = new Set([
            ...grantPermissionCodes,
            ...rolePermissionCodes,
            ...userActPermissionCodes
        ]);
        const revokedPermissionSet = new Set(revokePermissionCodes);
        const systemRoleSet = new Set(systemRoleNames);
        const systemActUserRoleSet = new Set(systemActUserRoleNames);

        // Check act user type early - avoid unnecessary processing
        if (reqParams.userId && reqParams.userType &&
            userId !== reqParams.userId &&
            !systemActUserRoleSet.has(reqParams.userType)) {
            return responseFormatter.handleUnauthenticated(
                call,
                callback,
                appMessage.permission.inSufficientPermission
            );
        }

        // Create a map of relationships for cleaner code
        const hierarchyChecks = {
            [DEFAULT_ROLES.ADMIN]: "user:admin:",
            [DEFAULT_ROLES.PARTNER]: "user:partner:",
            [DEFAULT_ROLES.CUSTOMER]: "user:customer:",
            [DEFAULT_ROLES.SUBSIDIARY]: "user:subsidiary:",
            [DEFAULT_ROLES.TECHNICIAN]: "user:technician:"
        };
        // Filter permission groups based on user type
        const filteredPermissions = requiredPermissions
            .map(permissionGroup => {
                if (reqParams.userType) {
                    return permissionGroup.filter(permission => {
                        return hierarchyChecks[reqParams.userType] ?
                            permission.code.includes(hierarchyChecks[reqParams.userType]) :
                            true;
                    });
                }
                return permissionGroup;
            })
            .filter(group => group.length > 0);

        // Early return if no valid permission groups remain
        if (!filteredPermissions.length) {
            return responseFormatter.handleUnauthenticated(
                call,
                callback,
                appMessage.permission.inSufficientPermission
            );
        }

        // Check relationship constraints
        const checkRelationshipConstraints = () => {
            if (!reqParams.userId || !reqParams.userType || userId === reqParams.userId) {
                return true;
            }

            const isCustomerSubsidiaryUser =
                [DEFAULT_ROLES.CUSTOMER, DEFAULT_ROLES.SUBSIDIARY].includes(reqParams.userType);

            if (isCustomerSubsidiaryUser && !isRelationship) {
                const isCustomerActSubsidiary =
                    systemRoleSet.has(DEFAULT_ROLES.CUSTOMER) &&
                    systemActUserRoleSet.has(DEFAULT_ROLES.SUBSIDIARY);

                const isSubsidiaryActCustomer =
                    systemRoleSet.has(DEFAULT_ROLES.SUBSIDIARY) &&
                    systemActUserRoleSet.has(DEFAULT_ROLES.CUSTOMER);

                if (isCustomerActSubsidiary || isSubsidiaryActCustomer) {
                    return false;
                }
            }

            return true;
        };

        // Check if any permission group is fully satisfied
        const hasRequiredPermissions = filteredPermissions.some(permissionGroup => {
            // Skip groups with revoked permissions
            if (permissionGroup.some(permission => revokedPermissionSet.has(permission.code))) {
                return false;
            }

            // Check if user has at least one permission from this group
            return permissionGroup.some(permission =>
                combinedPermissionCodes.has(permission.code) && checkRelationshipConstraints()
            );
        });

        // If user has the required permissions, proceed with the method
        if (hasRequiredPermissions) {
            return method(call, callback);
        }

        // If user does not have the required permissions, return an error
        return responseFormatter.handleUnauthenticated(
            call,
            callback,
            appMessage.permission.inSufficientPermission
        );
    }
};