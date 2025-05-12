/**
 * Role Controller
 * This module provides HTTP request handlers for role management operations.
 * 
 * @module controllers/role.controller
 */

const responseFormatter = require("@formatters/api.response");
const { roleService } = require("@clients/authentication.client");

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
 * Role controller with methods for handling role-related HTTP requests
 */
const roleController = {
    /**
     * Creates a new role
     * 
     * @param {object} req - Express request object containing role data
     * @param {object} res - Express response object
     * @returns {object} Formatted API response
     */
    createRole: (req, res) => {
        return processServiceHandler(req, res, roleService.createRole.bind(roleService))
    },

    /**
     * Updates an existing role
     * 
     * @param {object} req - Express request object containing updated role data
     * @param {object} res - Express response object
     * @returns {object} Formatted API response
     */
    updateRole: (req, res) => {
        return processServiceHandler(req, res, roleService.updateRole.bind(roleService))
    },

    /**
     * Fetches all roles
     * 
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     * @returns {object} Formatted API response with roles data
     */
    fetchRoles: (req, res) => {
        return processServiceHandler(req, res, roleService.fetchRoles.bind(roleService))
    },

    /**
     * Fetches a specific role by ID
     * 
     * @param {object} req - Express request object containing role ID
     * @param {object} res - Express response object
     * @returns {object} Formatted API response with role data
     */
    fetchRoleById: (req, res) => {
        return processServiceHandler(req, res, roleService.fetchRoleById.bind(roleService))
    },

    /**
     * Updates the status of a role
     * 
     * @param {object} req - Express request object containing role ID and new status
     * @param {object} res - Express response object
     * @returns {object} Formatted API response
     */
    updateRoleStatus: (req, res) => {
        return processServiceHandler(req, res, roleService.updateRoleStatus.bind(roleService))
    },

    /**
     * Creates a new role group
     * 
     * @param {object} req - Express request object containing role group data
     * @param {object} res - Express response object
     * @returns {object} Formatted API response
     */
    createRoleGroup: (req, res) => {
        return processServiceHandler(req, res, roleService.createRoleGroup.bind(roleService))
    },

    /**
     * Updates an existing role group
     * 
     * @param {object} req - Express request object containing updated role group data
     * @param {object} res - Express response object
     * @returns {object} Formatted API response
     */
    updateRoleGroup: (req, res) => {
        return processServiceHandler(req, res, roleService.updateRoleGroup.bind(roleService))
    },

    /**
     * Fetches all role groups
     * 
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     * @returns {object} Formatted API response with role groups data
     */
    fetchRoleGroups: (req, res) => {
        return processServiceHandler(req, res, roleService.fetchRoleGroups.bind(roleService))
    },

    /**
     * Fetches a specific role group by ID
     * 
     * @param {object} req - Express request object containing role group ID
     * @param {object} res - Express response object
     * @returns {object} Formatted API response with role group data
     */
    fetchRoleGroupById: (req, res) => {
        return processServiceHandler(req, res, roleService.fetchRoleGroupById.bind(roleService))
    },

    /**
     * Updates the status of a role group
     * 
     * @param {object} req - Express request object containing role group ID and new status
     * @param {object} res - Express response object
     * @returns {object} Formatted API response
     */
    updateRoleGroupStatus: (req, res) => {
        return processServiceHandler(req, res, roleService.updateRoleGroupStatus.bind(roleService))
    },
};

module.exports = roleController;