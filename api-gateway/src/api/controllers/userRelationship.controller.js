/**
 * User Relationship Controller
 * Handles HTTP requests related to User relationship management.
 * 
 * @module controllers/userRelationshipController
 */

const responseFormatter = require("@formatters/api.response");
const { userRelationshipService } = require("@clients/authentication.client");

/**
 * Creates a generic handler function to reduce code duplication
 * @param {Function} serviceMethod - The service method to call
 * @param {object} req - Express request object containing role data
 * @param {object} res - Express response object
 * @returns {Function} Express middleware handler
 */
const processServiceHandler = (req, res, serviceMethod) => {
    return serviceMethod(req.combineRequest, req.rpcMetaData, (error, result) => {
        return responseFormatter.serviceResponse(res, error, result);
    });
};

module.exports = {
    /**
     * Creates a new User relationship
     * 
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Object} Formatted API response
     */
    addUserRelationship: (req, res) => {
        return processServiceHandler(req, res, userRelationshipService.addUserRelationship.bind(userRelationshipService))
    },

    /**
     * Removes an existing User relationship
     * 
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Object} Formatted API response
     */
    removeUserRelationship: (req, res) => {
        return processServiceHandler(req, res, userRelationshipService.removeUserRelationship.bind(userRelationshipService))
    },

    /**
     * Retrieves User relationship information
     * 
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Object} Formatted API response
     */
    fetchUserRelationship: (req, res) => {
        return processServiceHandler(req, res, userRelationshipService.fetchUserRelationship.bind(userRelationshipService))
    },

    /**
     * Updates permissions for an existing User relationship
     * 
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Object} Formatted API response
     */
    updateUserRelationshipPermissions: (req, res) => {
        return processServiceHandler(req, res, userRelationshipService.updateUserRelationshipPermissions.bind(userRelationshipService))
    }
};