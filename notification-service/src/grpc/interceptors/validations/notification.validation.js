const { Validator } = require("node-input-validator");
const { getFirstErrorMessage } = require("@interceptors/validations/index.validation");
const appMessage = require("@messages/app.message");
const responseFormatter = require("@formatters/grpc.response");
const appConstant = require("@constants/app.constant");

module.exports = {
    sendEmailNotification: (method) => async (call, callback) => {
        try {
            const validator = new Validator(call.request, {
                "email": "required|string|email",
                "templateName": "required|string",
                "templateVariables": "required|array",
                "templateVariables.*.pattern": "required|string",
                "templateVariables.*.value": "required|string"
            }, {
                "email.required": appMessage.validation.required.email,
                "email.string": appMessage.validation.string.email,
                "email.email": appMessage.validation.common.emailInvalid,
                "templateName.required": appMessage.validation.required.templateName,
                "templateName.string": appMessage.validation.string.templateName,
                "templateVariables.required": appMessage.validation.required.templateVariables,
                "templateVariables.array": appMessage.validation.string.templateVariables,
                "templateVariables.*.pattern.required": appMessage.validation.required.templateVariablePattern,
                "templateVariables.*.pattern.string": appMessage.validation.string.templateVariablePattern,
                "templateVariables.*.value.required": appMessage.validation.required.templateVariableValue,
                "templateVariables.*.value.string": appMessage.validation.string.templateVariableValue
            });

            const matched = await validator.check();
            if (!matched) {
                const message = getFirstErrorMessage(validator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }

            // All validations passed
            return method(call, callback);

        } catch (error) {
            return responseFormatter.handleFailedPrecondition(call, callback, appMessage.common.error || "Validation error.");
        }
    },
    sendSMSNotification: (method) => async (call, callback) => {
        try {
            const validator = new Validator(call.request, {
                "phoneNumber": "required|string",
                "templateName": "required|string",
                "templateVariables": "required|array",
                "templateVariables.*.pattern": "required|string",
                "templateVariables.*.value": "required|string"
            }, {
                "phoneNumber.required": appMessage.validation.required.phoneNumber,
                "phoneNumber.string": appMessage.validation.string.phoneNumber,
                "templateName.required": appMessage.validation.required.templateName,
                "templateName.string": appMessage.validation.string.templateName,
                "templateVariables.required": appMessage.validation.required.templateVariables,
                "templateVariables.array": appMessage.validation.string.templateVariables,
                "templateVariables.*.pattern.required": appMessage.validation.required.templateVariablePattern,
                "templateVariables.*.pattern.string": appMessage.validation.string.templateVariablePattern,
                "templateVariables.*.value.required": appMessage.validation.required.templateVariableValue,
                "templateVariables.*.value.string": appMessage.validation.string.templateVariableValue
            });

            const matched = await validator.check();
            if (!matched) {
                const message = getFirstErrorMessage(validator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }

            return method(call, callback);
        } catch (error) {
            return responseFormatter.handleFailedPrecondition(call, callback, appMessage.common.error || "Validation error.");
        }
    },
    sendPushNotification: (method) => async (call, callback) => {
        try {
            const validator = new Validator(call.request, {
                "deviceToken": "required|string",
                "title": "required|string",
                "body": "required|string",
                "user.firstName": "required|string",
                "user.email": "required|string|email",
                "user.lastName": "required|string",
            }, {
                "deviceToken.required": appMessage.validation.required.deviceToken,
                "deviceToken.string": appMessage.validation.string.deviceToken,
                "title.required": appMessage.validation.required.title,
                "title.string": appMessage.validation.string.title,
                "body.required": appMessage.validation.required.body,
                "body.string": appMessage.validation.string.body,
                "user.firstName.required": appMessage.validation.required.firstName,
                "user.firstName.string": appMessage.validation.string.firstName,
                "user.email.required": appMessage.validation.required.email,
                "user.email.string": appMessage.validation.string.email,
                "user.email.email": appMessage.validation.common.emailInvalid,
                "user.lastName.required": appMessage.validation.required.lastName,
                "user.lastName.string": appMessage.validation.string.lastName,
            });

            const matched = await validator.check();
            if (!matched) {
                const message = getFirstErrorMessage(validator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }

            // All validations passed
            return method(call, callback);

        } catch (error) {
            return responseFormatter.handleFailedPrecondition(call, callback, appMessage.common.error || "Validation error.");
        }
    },
    sendVerificationCode: (method) => async (call, callback) => {
        try {
            const bodyValidator = new Validator(call.request, {
                "phoneNumber": "required|string"
            }, {
                "phoneNumber.required": appMessage.validation.required.phoneNumber,
                "phoneNumber.string": appMessage.validation.string.phoneNumber
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
    verifyOTPCode: (method) => async (call, callback) => {
        try {
            const bodyValidator = new Validator(call.request, {
                "phoneNumber": "required|string",
                "code": "required|string"
            }, {
                "phoneNumber.required": appMessage.validation.required.phoneNumber,
                "phoneNumber.string": appMessage.validation.string.phoneNumber,
                "code.required": appMessage.validation.required.code,
                "code.string": appMessage.validation.string.code
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
}