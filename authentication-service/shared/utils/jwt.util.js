const jwt = require("jsonwebtoken");
const appConfig = require("@configs/app.config");
const appMessage = require("@messages/app.message");

module.exports = {
    generateAuthToken: (payload) => {
        return new Promise((resolve, reject) =>
            jwt.sign(payload, appConfig.AUTHENTICATION_SERVICE_AUTH_SECRET_KEY, { expiresIn: appConfig.AUTHENTICATION_SERVICE_AUTH_TOKEN_EXPIRE_TIME },
                (error, token) => error ? reject(appMessage.authorization.tokenGenerateFailed) : resolve(token)
            )
        );
    },

    validateAuthToken: (token) => {
        return new Promise((resolve, reject) =>
            jwt.verify(token, appConfig.AUTHENTICATION_SERVICE_AUTH_SECRET_KEY, (error, decoded) => {
                if (error) {
                    const errorMessages = {
                        TokenExpiredError: appMessage.authorization.tokenExpired,
                        JsonWebTokenError: appMessage.authorization.tokenInvalid,
                        NotBeforeError: appMessage.authorization.tokenFormatInvalid
                    };
                    return reject(errorMessages[error.name] || appMessage.authorization.tokenInvalid);
                }
                resolve(decoded);
            })
        );
    },

    generateResetPasswordToken: (payload) => {
        return new Promise((resolve, reject) =>
            jwt.sign(payload, appConfig.AUTHENTICATION_SERVICE_RESET_PASSWORD_SECRET_KEY, { expiresIn: appConfig.AUTHENTICATION_SERVICE_RESET_PASSWORD_TOKEN_EXPIRE_TIME },
                (error, token) => error ? reject(appMessage.passwordReset.tokenGenerateFailed) : resolve(token)
            )
        );
    },

    validateResetPasswordToken: (token) => {
        return new Promise((resolve, reject) =>
            jwt.verify(token, appConfig.AUTHENTICATION_SERVICE_RESET_PASSWORD_SECRET_KEY, (error, decoded) => {
                if (error) {
                    const errorMessages = {
                        TokenExpiredError: appMessage.passwordReset.tokenExpired,
                        JsonWebTokenError: appMessage.passwordReset.tokenInvalid,
                        NotBeforeError: appMessage.passwordReset.tokenFormatInvalid
                    };
                    return reject(errorMessages[error.name] || appMessage.passwordReset.tokenInvalid);
                }
                resolve(decoded);
            })
        );
    },

    generateInvitationVerificationToken: (payload) => {
        return new Promise((resolve, reject) =>
            jwt.sign(payload, appConfig.AUTHENTICATION_SERVICE_INVITATION_SECRET_KEY, { expiresIn: appConfig.AUTHENTICATION_SERVICE_INVITATION_TOKEN_EXPIRE_TIME },
                (error, token) => error ? reject(appMessage.invitationVerification.tokenGenerateFailed) : resolve(token)
            )
        );
    },

    validateInvitationVerificationToken: (token) => {
        return new Promise((resolve, reject) =>
            jwt.verify(token, appConfig.AUTHENTICATION_SERVICE_INVITATION_SECRET_KEY, (error, decoded) => {
                if (error) {
                    const errorMessages = {
                        TokenExpiredError: appMessage.invitationVerification.tokenExpired,
                        JsonWebTokenError: appMessage.invitationVerification.tokenInvalid,
                        NotBeforeError: appMessage.invitationVerification.tokenFormatInvalid
                    };
                    return reject(errorMessages[error.name] || appMessage.invitationVerification.tokenInvalid);
                }
                resolve(decoded);
            })
        );
    }
};