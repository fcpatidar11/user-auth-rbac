const roleModel = require("@models/role.model")
const roleValidations = require("@interceptors/validations/role.validation");
const authorizationMiddleware = require("@interceptors/middlewares/authorization.middleware");
const permissionConstant = require("@shared/constants/permission.constant");
const authMiddleware = require("@interceptors/middlewares/auth.middleware");

module.exports = {
    createRole: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.role.create]
                ],
                roleValidations.createRole(
                    roleModel.createRole
                )
            )
        )
    ),
    updateRole: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.role.update]
                ],
                roleValidations.updateRole(
                    roleModel.updateRole
                )
            )
        )
    ),
    updateRoleStatus: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.role.status]
                ],
                roleValidations.updateRoleStatus(
                    roleModel.updateRoleStatus
                )
            )
        )
    ),
    fetchRoleById: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.role.view]
                ],
                roleValidations.fetchRoleById(
                    roleModel.fetchRoleById
                )
            )
        )
    ),
    fetchRoles: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.role.views]
                ],
                roleModel.fetchRoles
            )
        )
    ),
    createRoleGroup: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.role.group.create]
                ],
                roleValidations.createRoleGroup(
                    roleModel.createRoleGroup
                )
            )
        )
    ),
    updateRoleGroup: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.role.group.update]
                ],
                roleValidations.updateRoleGroup(
                    roleModel.updateRoleGroup
                )
            )
        )
    ),
    updateRoleGroupStatus: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.role.group.status]
                ],
                roleValidations.updateRoleGroupStatus(
                    roleModel.updateRoleGroupStatus
                )
            )
        )
    ),
    fetchRoleGroupById: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.role.group.view]
                ],
                roleValidations.fetchRoleGroupById(
                    roleModel.fetchRoleGroupById
                )
            )
        )
    ),
    fetchRoleGroups: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.role.group.views]
                ],
                roleModel.fetchRoleGroups
            )
        )
    )
}