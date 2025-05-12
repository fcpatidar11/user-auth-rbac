const userContactModel = require("@src/grpc/models/userContact.model")
const userContactValidations = require("@interceptors/validations/user.validation");
const authorizationMiddleware = require("@interceptors/middlewares/authorization.middleware");
const permissionConstant = require("@shared/constants/permission.constant");
const authMiddleware = require("@interceptors/middlewares/auth.middleware");

module.exports = {
    createProfileContact: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.me.contact.create]
                ],
                userContactValidations.createContact(
                    userContactModel.createProfileContact
                )
            )
        )
    ),
    updateProfileContact: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.me.contact.update]
                ],
                userContactValidations.updateContact(
                    userContactModel.updateProfileContact
                )
            )
        )
    ),
    deleteProfileContact: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.me.contact.delete]
                ],
                userContactValidations.deleteContact(
                    userContactModel.deleteProfileContact
                )
            )
        )
    ),
    fetchProfileContact: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.me.contact.view]
                ],
                userContactModel.fetchProfileContact
            )
        )
    ),
    fetchProfileContacts: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.me.contact.view]
                ],
                userContactModel.fetchProfileContacts
            )
        )
    ),
    createUserContact: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(true,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.admin.contact.create],
                    [permissionConstant.user.partner.contact.create],
                    [permissionConstant.user.customer.contact.create],
                    [permissionConstant.user.technician.contact.create],
                    [permissionConstant.user.subsidiary.contact.create]
                ],
                userContactValidations.createUserContact(
                    userContactModel.createUserContact
                )
            )
        )
    ),
    updateUserContact: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(true,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.admin.contact.update],
                    [permissionConstant.user.partner.contact.update],
                    [permissionConstant.user.customer.contact.update],
                    [permissionConstant.user.technician.contact.update],
                    [permissionConstant.user.subsidiary.contact.update]
                ],
                userContactValidations.updateUserContact(
                    userContactModel.updateUserContact
                )
            )
        )
    ),
    deleteUserContact: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(true,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.admin.contact.delete],
                    [permissionConstant.user.partner.contact.delete],
                    [permissionConstant.user.customer.contact.delete],
                    [permissionConstant.user.technician.contact.delete],
                    [permissionConstant.user.subsidiary.contact.delete]
                ],
                userContactValidations.deleteUserContact(
                    userContactModel.deleteUserContact
                )
            )
        )
    ),
    fetchUserContact: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(true,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.admin.contact.view],
                    [permissionConstant.user.partner.contact.view],
                    [permissionConstant.user.customer.contact.view],
                    [permissionConstant.user.technician.contact.view],
                    [permissionConstant.user.subsidiary.contact.view]
                ],
                userContactValidations.fetchUserContact(
                    userContactModel.fetchUserContact
                )
            )
        )
    ),
    fetchUserContacts: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(true,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.admin.contact.views],
                    [permissionConstant.user.partner.contact.views],
                    [permissionConstant.user.customer.contact.views],
                    [permissionConstant.user.technician.contact.views],
                    [permissionConstant.user.subsidiary.contact.views]
                ],
                userContactValidations.fetchUserContacts(
                    userContactModel.fetchUserContacts
                )
            )
        )
    )
};