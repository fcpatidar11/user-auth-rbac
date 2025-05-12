const userRelationshipModel = require("@models/userRelationship.model")
const userRelationshipValidations = require("@interceptors/validations/user.validation");
const authorizationMiddleware = require("@interceptors/middlewares/authorization.middleware");
const permissionConstant = require("@shared/constants/permission.constant");
const authMiddleware = require("@interceptors/middlewares/auth.middleware");

module.exports = {
    addUserRelationship: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.customer.relationships.subsidiary]
                ],
                userRelationshipValidations.addUserRelationship(
                    userRelationshipModel.addUserRelationship
                )
            )
        )
    ),
    removeUserRelationship: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.customer.relationships.subsidiary]
                ],
                userRelationshipValidations.removeUserRelationship(
                    userRelationshipModel.removeUserRelationship
                )
            )
        )
    ),
    fetchUserRelationship: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.customer.relationships.subsidiary]
                ],
                userRelationshipValidations.fetchUserRelationship(
                    userRelationshipModel.fetchUserRelationship
                )
            )
        )
    ),
    updateUserRelationshipPermissions: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.customer.relationships.subsidiary]
                ],
                userRelationshipValidations.updateUserRelationshipPermission(
                    userRelationshipModel.updateUserRelationshipPermissions
                )
            )
        )
    )
};