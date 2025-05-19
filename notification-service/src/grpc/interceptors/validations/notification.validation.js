const { Validator } = require("node-input-validator");
const { getFirstErrorMessage } = require("@interceptors/validations/index.validation");
const appMessage = require("@messages/app.message");
const responseFormatter = require("@formatters/grpc.response");
const appConstant = require("@constants/app.constant");

module.exports = {
    sendEmailNotification: (method) => async (call, callback) => {
        try {
            const { templateKey } = call.request;

            // Base validation for templateKey
            const baseValidator = new Validator(call.request, {
                templateKey: "required|string"
            }, {
                "templateKey.required": appMessage.validation.required.templateKey,
                "templateKey.string": appMessage.validation.string.templateKey
            });

            const isBaseValid = await baseValidator.check();
            if (!isBaseValid) {
                const message = getFirstErrorMessage(baseValidator);
                return responseFormatter.handleFailedPrecondition(call, callback, message);
            }

            // Conditional validation based on templateKey
            if (templateKey === appConstant.EMAIL_TEMPLATES.RESET_PASSWORD) {
                const validator = new Validator(call.request, {
                    "user.email": "required|string|email",
                    "user.firstName": "required|string",
                    "user.lastName": "required|string",
                    token: "required|string"
                }, {
                    "user.email.required": appMessage.validation.required.email,
                    "user.email.string": appMessage.validation.string.email,
                    "user.email.email": appMessage.validation.common.emailInvalid,
                    "user.firstName.required": appMessage.validation.required.firstName,
                    "user.firstName.string": appMessage.validation.string.firstName,
                    "user.lastName.required": appMessage.validation.required.lastName,
                    "user.lastName.string": appMessage.validation.string.lastName,
                    "token.required": appMessage.validation.required.jwtToken,
                    "token.string": appMessage.validation.string.jwtToken,
                });
                const matched = await validator.check();
                if (!matched) {
                    const message = getFirstErrorMessage(validator);
                    return responseFormatter.handleFailedPrecondition(call, callback, message);
                }

            } else if (templateKey === appConstant.EMAIL_TEMPLATES.INVITATION_EMAIL) {
                const validator = new Validator(call.request, {
                    "user.email": "required|string|email",
                    "user.firstName": "required|string",
                    "user.lastName": "required|string",
                    token: "required|string",
                    role: "required|string"
                }, {
                    "user.email.required": appMessage.validation.required.email,
                    "user.email.string": appMessage.validation.string.email,
                    "user.email.email": appMessage.validation.common.emailInvalid,
                    "user.firstName.required": appMessage.validation.required.firstName,
                    "user.firstName.string": appMessage.validation.string.firstName,
                    "user.lastName.required": appMessage.validation.required.lastName,
                    "user.lastName.string": appMessage.validation.string.lastName,
                    "token.required": appMessage.validation.required.jwtToken,
                    "token.string": appMessage.validation.string.jwtToken,
                    "role.required": appMessage.validation.required.role,
                    "role.string": appMessage.validation.string.role
                });
                const matched = await validator.check();
                if (!matched) {
                    const message = getFirstErrorMessage(validator);
                    return responseFormatter.handleFailedPrecondition(call, callback, message);
                }

            } else if (templateKey === appConstant.EMAIL_TEMPLATES.RESET_PASSWORD_CONFIRMATION) {
                const validator = new Validator(call.request, {
                    "user.email": "required|string|email",
                    "user.firstName": "required|string",
                    "user.lastName": "required|string",
                }, {
                    "user.email.required": appMessage.validation.required.email,
                    "user.email.string": appMessage.validation.string.email,
                    "user.email.email": appMessage.validation.common.emailInvalid,
                    "user.firstName.required": appMessage.validation.required.firstName,
                    "user.firstName.string": appMessage.validation.string.firstName,
                    "user.lastName.required": appMessage.validation.required.lastName,
                    "user.lastName.string": appMessage.validation.string.lastName,
                });
                const matched = await validator.check();
                if (!matched) {
                    const message = getFirstErrorMessage(validator);
                    return responseFormatter.handleFailedPrecondition(call, callback, message);
                }

            } else {
                return responseFormatter.handleInvalidArgument(call, callback, appMessage.notification.templateInvalid);
            }

            // If all validations pass, proceed
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
    sendSMSNotification: (method) => async (call, callback) => {
        try {
            const bodyValidator = new Validator(call.request, {
                "phoneNumber": "required|string",
                "message": "required|string"
            }, {
                "phoneNumber.required": appMessage.validation.required.phoneNumber,
                "phoneNumber.string": appMessage.validation.string.phoneNumber,
                "message.required": appMessage.validation.required.firstName,
                "message.string": appMessage.validation.string.firstName
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