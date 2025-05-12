const { Validator } = require("node-input-validator");
const { getFirstErrorMessage } = require("@interceptors/validations/index.validation");
const appMessage = require("@messages/app.message");
const responseFormatter = require("@formatters/grpc.response");

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
    }
}