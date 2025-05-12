/**
 * Contact controller module for handling contact-related HTTP requests
 * @module ContactController
 * @requires @formatters/api.response
 * @requires @clients/authentication.client
 */
const responseFormatter = require("@formatters/api.response");
const { userContactService } = require("@clients/authentication.client");

/**
 * Creates a generic handler function to reduce code duplication
 * @param {Function} serviceMethod - The service method to call
 * @param {object} req - Express request object containing contact data
 * @param {object} res - Express response object
 * @returns {Function} Express middleware handler
 */
const processServiceHandler = (req, res, serviceMethod) => {
    return serviceMethod(req.combineRequest, req.rpcMetaData, (error, result) => {
        return responseFormatter.serviceResponse(res, error, result);
    });
};

/**
 * Contact controller with methods for handling contact-related HTTP requests
*/
const contactController = {
    createProfileContact: (req, res) => {
        return processServiceHandler(req, res, userContactService.createProfileContact.bind(userContactService));
    },
    updateProfileContact: (req, res) => {
        return processServiceHandler(req, res, userContactService.updateProfileContact.bind(userContactService));
    },
    deleteProfileContact: (req, res) => {
        return processServiceHandler(req, res, userContactService.deleteProfileContact.bind(userContactService));
    },
    fetchProfileContact: (req, res) => {
        return processServiceHandler(req, res, userContactService.fetchProfileContact.bind(userContactService));
    },
    fetchProfileContacts: (req, res) => {
        return processServiceHandler(req, res, userContactService.fetchProfileContacts.bind(userContactService));
    },
    createUserContact: (req, res) => {
        return processServiceHandler(req, res, userContactService.createUserContact.bind(userContactService));
    },
    updateUserContact: (req, res) => {
        return processServiceHandler(req, res, userContactService.updateUserContact.bind(userContactService));
    },
    deleteUserContact: (req, res) => {
        return processServiceHandler(req, res, userContactService.deleteUserContact.bind(userContactService));
    },
    fetchUserContact: (req, res) => {
        return processServiceHandler(req, res, userContactService.fetchUserContact.bind(userContactService));
    },
    fetchUserContacts: (req, res) => {
        return processServiceHandler(req, res, userContactService.fetchUserContacts.bind(userContactService));
    }
};

module.exports = contactController;