const { Validator } = require("node-input-validator");
const { getFirstErrorMessage } = require("@interceptors/validations/index.validation");
const appMessage = require("@messages/app.message");
const responseFormatter = require("@formatters/grpc.response");
const appConstant = require("@constants/app.constant");

module.exports = {
    login: (method) => async (call, callback) => {
        try {
            const bodyValidator = new Validator(call.request, {
                "email": "required|string|email",
                "password": "required|string"
            }, {
                "email.required": appMessage.validation.required.email,
                "email.string": appMessage.validation.string.email,
                "email.email": appMessage.validation.common.emailInvalid,
                "password.required": appMessage.validation.required.password,
                "password.string": appMessage.validation.string.password
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

    forgotPassword: (method) => async (call, callback) => {
        try {
            const bodyValidator = new Validator(call.request, {
                "email": "required|string|email"
            }, {
                "email.required": appMessage.validation.required.email,
                "email.string": appMessage.validation.string.email,
                "email.email": appMessage.validation.common.emailInvalid
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

    resetPassword: (method) => async (call, callback) => {
        try {
            const bodyValidator = new Validator(call.request, {
                "token": "required|string",
                "password": "required|string|minLength:6"
            }, {
                "token.required": appMessage.validation.required.token,
                "token.string": appMessage.validation.string.token,
                "password.required": appMessage.validation.required.password,
                "password.string": appMessage.validation.string.password,
                "password.minLength": appMessage.validation.common.passwordMinLength
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

    acceptUserInvitation: (method) => async (call, callback) => {
        try {
            const bodyValidator = new Validator(call.request, {
                "token": "required|string",
                "password": "required|string|minLength:6"
            }, {
                "token.required": appMessage.validation.required.token,
                "token.string": appMessage.validation.string.token,
                "password.required": appMessage.validation.required.password,
                "password.string": appMessage.validation.string.password
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

    fetchUserInvitation: (method) => async (call, callback) => {
        try {
            const bodyValidator = new Validator(call.request, {
                "token": "required|string"
            }, {
                "token.required": appMessage.validation.required.token,
                "token.string": appMessage.validation.string.token
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

    signup: (method) => async (call, callback) => {
        try {
            const bodyValidator = new Validator(call.request, {
                "firstName": "required|string",
                "middleName": "string",
                "lastName": "required|string",
                "userName": "required|string",
                "email": "required|email",
                "password": "required|string|minLength:6",
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
                "password.required": appMessage.validation.required.password,
                "password.string": appMessage.validation.string.password,
                "password.minLength": appMessage.validation.common.passwordLength,
                "gender.required": appMessage.validation.required.gender,
                "gender.string": appMessage.validation.string.gender,
                "gender.in": appMessage.validation.common.invalidGender
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