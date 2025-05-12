/**
 * Address controller module for handling address-related HTTP requests
 * @module AddressController
 * @requires @formatters/api.response
 * @requires @clients/authentication.client
 */
const responseFormatter = require("@formatters/api.response");
const { userAddressService } = require("@clients/authentication.client");

/**
 * Creates a generic handler function to reduce code duplication
 * @param {Function} serviceMethod - The service method to call
 * @param {object} req - Express request object containing address data
 * @param {object} res - Express response object
 * @returns {Function} Express middleware handler
 */
const processServiceHandler = (req, res, serviceMethod) => {
    return serviceMethod(req.combineRequest, req.rpcMetaData, (error, result) => {
        return responseFormatter.serviceResponse(res, error, result);
    });
};

/**
 * Address controller with methods for handling address-related HTTP requests
*/
const addressController = {
    createProfileAddress: (req, res) => {
        return processServiceHandler(req, res, userAddressService.createProfileAddress.bind(userAddressService));
    },
    updateProfileAddress: (req, res) => {
        return processServiceHandler(req, res, userAddressService.updateProfileAddress.bind(userAddressService));
    },
    deleteProfileAddress: (req, res) => {
        return processServiceHandler(req, res, userAddressService.deleteProfileAddress.bind(userAddressService));
    },
    fetchProfileAddress: (req, res) => {
        return processServiceHandler(req, res, userAddressService.fetchProfileAddress.bind(userAddressService));
    },
    fetchProfileAddresses: (req, res) => {
        return processServiceHandler(req, res, userAddressService.fetchProfileAddresses.bind(userAddressService));
    },
    createUserAddress: (req, res) => {
        return processServiceHandler(req, res, userAddressService.createUserAddress.bind(userAddressService));
    },
    updateUserAddress: (req, res) => {
        return processServiceHandler(req, res, userAddressService.updateUserAddress.bind(userAddressService));
    },
    deleteUserAddress: (req, res) => {
        return processServiceHandler(req, res, userAddressService.deleteUserAddress.bind(userAddressService));
    },
    fetchUserAddress: (req, res) => {
        return processServiceHandler(req, res, userAddressService.fetchUserAddress.bind(userAddressService));
    },
    fetchUserAddresses: (req, res) => {
        return processServiceHandler(req, res, userAddressService.fetchUserAddresses.bind(userAddressService));
    }
};

module.exports = addressController;