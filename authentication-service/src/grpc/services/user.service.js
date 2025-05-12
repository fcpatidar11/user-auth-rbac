const userModel = require("@models/user.model")
const userValidations = require("@interceptors/validations/user.validation");
const authorizationMiddleware = require("@interceptors/middlewares/authorization.middleware");
const permissionConstant = require("@shared/constants/permission.constant");
const authMiddleware = require("@interceptors/middlewares/auth.middleware");

module.exports = {
    fetchProfile: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            userModel.fetchProfile
        )
    ),
    fetchProfileActivityLogs: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            userModel.fetchProfileActivityLogs
        )
    ),
    updateProfile: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.me.update]
                ],
                userValidations.updateProfile(
                    userModel.updateProfile
                )
            )
        )
    ),
    updateProfilePassword: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.me.password.change]
                ],
                userValidations.changePassword(
                    userModel.updateProfilePassword
                )
            )
        )
    ),
    fetchUserActivityLogs: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [
                        permissionConstant.user.admin.activityLogs.views,
                        permissionConstant.user.partner.activityLogs.views,
                        permissionConstant.user.customer.activityLogs.views,
                        permissionConstant.user.technician.activityLogs.views,
                        permissionConstant.user.subsidiary.activityLogs.views
                    ]
                ],
                userModel.fetchUserActivityLogs
            )
        )
    ),
    createUser: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.admin.create],
                    [permissionConstant.user.partner.create],
                    [permissionConstant.user.customer.create],
                    [permissionConstant.user.technician.create],
                    [permissionConstant.user.subsidiary.create]
                ],
                userValidations.createUser(
                    userModel.inviteUser
                )
            )
        )
    ),
    updateUser: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(true,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.admin.update],
                    [permissionConstant.user.partner.update],
                    [permissionConstant.user.customer.update],
                    [permissionConstant.user.technician.update],
                    [permissionConstant.user.subsidiary.update]
                ],
                userValidations.updateUser(
                    userModel.updateUser
                )
            )
        )
    ),
    updateUserStatus: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(true,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.admin.status],
                    [permissionConstant.user.partner.status],
                    [permissionConstant.user.customer.status],
                    [permissionConstant.user.technician.status],
                    [permissionConstant.user.subsidiary.status]
                ],
                userValidations.updateUserStatus(
                    userModel.updateUserStatus
                )
            )
        )
    ),
    fetchUserById: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(true,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.admin.view],
                    [permissionConstant.user.partner.view],
                    [permissionConstant.user.customer.view],
                    [permissionConstant.user.technician.view],
                    [permissionConstant.user.subsidiary.view]
                ],
                userValidations.fetchUserById(
                    userModel.fetchUserById
                )
            )
        )
    ),
    fetchUsers: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(true,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.admin.views],
                    [permissionConstant.user.partner.views],
                    [permissionConstant.user.customer.views],
                    [permissionConstant.user.technician.views],
                    [permissionConstant.user.subsidiary.views]
                ],
                userModel.fetchUsers
            )
        )
    ),
    resendUserInvitation: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(true,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.admin.create],
                    [permissionConstant.user.partner.create],
                    [permissionConstant.user.customer.create],
                    [permissionConstant.user.technician.create],
                    [permissionConstant.user.subsidiary.create]
                ],
                userValidations.resendUserInvitation(
                    userModel.resendUserInvitation
                )
            )
        )
    )
};