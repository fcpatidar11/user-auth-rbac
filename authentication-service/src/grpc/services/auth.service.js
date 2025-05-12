const authModel = require("@models/auth.model")
const authValidations = require("@interceptors/validations/auth.validation");
const authMiddleware = require("@interceptors/middlewares/auth.middleware");
const authorizationMiddleware = require("@interceptors/middlewares/authorization.middleware");

module.exports = {
    login: authValidations.login(authModel.login),
    forgotPassword: authValidations.forgotPassword(authModel.forgotPassword),
    resetPassword: authValidations.resetPassword(
        authMiddleware.validateResetPasswordToken(
            authModel.resetPassword
        )
    ),
    acceptUserInvitation: authValidations.acceptUserInvitation(
        authMiddleware.validateInvitationVerificationToken(
            authModel.acceptUserInvitation
        )
    ),
    fetchUserInvitation: authValidations.fetchUserInvitation(
        authModel.fetchUserInvitation
    ),
    fetchDashboardOverview: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authModel.fetchDashboardOverview
        )
    )

};