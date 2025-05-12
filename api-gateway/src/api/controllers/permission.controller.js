/**
 * Permission controller module for handling permission-related HTTP requests
 * @module PermissionController
 * @requires @formatters/api.response
 * @requires @clients/authentication.client
 */
const responseFormatter = require("@formatters/api.response");
const { permissionService } = require("@clients/authentication.client")

/**
 * Creates a generic handler function to reduce code duplication
 * @param {Function} serviceMethod - The service method to call
 * @param {object} req - Express request object containing permission data
 * @param {object} res - Express response object
 * @returns {Function} Express middleware handler
 */
const processServiceHandler = (req, res, serviceMethod) => {
    return serviceMethod(req.combineRequest, req.rpcMetaData, (error, result) => {
        return responseFormatter.serviceResponse(res, error, result);
    });
};

/**
 * Permission controller with methods for handling permission-related HTTP requests
 */
const permissionController = {
    createPermission: (req, res) => {
        return processServiceHandler(req, res, permissionService.createPermission.bind(permissionService));
    },
    updatePermission: (req, res) => {
        return processServiceHandler(req, res, permissionService.updatePermission.bind(permissionService));
    },
    fetchPermissions: (req, res) => {
        return processServiceHandler(req, res, permissionService.fetchPermissions.bind(permissionService));
    },
    fetchPermissionById: (req, res) => {
        return processServiceHandler(req, res, permissionService.fetchPermissionById.bind(permissionService));
    },
    updatePermissionStatus: (req, res) => {
        return processServiceHandler(req, res, permissionService.updatePermissionStatus.bind(permissionService));
    },
    createPermissionGroup: (req, res) => {
        return processServiceHandler(req, res, permissionService.createPermissionGroup.bind(permissionService));
    },
    updatePermissionGroup: (req, res) => {
        return processServiceHandler(req, res, permissionService.updatePermissionGroup.bind(permissionService));
    },
    fetchPermissionGroups: (req, res) => {
        return processServiceHandler(req, res, permissionService.fetchPermissionGroups.bind(permissionService));
    },
    fetchPermissionGroupById: (req, res) => {
        return processServiceHandler(req, res, permissionService.fetchPermissionGroupById.bind(permissionService));
    },
    updatePermissionGroupStatus: (req, res) => {
        return processServiceHandler(req, res, permissionService.updatePermissionGroupStatus.bind(permissionService));
    },

    createEntityPermissionGroup: (req, res) => {
        return processServiceHandler(req, res, permissionService.createEntityPermissionGroup.bind(permissionService));
    },
    updateEntityPermissionGroup: (req, res) => {
        return processServiceHandler(req, res, permissionService.updateEntityPermissionGroup.bind(permissionService));
    },
    fetchEntityPermissionGroups: (req, res) => {
        return processServiceHandler(req, res, permissionService.fetchEntityPermissionGroups.bind(permissionService));
    },
    fetchEntityPermissionGroupById: (req, res) => {
        return processServiceHandler(req, res, permissionService.fetchEntityPermissionGroupById.bind(permissionService));
    },
    updateEntityPermissionGroupStatus: (req, res) => {
        return processServiceHandler(req, res, permissionService.updateEntityPermissionGroupStatus.bind(permissionService));
    }
};

module.exports = permissionController;