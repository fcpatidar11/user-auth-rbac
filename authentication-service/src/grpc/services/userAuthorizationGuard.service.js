const userAuthorizationGuardModel = require("@src/grpc/models/userAuthorizationGuard.model");
const userValidations = require("@interceptors/validations/user.validation");
const authorizationMiddleware = require("@interceptors/middlewares/authorization.middleware");
const permissionConstant = require("@shared/constants/permission.constant");
const authMiddleware = require("@interceptors/middlewares/auth.middleware");

module.exports = {
    updateUserPermissions: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(true,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.admin.rbac.grantPermission.update],
                    [permissionConstant.user.customer.rbac.grantPermission.update],
                    [permissionConstant.user.partner.rbac.grantPermission.update],
                    [permissionConstant.user.technician.rbac.grantPermission.update],
                    [permissionConstant.user.subsidiary.rbac.grantPermission.update],
                ],
                userValidations.updateUserPermissions(
                    userAuthorizationGuardModel.updateUserPermissions
                )
            )
        )
    ),
    updateUserRoles: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(true,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.admin.rbac.role.update],
                    [permissionConstant.user.customer.rbac.role.update],
                    [permissionConstant.user.partner.rbac.role.update],
                    [permissionConstant.user.technician.rbac.role.update],
                    [permissionConstant.user.subsidiary.rbac.role.update]
                ],
                userValidations.updateUserRoles(
                    userAuthorizationGuardModel.updateUserRoles
                )
            )
        )
    ),
    revokeUserPermissions: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(true,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.admin.rbac.revokePermission.update],
                    [permissionConstant.user.customer.rbac.revokePermission.update],
                    [permissionConstant.user.partner.rbac.revokePermission.update],
                    [permissionConstant.user.technician.rbac.revokePermission.update],
                    [permissionConstant.user.subsidiary.rbac.revokePermission.update]
                ],
                userValidations.revokeUserRolePermissions(
                    userAuthorizationGuardModel.revokeUserPermissions
                )
            )
        )
    )
};