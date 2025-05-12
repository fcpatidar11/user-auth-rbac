const userAddressModel = require("@src/grpc/models/userAddress.model")
const userAddressValidations = require("@interceptors/validations/user.validation");
const authorizationMiddleware = require("@interceptors/middlewares/authorization.middleware");
const permissionConstant = require("@shared/constants/permission.constant");
const authMiddleware = require("@interceptors/middlewares/auth.middleware");

module.exports = {
    createProfileAddress: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.me.address.create]
                ],
                userAddressValidations.createAddress(
                    userAddressModel.createProfileAddress
                )
            )
        )
    ),
    updateProfileAddress: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.me.address.update]
                ],
                userAddressValidations.updateAddress(
                    userAddressModel.updateProfileAddress
                )
            )
        )
    ),
    deleteProfileAddress: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.me.address.delete]
                ],
                userAddressValidations.deleteAddress(
                    userAddressModel.deleteProfileAddress
                )
            )
        )
    ),
    fetchProfileAddress: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.me.address.view]
                ],
                userAddressModel.fetchProfileAddress
            )
        )
    ),
    fetchProfileAddresses: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(false,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.me.address.view]
                ],
                userAddressModel.fetchProfileAddresses
            )
        )
    ),
    createUserAddress: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(true,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.admin.address.create],
                    [permissionConstant.user.partner.address.create],
                    [permissionConstant.user.customer.address.create],
                    [permissionConstant.user.technician.address.create],
                    [permissionConstant.user.subsidiary.address.create]
                ],
                userAddressValidations.createUserAddress(
                    userAddressModel.createAddress
                )
            )
        )
    ),
    updateUserAddress: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(true,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.admin.address.update],
                    [permissionConstant.user.partner.address.update],
                    [permissionConstant.user.customer.address.update],
                    [permissionConstant.user.technician.address.update],
                    [permissionConstant.user.subsidiary.address.update]
                ],
                userAddressValidations.updateUserAddress(
                    userAddressModel.updateAddress
                )
            )
        )
    ),
    deleteUserAddress: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(true,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.admin.address.delete],
                    [permissionConstant.user.partner.address.delete],
                    [permissionConstant.user.customer.address.delete],
                    [permissionConstant.user.technician.address.delete],
                    [permissionConstant.user.subsidiary.address.delete]
                ],
                userAddressValidations.deleteUserAddress(
                    userAddressModel.deleteAddress
                )
            )
        )
    ),
    fetchUserAddress: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(true,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.admin.address.view],
                    [permissionConstant.user.partner.address.view],
                    [permissionConstant.user.customer.address.view],
                    [permissionConstant.user.technician.address.view],
                    [permissionConstant.user.subsidiary.address.view]
                ],
                userAddressValidations.fetchUserAddress(
                    userAddressModel.fetchAddress
                )
            )
        )
    ),
    fetchUserAddresses: authMiddleware.validateAuthToken(
        authorizationMiddleware.authorizeUser(true,
            authorizationMiddleware.authorizePermission(
                [
                    [permissionConstant.user.admin.address.views],
                    [permissionConstant.user.partner.address.views],
                    [permissionConstant.user.customer.address.views],
                    [permissionConstant.user.technician.address.views],
                    [permissionConstant.user.subsidiary.address.views]
                ],
                userAddressValidations.fetchUserAddresses(
                    userAddressModel.fetchAddresses
                )
            )
        )
    )
};