/**
 * Auth controller module for handling auth-related HTTP requests
 * @module AuthController
 * @requires @formatters/api.response
 * @requires @clients/authentication.client
 */
const responseFormatter = require("@formatters/api.response");
const { authService } = require("@clients/authentication.client")

/**
 * Creates a generic handler function to reduce code duplication
 * @param {Function} serviceMethod - The service method to call
 * @param {object} req - Express request object containing auth data
 * @param {object} res - Express response object
 * @returns {Function} Express middleware handler
 */
const processServiceHandler = (req, res, serviceMethod) => {
    return serviceMethod(req.combineRequest, req.rpcMetaData, (error, result) => {
        return responseFormatter.serviceResponse(res, error, result);
    });
};

/**
 * Auth controller with methods for handling auth-related HTTP requests
*/
const authController = {
    login: (req, res) => {
        return processServiceHandler(req, res, authService.login.bind(authService));
    },
    forgotPassword: (req, res) => {
        return processServiceHandler(req, res, authService.forgotPassword.bind(authService));
    },
    resetPassword: (req, res) => {
        return processServiceHandler(req, res, authService.resetPassword.bind(authService));
    },
    acceptUserInvitation: (req, res) => {
        return processServiceHandler(req, res, authService.acceptUserInvitation.bind(authService));
    },
    fetchUserInvitation: (req, res) => {
        return processServiceHandler(req, res, authService.fetchUserInvitation.bind(authService));
    }
};

module.exports = authController;