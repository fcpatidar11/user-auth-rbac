/**
 * PermissionGuard controller module for handling PermissionGuard-related HTTP requests
 * @module userAuthorizationGuardController
 * @requires @formatters/api.response
 * @requires @clients/authentication.client
 */
const responseFormatter = require("@formatters/api.response");
const { userAuthorizationGuardService } = require("@clients/authentication.client");
/**
 * Creates a generic handler function to reduce code duplication
 * @param {Function} serviceMethod - The service method to call
 * @param {object} req - Express request object containing permissionGuard data
 * @param {object} res - Express response object
 * @returns {Function} Express middleware handler
 */
const processServiceHandler = (req, res, serviceMethod) => {
    return serviceMethod(req.combineRequest, req.rpcMetaData, (error, result) => {
        return responseFormatter.serviceResponse(res, error, result);
    });
};

/**
 * Permission Guard controller with methods for handling PermissionGuard-related HTTP requests
*/
const PermissionGuardController = {
    updateUserRoles: (req, res) => {
        return processServiceHandler(req, res, userAuthorizationGuardService.updateUserRoles.bind(userAuthorizationGuardService));
    },
    updateUserPermissions: (req, res) => {
        return processServiceHandler(req, res, userAuthorizationGuardService.updateUserPermissions.bind(userAuthorizationGuardService));
    },
    revokeUserPermissions: (req, res) => {
        return processServiceHandler(req, res, userAuthorizationGuardService.revokeUserPermissions.bind(userAuthorizationGuardService));
    }
};

module.exports = PermissionGuardController;