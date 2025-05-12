const permissionModel = require("@models/permission.model")
const permissionValidations = require("@interceptors/validations/permission.validation");
const authorizationMiddleware = require("@interceptors/middlewares/authorization.middleware");
const permissionConstant = require("@shared/constants/permission.constant");
const authMiddleware = require("@interceptors/middlewares/auth.middleware");

module.exports = {
    createPermission: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.permission.create]
                ],
                permissionValidations.createPermission(
                    permissionModel.createPermission
                )
            )
        )
    ),
    updatePermission: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.permission.update]
                ],
                permissionValidations.updatePermission(
                    permissionModel.updatePermission
                )
            )
        )
    ),
    updatePermissionStatus: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.permission.status]
                ],
                permissionValidations.updatePermissionStatus(
                    permissionModel.updatePermissionStatus
                )
            )
        )
    ),
    fetchPermissionById: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.permission.view]
                ],
                permissionValidations.fetchPermissionById(
                    permissionModel.fetchPermissionById
                )
            )
        )
    ),
    fetchPermissionByCode: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.permission.view]
                ],
                permissionModel.fetchPermissionByCode

            )
        )
    ),
    fetchPermissions: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.permission.views]
                ],
                permissionModel.fetchPermissions

            )
        )
    ),
    createPermissionGroup: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.permission.group.create]
                ],
                permissionValidations.createPermissionGroup(
                    permissionModel.createPermissionGroup
                )
            )
        )
    ),
    updatePermissionGroup: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.permission.group.update]
                ],
                permissionValidations.updatePermissionGroup(
                    permissionModel.updatePermissionGroup
                )
            )
        )
    ),
    updatePermissionGroupStatus: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.permission.group.status]
                ],
                permissionValidations.updatePermissionGroupStatus(
                    permissionModel.updatePermissionGroupStatus
                )
            )
        )
    ),
    fetchPermissionGroupById: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.permission.group.view]
                ],
                permissionValidations.fetchPermissionGroupById(
                    permissionModel.fetchPermissionGroupById
                )
            )
        )
    ),
    fetchPermissionGroups: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.permission.group.views]
                ],
                permissionModel.fetchPermissionGroups

            )
        )
    ),
    createEntityPermissionGroup: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.entityPermissionGroup.create]
                ],
                permissionValidations.createEntityPermissionGroup(
                    permissionModel.createEntityPermissionGroup
                )
            )
        )
    ),
    updateEntityPermissionGroup: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.entityPermissionGroup.update]
                ],
                permissionValidations.updateEntityPermissionGroup(
                    permissionModel.updateEntityPermissionGroup
                )
            )
        )
    ),
    updateEntityPermissionGroupStatus: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.entityPermissionGroup.status]
                ],
                permissionValidations.updateEntityPermissionGroupStatus(
                    permissionModel.updateEntityPermissionGroupStatus
                )
            )
        )
    ),
    fetchEntityPermissionGroupById: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.entityPermissionGroup.view]
                ],
                permissionValidations.fetchPermissionGroupById(
                    permissionModel.fetchEntityPermissionGroupById
                )
            )
        )
    ),
    fetchEntityPermissionGroupByName: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.entityPermissionGroup.view]
                ],
                permissionModel.fetchEntityPermissionGroupByName
            )
        )
    ),
    fetchEntityPermissionGroups: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.entityPermissionGroup.views]
                ],
                permissionModel.fetchEntityPermissionGroups
            )
        )
    )
}