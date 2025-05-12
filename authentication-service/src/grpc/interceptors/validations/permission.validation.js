const { Validator } = require("node-input-validator");
const { getFirstErrorMessage } = require("@interceptors/validations/index.validation");
const appMessage = require("@messages/app.message");
const responseFormatter = require("@formatters/grpc.response");

module.exports = {
    createPermission: (method) => async (call, callback) => {
        try {
            const bodyValidator = new Validator(call.request, {
                "code": "required|string",
                "name": "required|string",
                "description": "required|string",
                "group": "required|string|mongoId"
            }, {
                "code.required": appMessage.validation.required.code,
                "code.string": appMessage.validation.string.code,
                "name.required": appMessage.validation.required.name,
                "name.string": appMessage.validation.string.name,
                "description.required": appMessage.validation.required.description,
                "description.string": appMessage.validation.string.description,
                "group.required": appMessage.validation.required.group,
                "group.string": appMessage.validation.string.group,
                "group.mongoId": appMessage.validation.common.invalidMongoId
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

    updatePermission: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "permissionId": "required|string|mongoId"
            }, {
                "permissionId.required": appMessage.validation.required.id,
                "permissionId.string": appMessage.validation.string.id,
                "permissionId.mongoId": appMessage.validation.common.invalidMongoId
            });
            const matchedParams = await paramsValidator.check();
            if (!matchedParams) {
                const message = getFirstErrorMessage(paramsValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            const bodyValidator = new Validator(call.request, {
                "code": "required|string",
                "name": "required|string",
                "description": "required|string",
                "group": "required|string|mongoId"
            }, {
                "code.required": appMessage.validation.required.code,
                "code.string": appMessage.validation.string.code,
                "name.required": appMessage.validation.required.name,
                "name.string": appMessage.validation.string.name,
                "description.required": appMessage.validation.required.description,
                "description.string": appMessage.validation.string.description,
                "group.required": appMessage.validation.required.group,
                "group.string": appMessage.validation.string.group,
                "group.mongoId": appMessage.validation.common.invalidMongoId
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

    fetchPermissionById: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "permissionId": "required|string|mongoId"
            }, {
                "permissionId.required": appMessage.validation.required.id,
                "permissionId.string": appMessage.validation.string.id,
                "permissionId.mongoId": appMessage.validation.common.invalidMongoId
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

    updatePermissionStatus: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "permissionId": "required|string|mongoId"
            }, {
                "permissionId.required": appMessage.validation.required.id,
                "permissionId.string": appMessage.validation.string.id,
                "permissionId.mongoId": appMessage.validation.common.invalidMongoId
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

    createPermissionGroup: (method) => async (call, callback) => {
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

    updatePermissionGroup: (method) => async (call, callback) => {
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

    fetchPermissionGroupById: (method) => async (call, callback) => {
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
    updatePermissionGroupStatus: (method) => async (call, callback) => {
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
    },

    createEntityPermissionGroup: (method) => async (call, callback) => {
        try {
            const bodyValidator = new Validator(call.request, {
                "name": "required|string",
                "description": "required|string",
                "grantPermissions": "array",
                "grantPermissions.*": "string|mongoId",
                "revokePermissions": "array",
                "revokePermissions.*": "string|mongoId",
                "relationshipPermissions": "array",
                "relationshipPermissions.*": "object",
                "relationshipPermissions.*.relationship": "string",
                "relationshipPermissions.*.permissions": "array",
                "relationshipPermissions.*.permissions.*": "string|mongoId"
            }, {
                "name.required": appMessage.validation.required.name,
                "name.string": appMessage.validation.string.name,
                "description.required": appMessage.validation.required.description,
                "description.string": appMessage.validation.string.description,
                "grantPermissions.required": appMessage.validation.required.grantPermissions,
                "grantPermissions.array": appMessage.validation.array.grantPermissions,
                "grantPermissions.*.string": appMessage.validation.string.permissionId,
                "grantPermissions.*.mongoId": appMessage.validation.common.invalidMongoId,
                "revokePermissions.required": appMessage.validation.required.revokePermissions,
                "revokePermissions.array": appMessage.validation.array.revokePermissions,
                "revokePermissions.*.string": appMessage.validation.string.permissionId,
                "revokePermissions.*.mongoId": appMessage.validation.common.invalidMongoId,
                "relationshipPermissions.required": appMessage.validation.required.relationshipPermissions,
                "relationshipPermissions.array": appMessage.validation.array.relationshipPermissions,
                "relationshipPermissions.*.object": appMessage.validation.object.relationshipPermissions,
                "relationshipPermissions.*.relationship.string": appMessage.validation.string.relationship,
                "relationshipPermissions.*.permissions.array": appMessage.validation.array.relationshipPermissions,
                "relationshipPermissions.*.permissions.*": appMessage.validation.common.invalidMongoId,
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

    updateEntityPermissionGroup: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "entityId": "required|string|mongoId"
            }, {
                "entityId.required": appMessage.validation.required.id,
                "entityId.string": appMessage.validation.string.id,
                "entityId.mongoId": appMessage.validation.common.invalidMongoId
            });
            const matchedParams = await paramsValidator.check();
            if (!matchedParams) {
                const message = getFirstErrorMessage(paramsValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            const bodyValidator = new Validator(call.request, {
                "name": "required|string",
                "description": "required|string",
                "grantPermissions": "array",
                "grantPermissions.*": "string|mongoId",
                "revokePermissions": "array",
                "revokePermissions.*": "string|mongoId",
                "relationshipPermissions": "array",
                "relationshipPermissions.*": "object",
                "relationshipPermissions.*.relationship": "string",
                "relationshipPermissions.*.permissions": "array",
                "relationshipPermissions.*.permissions.*": "string|mongoId"
            }, {
                "name.required": appMessage.validation.required.name,
                "name.string": appMessage.validation.string.name,
                "description.required": appMessage.validation.required.description,
                "description.string": appMessage.validation.string.description,
                "grantPermissions.required": appMessage.validation.required.grantPermissions,
                "grantPermissions.array": appMessage.validation.array.grantPermissions,
                "grantPermissions.*.string": appMessage.validation.string.permissionId,
                "grantPermissions.*.mongoId": appMessage.validation.common.invalidMongoId,
                "revokePermissions.required": appMessage.validation.required.revokePermissions,
                "revokePermissions.array": appMessage.validation.array.revokePermissions,
                "revokePermissions.*.string": appMessage.validation.string.permissionId,
                "revokePermissions.*.mongoId": appMessage.validation.common.invalidMongoId,
                "relationshipPermissions.required": appMessage.validation.required.relationshipPermissions,
                "relationshipPermissions.array": appMessage.validation.array.relationshipPermissions,
                "relationshipPermissions.*.object": appMessage.validation.object.relationshipPermissions,
                "relationshipPermissions.*.relationship.string": appMessage.validation.string.relationship,
                "relationshipPermissions.*.permissions.array": appMessage.validation.array.relationshipPermissions,
                "relationshipPermissions.*.permissions.*": appMessage.validation.common.invalidMongoId,
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

    fetchEntityPermissionGroupById: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "entityId": "required|string|mongoId"
            }, {
                "entityId.required": appMessage.validation.required.id,
                "entityId.string": appMessage.validation.string.id,
                "entityId.mongoId": appMessage.validation.common.invalidMongoId
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

    updateEntityPermissionGroupStatus: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "entityId": "required|string|mongoId"
            }, {
                "entityId.required": appMessage.validation.required.id,
                "entityId.string": appMessage.validation.string.id,
                "entityId.mongoId": appMessage.validation.common.invalidMongoId
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