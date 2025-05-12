const { Validator } = require("node-input-validator");
const { getFirstErrorMessage } = require("@interceptors/validations/index.validation");
const appMessage = require("@messages/app.message");
const responseFormatter = require("@formatters/grpc.response");

module.exports = {
    createRole: (method) => async (call, callback) => {
        try {
            const bodyValidator = new Validator(call.request, {
                "name": "required|string",
                "description": "required|string",
                "group": "required|string|mongoId",
                "assignPermissions": "required|array",
                "assignPermissions.*": "string|mongoId"
            }, {
                "name.required": appMessage.validation.required.name,
                "name.string": appMessage.validation.string.name,
                "description.required": appMessage.validation.required.description,
                "description.string": appMessage.validation.string.description,
                "group.required": appMessage.validation.required.group,
                "group.string": appMessage.validation.string.group,
                "group.mongoId": appMessage.validation.common.invalidMongoId,
                "assignPermissions.required": appMessage.validation.required.assignPermissions,
                "assignPermissions.array": appMessage.validation.array.assignPermissions,
                "assignPermissions.*.string": appMessage.validation.string.permissionId,
                "assignPermissions.*.mongoId": appMessage.validation.common.invalidMongoId
            });
            const matchedBody = await bodyValidator.check();
            if (!matchedBody) {
                const message = getFirstErrorMessage(bodyValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            return method(call, callback);
        } catch (error) {
            return responseFormatter.handleFailedPrecondition(call, callback, appMessage.common.error);
        }
    },

    updateRole: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "roleId": "required|string|mongoId"
            }, {
                "roleId.required": appMessage.validation.required.id,
                "roleId.string": appMessage.validation.string.id,
                "roleId.mongoId": appMessage.validation.common.invalidMongoId
            });
            const matchedParams = await paramsValidator.check();
            if (!matchedParams) {
                const message = getFirstErrorMessage(paramsValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            const bodyValidator = new Validator(call.request, {
                "name": "required|string",
                "description": "required|string",
                "group": "required|string|mongoId",
                "assignPermissions": "required|array",
                "assignPermissions.*": "string|mongoId",
                "removePermissions": "array",
                "removePermissions.*": "string|mongoId"
            }, {
                "name.required": appMessage.validation.required.name,
                "name.string": appMessage.validation.string.name,
                "description.required": appMessage.validation.required.description,
                "description.string": appMessage.validation.string.description,
                "group.required": appMessage.validation.required.group,
                "group.string": appMessage.validation.string.group,
                "group.mongoId": appMessage.validation.common.invalidMongoId,
                "assignPermissions.required": appMessage.validation.required.assignPermissions,
                "assignPermissions.array": appMessage.validation.array.assignPermissions,
                "assignPermissions.*.string": appMessage.validation.string.permissionId,
                "assignPermissions.*.mongoId": appMessage.validation.common.invalidMongoId,
                "removePermissions.required": appMessage.validation.required.removePermissions,
                "removePermissions.array": appMessage.validation.array.removePermissions,
                "removePermissions.*.string": appMessage.validation.string.permissionId,
                "removePermissions.*.mongoId": appMessage.validation.common.invalidMongoId
            });
            const matchedBody = await bodyValidator.check();
            if (!matchedBody) {
                const message = getFirstErrorMessage(bodyValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            return method(call, callback);
        } catch (error) {
            return responseFormatter.handleFailedPrecondition(call, callback, appMessage.common.error);
        }
    },

    fetchRoleById: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "roleId": "required|string|mongoId"
            }, {
                "roleId.required": appMessage.validation.required.id,
                "roleId.string": appMessage.validation.string.id,
                "roleId.mongoId": appMessage.validation.common.invalidMongoId
            });
            const matchedParams = await paramsValidator.check();
            if (!matchedParams) {
                const message = getFirstErrorMessage(paramsValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            return method(call, callback);
        } catch (error) {
            return responseFormatter.handleFailedPrecondition(call, callback, appMessage.common.error);
        }
    },

    updateRoleStatus: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "roleId": "required|string|mongoId"
            }, {
                "roleId.required": appMessage.validation.required.id,
                "roleId.string": appMessage.validation.string.id,
                "roleId.mongoId": appMessage.validation.common.invalidMongoId
            });
            const matchedParams = await paramsValidator.check();
            if (!matchedParams) {
                const message = getFirstErrorMessage(paramsValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            const bodyValidator = new Validator(call.request, {
                "isActive": "required|boolean"
            }, {
                "isActive.required": appMessage.validation.required.isActive,
                "isActive.boolean": appMessage.validation.common.invalidBoolean
            });
            const matchedBody = await bodyValidator.check();
            if (!matchedBody) {
                const message = getFirstErrorMessage(bodyValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            return method(call, callback);
        } catch (error) {
            return responseFormatter.handleFailedPrecondition(call, callback, appMessage.common.error);
        }
    },

    createRoleGroup: (method) => async (call, callback) => {
        try {
            const bodyValidator = new Validator(call.request, {
                "name": "required|string",
                "description": "required|string"
            }, {
                "name.required": appMessage.validation.required.name,
                "name.string": appMessage.validation.string.name,
                "description.required": appMessage.validation.required.description,
                "description.string": appMessage.validation.string.description
            });
            const matchedBody = await bodyValidator.check();
            if (!matchedBody) {
                const message = getFirstErrorMessage(bodyValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            return method(call, callback);
        } catch (error) {
            return responseFormatter.handleFailedPrecondition(call, callback, appMessage.common.error);
        }
    },

    updateRoleGroup: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "groupId": "required|string|mongoId"
            }, {
                "groupId.required": appMessage.validation.required.id,
                "groupId.string": appMessage.validation.string.id,
                "groupId.mongoId": appMessage.validation.common.invalidMongoId
            });
            const matchedParams = await paramsValidator.check();
            if (!matchedParams) {
                const message = getFirstErrorMessage(paramsValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            const bodyValidator = new Validator(call.request, {
                "name": "required|string",
                "description": "required|string"
            }, {
                "name.required": appMessage.validation.required.name,
                "name.string": appMessage.validation.string.name,
                "description.required": appMessage.validation.required.description,
                "description.string": appMessage.validation.string.description
            });
            const matchedBody = await bodyValidator.check();
            if (!matchedBody) {
                const message = getFirstErrorMessage(bodyValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            return method(call, callback);
        } catch (error) {
            return responseFormatter.handleFailedPrecondition(call, callback, appMessage.common.error);
        }
    },

    fetchRoleGroupById: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "groupId": "required|string|mongoId"
            }, {
                "groupId.required": appMessage.validation.required.id,
                "groupId.string": appMessage.validation.string.id,
                "groupId.mongoId": appMessage.validation.common.invalidMongoId
            });
            const matchedParams = await paramsValidator.check();
            if (!matchedParams) {
                const message = getFirstErrorMessage(paramsValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            return method(call, callback);
        } catch (error) {
            return responseFormatter.handleFailedPrecondition(call, callback, appMessage.common.error);
        }
    },

    updateRoleGroupStatus: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "groupId": "required|string|mongoId"
            }, {
                "groupId.required": appMessage.validation.required.id,
                "groupId.string": appMessage.validation.string.id,
                "groupId.mongoId": appMessage.validation.common.invalidMongoId
            });
            const matchedParams = await paramsValidator.check();
            if (!matchedParams) {
                const message = getFirstErrorMessage(paramsValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            const bodyValidator = new Validator(call.request, {
                "isActive": "required|boolean"
            }, {
                "isActive.required": appMessage.validation.required.isActive,
                "isActive.boolean": appMessage.validation.common.invalidBoolean
            });
            const matchedBody = await bodyValidator.check();
            if (!matchedBody) {
                const message = getFirstErrorMessage(bodyValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            return method(call, callback);
        } catch (error) {
            return responseFormatter.handleFailedPrecondition(call, callback, appMessage.common.error);
        }
    }
}