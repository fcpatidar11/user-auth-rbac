const { Validator } = require("node-input-validator");
const { getFirstErrorMessage } = require("@interceptors/validations/index.validation");
const appMessage = require("@messages/app.message");
const responseFormatter = require("@formatters/grpc.response");
const appConstant = require("@constants/app.constant");

module.exports = {
    createUser: (method) => async (call, callback) => {
        try {
            const bodyValidator = new Validator(call.request, {
                "firstName": "required|string",
                "middleName": "string",
                "lastName": "required|string",
                "userName": "required|string",
                "email": "required|email",
                "gender": `required|string|in:${Object.values(appConstant.GENDER_TYPES).join(",")}`
            }, {
                "firstName.required": appMessage.validation.required.firstName,
                "firstName.string": appMessage.validation.string.firstName,
                "middleName.string": appMessage.validation.string.middleName,
                "lastName.required": appMessage.validation.required.lastName,
                "lastName.string": appMessage.validation.string.lastName,
                "userName.required": appMessage.validation.required.userName,
                "userName.string": appMessage.validation.string.userName,
                "email.required": appMessage.validation.required.email,
                "email.email": appMessage.validation.common.emailInvalid,
                "gender.required": appMessage.validation.required.gender,
                "gender.string": appMessage.validation.string.gender,
                "gender.in": appMessage.validation.common.invalidGender
            });
            const matchedBody = await bodyValidator.check();
            if (!matchedBody) {
                const message = getFirstErrorMessage(bodyValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "userType": `required|string|in:${Object.values(appConstant.USER_TYPES).join(",")}`,
            }, {
                "userType.required": appMessage.role.notFound,
                "userType.string": appMessage.role.notFound,
                "userType.in": appMessage.role.notFound,
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

    updateProfile: (method) => async (call, callback) => {
        try {
            const bodyValidator = new Validator(call.request, {
                "firstName": "required|string",
                "middleName": "string",
                "lastName": "required|string",
                "userName": "required|string",
                "gender": `required|string|in:${Object.values(appConstant.GENDER_TYPES).join(",")}`
            }, {
                "firstName.required": appMessage.validation.required.firstName,
                "firstName.string": appMessage.validation.string.firstName,
                "middleName.string": appMessage.validation.string.middleName,
                "lastName.required": appMessage.validation.required.lastName,
                "lastName.string": appMessage.validation.string.lastName,
                "userName.required": appMessage.validation.required.userName,
                "userName.string": appMessage.validation.string.userName,
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

    changePassword: (method) => async (call, callback) => {
        try {
            const bodyValidator = new Validator(call.request, {
                "oldPassword": "required|string|minLength:6",
                "newPassword": "required|string|minLength:6"
            }, {
                "oldPassword.required": appMessage.validation.required.oldPassword,
                "oldPassword.string": appMessage.validation.string.oldPassword,
                "oldPassword.minLength": appMessage.validation.common.passwordMinLength,
                "newPassword.required": appMessage.validation.required.newPassword,
                "newPassword.string": appMessage.validation.string.newPassword,
                "newPassword.minLength": appMessage.validation.common.passwordMinLength
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

    fetchUserById: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "userId": "required|string|mongoId"
            }, {
                "userId.required": appMessage.validation.required.id,
                "userId.string": appMessage.validation.string.id,
                "userId.mongoId": appMessage.validation.common.invalidMongoId
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

    updateUser: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "userId": "required|string|mongoId"
            }, {
                "userId.required": appMessage.validation.required.id,
                "userId.string": appMessage.validation.string.id,
                "userId.mongoId": appMessage.validation.common.invalidMongoId
            });
            const matchedParams = await paramsValidator.check();
            if (!matchedParams) {
                const message = getFirstErrorMessage(paramsValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            const bodyValidator = new Validator(call.request, {
                "firstName": "required|string",
                "middleName": "string",
                "lastName": "required|string",
                "userName": "required|string",
                "gender": `required|string|in:${Object.values(appConstant.GENDER_TYPES).join(",")}`
            }, {
                "firstName.required": appMessage.validation.required.firstName,
                "firstName.string": appMessage.validation.string.firstName,
                "middleName.string": appMessage.validation.string.middleName,
                "lastName.required": appMessage.validation.required.lastName,
                "lastName.string": appMessage.validation.string.lastName,
                "userName.required": appMessage.validation.required.userName,
                "userName.string": appMessage.validation.string.userName
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

    updateUserStatus: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "userId": "required|string|mongoId"
            }, {
                "userId.required": appMessage.validation.required.id,
                "userId.string": appMessage.validation.string.id,
                "userId.mongoId": appMessage.validation.common.invalidMongoId
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

    updateUserRoles: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "userId": "required|string|mongoId"
            }, {
                "userId.required": appMessage.validation.required.id,
                "userId.string": appMessage.validation.string.id,
                "userId.mongoId": appMessage.validation.common.invalidMongoId
            });
            const matchedParams = await paramsValidator.check();
            if (!matchedParams) {
                const message = getFirstErrorMessage(paramsValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            const bodyValidator = new Validator(call.request, {
                "assignRoles": "array",
                "assignRoles.*": "string|mongoId",
                "removeRoles": "array",
                "removeRoles.*": "string|mongoId"
            }, {
                "assignRoles.required": appMessage.validation.required.assignRoles,
                "assignRoles.array": appMessage.validation.array.assignRoles,
                "assignRoles.*.string": appMessage.validation.string.roleId,
                "assignRoles.*.mongoId": appMessage.validation.common.invalidMongoId,
                "removeRoles.required": appMessage.validation.required.removeRoles,
                "removeRoles.array": appMessage.validation.array.removeRoles,
                "removeRoles.*.string": appMessage.validation.string.roleId,
                "removeRoles.*.mongoId": appMessage.validation.common.invalidMongoId
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

    updateUserPermissions: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "userId": "required|string|mongoId"
            }, {
                "userId.required": appMessage.validation.required.id,
                "userId.string": appMessage.validation.string.id,
                "userId.mongoId": appMessage.validation.common.invalidMongoId
            });
            const matchedParams = await paramsValidator.check();
            if (!matchedParams) {
                const message = getFirstErrorMessage(paramsValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            const bodyValidator = new Validator(call.request, {
                "assignPermissions": "array",
                "assignPermissions.*": "string|mongoId",
                "removePermissions": "array",
                "removePermissions.*": "string|mongoId"
            }, {
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

    revokeUserRolePermissions: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "userId": "required|string|mongoId"
            }, {
                "userId.required": appMessage.validation.required.id,
                "userId.string": appMessage.validation.string.id,
                "userId.mongoId": appMessage.validation.common.invalidMongoId
            });
            const matchedParams = await paramsValidator.check();
            if (!matchedParams) {
                const message = getFirstErrorMessage(paramsValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            const bodyValidator = new Validator(call.request, {
                "assignPermissions": "array",
                "assignPermissions.*": "string|mongoId",
                "removePermissions": "array",
                "removePermissions.*": "string|mongoId"
            }, {
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
    resendUserInvitation: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "userId": "required|string|mongoId"
            }, {
                "userId.required": appMessage.validation.required.id,
                "userId.string": appMessage.validation.string.id,
                "userId.mongoId": appMessage.validation.common.invalidMongoId
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

    fetchUsers: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "userType": `required|string|in:${Object.values(appConstant.USER_TYPES).join(",")}`,
            }, {
                "userType.required": appMessage.role.notFound,
                "userType.string": appMessage.role.notFound,
                "userType.in": appMessage.role.notFound,
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

    addUserRelationship: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "parentId": "required|string|mongoId",
                "childId": "required|string|mongoId"
            }, {
                "parentId.required": appMessage.validation.required.id,
                "parentId.string": appMessage.validation.string.id,
                "parentId.mongoId": appMessage.validation.common.invalidMongoId,
                "childId.required": appMessage.validation.required.id,
                "childId.string": appMessage.validation.string.id,
                "childId.mongoId": appMessage.validation.common.invalidMongoId
            });
            const matchedParams = await paramsValidator.check();
            if (!matchedParams) {
                const message = getFirstErrorMessage(paramsValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            const bodyValidator = new Validator(call.request, {
                "assignPermissions": "array",
                "assignPermissions.*": "string|mongoId"
            }, {
                "assignPermissions.required": appMessage.validation.required.assignPermissions,
                "assignPermissions.array": appMessage.validation.array.assignPermissions,
                "assignPermissions.*.string": appMessage.validation.string.permissionId,
                "assignPermissions.*.mongoId": appMessage.validation.common.invalidMongoId,
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
    removeUserRelationship: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "parentId": "required|string|mongoId",
                "childId": "required|string|mongoId"
            }, {
                "parentId.required": appMessage.validation.required.id,
                "parentId.string": appMessage.validation.string.id,
                "parentId.mongoId": appMessage.validation.common.invalidMongoId,
                "childId.required": appMessage.validation.required.id,
                "childId.string": appMessage.validation.string.id,
                "childId.mongoId": appMessage.validation.common.invalidMongoId
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
    fetchUserRelationship: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "parentId": "required|string|mongoId",
                "childId": "required|string|mongoId"
            }, {
                "parentId.required": appMessage.validation.required.id,
                "parentId.string": appMessage.validation.string.id,
                "parentId.mongoId": appMessage.validation.common.invalidMongoId,
                "childId.required": appMessage.validation.required.id,
                "childId.string": appMessage.validation.string.id,
                "childId.mongoId": appMessage.validation.common.invalidMongoId
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
    updateUserRelationshipPermission: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "parentId": "required|string|mongoId",
                "childId": "required|string|mongoId"
            }, {
                "parentId.required": appMessage.validation.required.id,
                "parentId.string": appMessage.validation.string.id,
                "parentId.mongoId": appMessage.validation.common.invalidMongoId,
                "childId.required": appMessage.validation.required.id,
                "childId.string": appMessage.validation.string.id,
                "childId.mongoId": appMessage.validation.common.invalidMongoId
            });
            const matchedParams = await paramsValidator.check();
            if (!matchedParams) {
                const message = getFirstErrorMessage(paramsValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            const bodyValidator = new Validator(call.request, {
                "assignPermissions": "array",
                "assignPermissions.*": "string|mongoId",
                "removePermissions": "array",
                "removePermissions.*": "string|mongoId"
            }, {
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
    createUserAddress: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "userId": "required|string|mongoId"
            }, {
                "userId.required": appMessage.validation.required.id,
                "userId.string": appMessage.validation.string.id,
                "userId.mongoId": appMessage.validation.common.invalidMongoId
            });
            const matchedParams = await paramsValidator.check();
            if (!matchedParams) {
                const message = getFirstErrorMessage(paramsValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            const bodyValidator = new Validator(call.request, {
                "streetName": "required|string",
                "address": "required|string",
                "country": "required|string",
                "subdivision": "required|string",
                "addressType": "required|string",
                "location": "required|object",
                "location.coordinates": "required|array|length:2,2",
                "location.coordinates.0": "required|numeric|between:-180,180",
                "location.coordinates.1": "required|numeric|between:-90,90"
            }, {
                "streetName.required": appMessage.validation.required.streetName,
                "streetName.string": appMessage.validation.string.streetName,
                "address.required": appMessage.validation.required.address,
                "address.string": appMessage.validation.string.address,
                "country.required": appMessage.validation.required.country,
                "country.string": appMessage.validation.string.country,
                "subdivision.required": appMessage.validation.required.subdivision,
                "subdivision.string": appMessage.validation.string.subdivision,
                "addressType.required": appMessage.validation.required.addressType,
                "addressType.string": appMessage.validation.string.addressType,
                "location.required": appMessage.validation.required.location,
                "location.object": appMessage.validation.object.location,
                "location.coordinates.required": appMessage.validation.required.locationCoordinates,
                "location.coordinates.array": appMessage.validation.array.locationCoordinates,
                "location.coordinates.length": appMessage.validation.length.coordinates,
                "location.coordinates.0.required": appMessage.validation.required.locationLongitude,
                "location.coordinates.0.numeric": appMessage.validation.numeric.locationLongitude,
                "location.coordinates.0.between": appMessage.validation.between.locationLongitude,
                "location.coordinates.1.required": appMessage.validation.required.locationLatitude,
                "location.coordinates.1.numeric": appMessage.validation.numeric.locationLatitude,
                "location.coordinates.1.between": appMessage.validation.between.locationLatitude
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
    updateUserAddress: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "userId": "required|string|mongoId",
                "addressId": "required|string|mongoId"
            }, {
                "userId.required": appMessage.validation.required.id,
                "userId.string": appMessage.validation.string.id,
                "userId.mongoId": appMessage.validation.common.invalidMongoId,
                "addressId.required": appMessage.validation.required.addressId,
                "addressId.string": appMessage.validation.string.addressId,
                "addressId.mongoId": appMessage.validation.common.invalidMongoId
            });
            const matchedParams = await paramsValidator.check();
            if (!matchedParams) {
                const message = getFirstErrorMessage(paramsValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            const bodyValidator = new Validator(call.request, {
                "streetName": "required|string",
                "address": "required|string",
                "country": "required|string",
                "subdivision": "required|string",
                "addressType": "required|string",
                "location": "required|object",
                "location.coordinates": "required|array|length:2,2",
                "location.coordinates.0": "required|numeric|between:-180,180",
                "location.coordinates.1": "required|numeric|between:-90,90"
            }, {
                "streetName.required": appMessage.validation.required.streetName,
                "streetName.string": appMessage.validation.string.streetName,
                "address.required": appMessage.validation.required.address,
                "address.string": appMessage.validation.string.address,
                "country.required": appMessage.validation.required.country,
                "country.string": appMessage.validation.string.country,
                "subdivision.required": appMessage.validation.required.subdivision,
                "subdivision.string": appMessage.validation.string.subdivision,
                "addressType.required": appMessage.validation.required.addressType,
                "addressType.string": appMessage.validation.string.addressType,
                "location.required": appMessage.validation.required.location,
                "location.object": appMessage.validation.object.location,
                "location.coordinates.required": appMessage.validation.required.locationCoordinates,
                "location.coordinates.array": appMessage.validation.array.locationCoordinates,
                "location.coordinates.length": appMessage.validation.length.coordinates,
                "location.coordinates.0.required": appMessage.validation.required.locationLongitude,
                "location.coordinates.0.numeric": appMessage.validation.numeric.locationLongitude,
                "location.coordinates.0.between": appMessage.validation.between.locationLongitude,
                "location.coordinates.1.required": appMessage.validation.required.locationLatitude,
                "location.coordinates.1.numeric": appMessage.validation.numeric.locationLatitude,
                "location.coordinates.1.between": appMessage.validation.between.locationLatitude,
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
    deleteUserAddress: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "userId": "required|string|mongoId",
                "addressId": "required|string|mongoId"
            }, {
                "userId.required": appMessage.validation.required.id,
                "userId.string": appMessage.validation.string.id,
                "userId.mongoId": appMessage.validation.common.invalidMongoId,
                "addressId.required": appMessage.validation.required.addressId,
                "addressId.string": appMessage.validation.string.addressId,
                "addressId.mongoId": appMessage.validation.common.invalidMongoId
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
    fetchUserAddress: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "userId": "required|string|mongoId",
                "addressId": "required|string|mongoId"
            }, {
                "userId.required": appMessage.validation.required.id,
                "userId.string": appMessage.validation.string.id,
                "userId.mongoId": appMessage.validation.common.invalidMongoId,
                "addressId.required": appMessage.validation.required.addressId,
                "addressId.string": appMessage.validation.string.addressId,
                "addressId.mongoId": appMessage.validation.common.invalidMongoId
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
    fetchUserAddresses: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "userId": "required|string|mongoId"
            }, {
                "userId.required": appMessage.validation.required.id,
                "userId.string": appMessage.validation.string.id,
                "userId.mongoId": appMessage.validation.common.invalidMongoId
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
    createUserContact: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "userId": "required|string|mongoId"
            }, {
                "userId.required": appMessage.validation.required.id,
                "userId.string": appMessage.validation.string.id,
                "userId.mongoId": appMessage.validation.common.invalidMongoId
            });
            const matchedParams = await paramsValidator.check();
            if (!matchedParams) {
                const message = getFirstErrorMessage(paramsValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            const bodyValidator = new Validator(call.request, {
                "contact": "required|string",
                "countryCode": "required|string",
                "dialCode": "required|string",
                "contactType": "required|string"
            }, {
                "contact.required": appMessage.validation.required.contact,
                "contact.string": appMessage.validation.string.contact,
                "countryCode.required": appMessage.validation.required.countryCode,
                "countryCode.string": appMessage.validation.string.countryCode,
                "dialCode.required": appMessage.validation.required.dialCode,
                "dialCode.string": appMessage.validation.string.dialCode,
                "contactType.required": appMessage.validation.required.contactType,
                "contactType.string": appMessage.validation.string.contactType
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
    updateUserContact: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "userId": "required|string|mongoId",
                "contactId": "required|string|mongoId"
            }, {
                "userId.required": appMessage.validation.required.id,
                "userId.string": appMessage.validation.string.id,
                "userId.mongoId": appMessage.validation.common.invalidMongoId,
                "contactId.required": appMessage.validation.required.contactId,
                "contactId.string": appMessage.validation.string.contactId,
                "contactId.mongoId": appMessage.validation.common.invalidMongoId
            });
            const matchedParams = await paramsValidator.check();
            if (!matchedParams) {
                const message = getFirstErrorMessage(paramsValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            const bodyValidator = new Validator(call.request, {
                "contact": "required|string",
                "countryCode": "required|string",
                "dialCode": "required|string",
                "contactType": "required|string"
            }, {
                "contact.required": appMessage.validation.required.contact,
                "contact.string": appMessage.validation.string.contact,
                "countryCode.required": appMessage.validation.required.countryCode,
                "countryCode.string": appMessage.validation.string.countryCode,
                "dialCode.required": appMessage.validation.required.dialCode,
                "dialCode.string": appMessage.validation.string.dialCode,
                "contactType.required": appMessage.validation.required.contactType,
                "contactType.string": appMessage.validation.string.contactType
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
    deleteUserContact: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "userId": "required|string|mongoId",
                "contactId": "required|string|mongoId"
            }, {
                "userId.required": appMessage.validation.required.id,
                "userId.string": appMessage.validation.string.id,
                "userId.mongoId": appMessage.validation.common.invalidMongoId,
                "contactId.required": appMessage.validation.required.contactId,
                "contactId.string": appMessage.validation.string.contactId,
                "contactId.mongoId": appMessage.validation.common.invalidMongoId
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
    fetchUserContact: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "userId": "required|string|mongoId",
                "contactId": "required|string|mongoId"
            }, {
                "userId.required": appMessage.validation.required.id,
                "userId.string": appMessage.validation.string.id,
                "userId.mongoId": appMessage.validation.common.invalidMongoId,
                "contactId.required": appMessage.validation.required.contactId,
                "contactId.string": appMessage.validation.string.contactId,
                "contactId.mongoId": appMessage.validation.common.invalidMongoId
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
    fetchUserContacts: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "userId": "required|string|mongoId"
            }, {
                "userId.required": appMessage.validation.required.id,
                "userId.string": appMessage.validation.string.id,
                "userId.mongoId": appMessage.validation.common.invalidMongoId
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
    createAddress: (method) => async (call, callback) => {
        try {
            const bodyValidator = new Validator(call.request, {
                "streetName": "required|string",
                "address": "required|string",
                "country": "required|string",
                "subdivision": "required|string",
                "addressType": "required|string",
                "location": "required|object",
                "location.coordinates": "required|array|length:2,2",
                "location.coordinates.0": "required|numeric|between:-180,180",
                "location.coordinates.1": "required|numeric|between:-90,90"
            }, {
                "streetName.required": appMessage.validation.required.streetName,
                "streetName.string": appMessage.validation.string.streetName,
                "address.required": appMessage.validation.required.address,
                "address.string": appMessage.validation.string.address,
                "country.required": appMessage.validation.required.country,
                "country.string": appMessage.validation.string.country,
                "subdivision.required": appMessage.validation.required.subdivision,
                "subdivision.string": appMessage.validation.string.subdivision,
                "addressType.required": appMessage.validation.required.addressType,
                "addressType.string": appMessage.validation.string.addressType,
                "location.required": appMessage.validation.required.location,
                "location.object": appMessage.validation.object.location,
                "location.coordinates.required": appMessage.validation.required.locationCoordinates,
                "location.coordinates.array": appMessage.validation.array.locationCoordinates,
                "location.coordinates.length": appMessage.validation.length.coordinates,
                "location.coordinates.0.required": appMessage.validation.required.locationLongitude,
                "location.coordinates.0.numeric": appMessage.validation.numeric.locationLongitude,
                "location.coordinates.0.between": appMessage.validation.between.locationLongitude,
                "location.coordinates.1.required": appMessage.validation.required.locationLatitude,
                "location.coordinates.1.numeric": appMessage.validation.numeric.locationLatitude,
                "location.coordinates.1.between": appMessage.validation.between.locationLatitude
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
    updateAddress: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "addressId": "required|string|mongoId"
            }, {
                "addressId.required": appMessage.validation.required.id,
                "addressId.string": appMessage.validation.string.id,
                "addressId.mongoId": appMessage.validation.common.invalidMongoId
            });
            const matchedParams = await paramsValidator.check();
            if (!matchedParams) {
                const message = getFirstErrorMessage(paramsValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }
            const bodyValidator = new Validator(call.request, {
                "streetName": "required|string",
                "address": "required|string",
                "country": "required|string",
                "subdivision": "required|string",
                "addressType": "required|string",
                "location": "required|object",
                "location.coordinates": "required|array|length:2,2",
                "location.coordinates.0": "required|numeric|between:-180,180",
                "location.coordinates.1": "required|numeric|between:-90,90"
            }, {
                "streetName.required": appMessage.validation.required.streetName,
                "streetName.string": appMessage.validation.string.streetName,
                "address.required": appMessage.validation.required.address,
                "address.string": appMessage.validation.string.address,
                "country.required": appMessage.validation.required.country,
                "country.string": appMessage.validation.string.country,
                "subdivision.required": appMessage.validation.required.subdivision,
                "subdivision.string": appMessage.validation.string.subdivision,
                "addressType.required": appMessage.validation.required.addressType,
                "addressType.string": appMessage.validation.string.addressType,
                "location.required": appMessage.validation.required.location,
                "location.object": appMessage.validation.object.location,
                "location.coordinates.required": appMessage.validation.required.locationCoordinates,
                "location.coordinates.array": appMessage.validation.array.locationCoordinates,
                "location.coordinates.length": appMessage.validation.length.coordinates,
                "location.coordinates.0.required": appMessage.validation.required.locationLongitude,
                "location.coordinates.0.numeric": appMessage.validation.numeric.locationLongitude,
                "location.coordinates.0.between": appMessage.validation.between.locationLongitude,
                "location.coordinates.1.required": appMessage.validation.required.locationLatitude,
                "location.coordinates.1.numeric": appMessage.validation.numeric.locationLatitude,
                "location.coordinates.1.between": appMessage.validation.between.locationLatitude
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
    deleteAddress: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "addressId": "required|string|mongoId"
            }, {
                "addressId.required": appMessage.validation.required.id,
                "addressId.string": appMessage.validation.string.id,
                "addressId.mongoId": appMessage.validation.common.invalidMongoId
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
    fetchAddress: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "addressId": "required|string|mongoId"
            }, {
                "addressId.required": appMessage.validation.required.id,
                "addressId.string": appMessage.validation.string.id,
                "addressId.mongoId": appMessage.validation.common.invalidMongoId
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
    createContact: (method) => async (call, callback) => {
        try {
            const bodyValidator = new Validator(call.request, {
                "contact": "required|string",
                "countryCode": "required|string",
                "dialCode": "required|string",
                "contactType": "required|string"
            }, {
                "contact.required": appMessage.validation.required.contact,
                "contact.string": appMessage.validation.string.contact,
                "countryCode.required": appMessage.validation.required.countryCode,
                "countryCode.string": appMessage.validation.string.countryCode,
                "dialCode.required": appMessage.validation.required.dialCode,
                "dialCode.string": appMessage.validation.string.dialCode,
                "contactType.required": appMessage.validation.required.contactType,
                "contactType.string": appMessage.validation.string.contactType
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
    updateContact: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "contactId": "required|string|mongoId"
            }, {
                "contactId.required": appMessage.validation.required.id,
                "contactId.string": appMessage.validation.string.id,
                "contactId.mongoId": appMessage.validation.common.invalidMongoId
            });
            const matchedParams = await paramsValidator.check();
            if (!matchedParams) {
                const message = getFirstErrorMessage(paramsValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }

            const bodyValidator = new Validator(call.request, {
                "contact": "required|string",
                "countryCode": "required|string",
                "dialCode": "required|string",
                "contactType": "required|string"
            }, {
                "contact.required": appMessage.validation.required.contact,
                "contact.string": appMessage.validation.string.contact,
                "countryCode.required": appMessage.validation.required.countryCode,
                "countryCode.string": appMessage.validation.string.countryCode,
                "dialCode.required": appMessage.validation.required.dialCode,
                "dialCode.string": appMessage.validation.string.dialCode,
                "contactType.required": appMessage.validation.required.contactType,
                "contactType.string": appMessage.validation.string.contactType
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
    deleteContact: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "contactId": "required|string|mongoId"
            }, {
                "contactId.required": appMessage.validation.required.contactId,
                "contactId.string": appMessage.validation.string.contactId,
                "contactId.mongoId": appMessage.validation.common.invalidMongoId
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
    fetchContact: (method) => async (call, callback) => {
        try {
            const paramsValidator = new Validator(call.request.reqParams || {}, {
                "contactId": "required|string|mongoId"
            }, {
                "contactId.required": appMessage.validation.required.contactId,
                "contactId.string": appMessage.validation.string.contactId,
                "contactId.mongoId": appMessage.validation.common.invalidMongoId
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
    }
}