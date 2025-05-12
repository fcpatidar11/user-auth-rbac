const userHelper = require("@helpers/user.helper");
const appMessage = require("@messages/app.message");
const serverLogger = require("@loggers/server.logger");
const roleHelper = require("@helpers/role.helper");
const appConstant = require("@constants/app.constant");
const responseFormatter = require("@formatters/grpc.response");
const entityPermissionGroupHelper = require("@helpers/entityPermissionGroup.helper");

module.exports = {
    updateUserRoles: async (call, callback) => {
        let { assignRoles, removeRoles } = call.request;
        const { userId } = call.request.reqParams || {};
        try {
            let data = await userHelper.retrieve({ _id: userId });
            let defaultRoles = await roleHelper.retrieves({ isSystem: true });
            let defaultRoleIds = defaultRoles.map(x => String(x._id));

            if (assignRoles && assignRoles.filter(x => defaultRoleIds.includes(x)).length) {
                return responseFormatter.handleInvalidArgument(call, callback, appMessage.userRole.defaultRoleNotAssigned);
            }

            const alreadyAssignedSystemRoles = data.roles.filter(x => x.isSystem).map(x => String(x._id));
            const alreadyAssignedRoles = data.roles.map(x => String(x._id));
            if (alreadyAssignedSystemRoles.some(roleId => removeRoles.includes(roleId))) {
                return responseFormatter.handleInvalidArgument(call, callback, appMessage.userRole.defaultRoleNotRemove);
            } else if (alreadyAssignedSystemRoles.some(roleId => assignRoles.includes(roleId))) {
                return responseFormatter.handleInvalidArgument(call, callback, appMessage.userRole.alreadyAssign);
            }

            assignRoles = assignRoles.filter(x => !alreadyAssignedRoles.includes(x));
            removeRoles = removeRoles.filter(x => alreadyAssignedRoles.includes(x));
            const updateRoles = data.roles.filter(x => !removeRoles.includes(String(x._id))).concat(assignRoles);
            data = await userHelper.update({ _id: userId }, {
                roles: updateRoles
            });

            return responseFormatter.handleOk(call, callback, appMessage.userRole.update, { data }, {
                performedFor: data._id,
                actionType: appConstant.LOGGED_ACTIONS.UPDATE,
                moduleType: appConstant.LOGGED_MODULES.UserRole,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.User,
            });
        } catch (error) {
            serverLogger.error(appMessage.userRole.updateError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.userRole.updateError);
        }
    },
    revokeUserPermissions: async (call, callback) => {
        try {
            const { assignPermissions, removePermissions } = call.request;
            const reqParams = call.request.reqParams || {};
            const { userId } = reqParams;
            const userTypeAccessPermission = await entityPermissionGroupHelper.retrieve({ name: reqParams.userType });
            let userTypeAccessRevokePermissions = [];
            if (userTypeAccessPermission && userTypeAccessPermission.revokePermissions) {
                userTypeAccessRevokePermissions = userTypeAccessPermission.revokePermissions.map(x => String(x._id));
            }

            if (assignPermissions.some(x => !userTypeAccessRevokePermissions.includes(x))) {
                return responseFormatter.handleInvalidArgument(call, callback, appMessage.permission.notFound);
            }

            let data = await userHelper.retrieve({ _id: userId });
            if (!data) {
                return responseFormatter.handleNotFound(call, callback, appMessage.user.notFound);
            }
            let revokePermissions = data?.revokePermissions || [];
            revokePermissions = [
                ...new Set(
                    (revokePermissions.map(x => String(x._id)).concat(assignPermissions)).filter(m => {
                        return !removePermissions.includes(m)
                    })
                )
            ];
            data = await userHelper.update({ _id: userId }, {
                revokePermissions
            });

            return responseFormatter.handleOk(call, callback, appMessage.userRole.update, { data }, {
                performedFor: data._id,
                actionType: appConstant.LOGGED_ACTIONS.UPDATE,
                moduleType: appConstant.LOGGED_MODULES.UserRevokePermission,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.User,
            });
        } catch (error) {
            serverLogger.error(appMessage.userRole.updateError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.userRole.updateError);
        }
    },
    updateUserPermissions: async (call, callback) => {
        const { assignPermissions, removePermissions } = call.request;
        const reqParams = call.request.reqParams || {};
        const { userId } = reqParams;
        const userTypeAccessPermission = await entityPermissionGroupHelper.retrieve({ name: reqParams.userType });
        let userTypeAccessGrantPermissions = [];
        if (userTypeAccessPermission && userTypeAccessPermission.grantPermissions) {
            userTypeAccessGrantPermissions = userTypeAccessPermission.grantPermissions.map(x => String(x._id));
        }

        if (assignPermissions.some(x => !userTypeAccessGrantPermissions.includes(x))) {
            return responseFormatter.handleInvalidArgument(call, callback, appMessage.permission.notFound);
        }

        try {
            let data = await userHelper.retrieve({ _id: userId });
            const updatePermissions = data.grantPermissions.map(x => String(x._id)).filter(x => !removePermissions.includes(x)).concat(assignPermissions);
            data = await userHelper.update({ _id: userId }, {
                grantPermissions: [...new Set(updatePermissions)]
            });

            return responseFormatter.handleOk(call, callback, appMessage.userPermission.update, { data }, {
                performedFor: data._id,
                actionType: appConstant.LOGGED_ACTIONS.UPDATE,
                moduleType: appConstant.LOGGED_MODULES.UserPermission,
                entityId: data._id,
                entityType: appConstant.LOGGED_ENTITY_TYPES.User,
            });
        } catch (error) {
            serverLogger.error(appMessage.userPermission.updateError, null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.userPermission.updateError);
        }
    }
};