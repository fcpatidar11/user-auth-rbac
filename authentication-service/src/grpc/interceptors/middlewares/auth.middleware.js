const jwtUtil = require("@shared/utils/jwt.util");
const appMessage = require("@messages/app.message");
const responseFormatter = require("@src/formatters/grpc.response");

module.exports = {
    validateAuthToken: (method) => (call, callback) => {
        const metadata = call.metadata?.getMap() || {};
        if (!metadata["request-authorization"]) {
            return responseFormatter.handleUnauthenticated(call, callback, appMessage.authorization.tokenMissing);
        }
        const [bearer, token] = metadata["request-authorization"].split(" ");
        if (bearer !== "Bearer" || !token) {
            return responseFormatter.handleUnauthenticated(call, callback, appMessage.authorization.tokenFormatInvalid);
        }

        jwtUtil.validateAuthToken(token).then(data => {
            if (data.userId) {
                call.metadata.add("auth-user-id", data.userId);
                return method(call, callback);
            } else {
                return responseFormatter.handleUnauthenticated(call, callback, appMessage.authorization.tokenInvalid);
            }
        }).catch(error => {
            return responseFormatter.handleUnauthenticated(call, callback, error);
        })
    },

    validateInvitationVerificationToken: (method) => (call, callback) => {
        jwtUtil.validateInvitationVerificationToken(call.request.token).then(data => {
            if (data.userId) {
                call.metadata.add("request-user-id", data.userId);
                return method(call, callback);
            } else {
                return responseFormatter.handleUnauthenticated(call, callback, appMessage.invitationVerification.tokenInvalid);
            }
        }).catch(error => {
            return responseFormatter.handleUnauthenticated(call, callback, error);
        })
    },

    validateResetPasswordToken: (method) => (call, callback) => {
        jwtUtil.validateResetPasswordToken(call.request.token).then(data => {
            if (data.userId) {
                call.metadata.add("request-user-id", data.userId);
                return method(call, callback);
            } else {
                return responseFormatter.handleUnauthenticated(call, callback, appMessage.passwordReset.tokenInvalid);
            }
        }).catch(error => {
            return responseFormatter.handleUnauthenticated(call, callback, error);
        })
    }
};
