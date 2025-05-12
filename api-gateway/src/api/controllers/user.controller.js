/**
 * User controller module for handling user-related HTTP requests
 * @module UserController
 * @requires @formatters/api.response
 * @requires @clients/authentication.client
 */
const responseFormatter = require("@formatters/api.response");
const { userService, authService } = require("@clients/authentication.client");

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

/**
 * User controller with methods for handling user-related operations
 */
const userController = {
    // User operations
    /**
     * Creates a new user
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    createUser: (req, res) => {
        return processServiceHandler(req, res, userService.createUser.bind(userService))
    },

    /**
     * Fetches all users
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    fetchUsers: (req, res) => {
        return processServiceHandler(req, res, userService.fetchUsers.bind(userService))
    },

    /**
     * Fetches a specific user by ID
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    fetchUserById: (req, res) => {
        return processServiceHandler(req, res, userService.fetchUserById.bind(userService))
    },

    /**
     * Updates an user's information
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    updateUser: (req, res) => {
        return processServiceHandler(req, res, userService.updateUser.bind(userService))
    },

    /**
     * Updates an user's status
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    updateUserStatus: (req, res) => {
        return processServiceHandler(req, res, userService.updateUserStatus.bind(userService))
    },

    /**
     * Resend invitation email to an user
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    resendUserInvitation: (req, res) => {
        return processServiceHandler(req, res, userService.resendUserInvitation.bind(userService))
    },

    // Profile operations
    /**
     * Fetches the current user's profile
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    fetchProfile: (req, res) => {
        return processServiceHandler(req, res, userService.fetchProfile.bind(userService))
    },

    /**
     * Updates the current user's profile
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    updateProfile: (req, res) => {
        return processServiceHandler(req, res, userService.updateProfile.bind(userService))
    },

    /**
     * Changes the current user's password
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    changePassword: (req, res) => {
        return processServiceHandler(req, res, userService.updateProfilePassword.bind(userService))
    },

    // Activity log operations
    /**
     * Fetches all activity logs
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    fetchUserActivityLogs: (req, res) => {
        return processServiceHandler(req, res, userService.fetchUserActivityLogs.bind(userService))
    },

    /**
     * Fetches activity logs for the current user's profile
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    fetchProfileActivityLogs: (req, res) => {
        return processServiceHandler(req, res, userService.fetchProfileActivityLogs.bind(userService))
    },

    // Dashboard operations
    /**
     * Fetches dashboard overview data
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    fetchDashboardOverview: (req, res) => {
        return processServiceHandler(req, res, authService.fetchDashboardOverview.bind(authService))
    },
};

module.exports = userController;