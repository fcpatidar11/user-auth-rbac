const appMessage = require("@messages/app.message");
const serverLogger = require("@loggers/server.logger");
const sendEmail = require("@templates/email.template");
const responseFormatter = require("@formatters/grpc.response");
const appConstant = require("@constants/app.constant");

module.exports = {
    // sendEmailNotification: async (call, callback) => {
    //     try {
    //         const { templateKey, user, token, role } = call.request;
    //         switch (templateKey) {
    //             case "RESET_PASSWORD":
    //                 return sendEmail.sendForgotPasswordEmail(user, token);
    //             case "INVITATION_EMAIL":
    //                 return sendEmail.sendInvitationEmail(user, token, role);
    //             case "RESET_PASSWORD_CONFIRMATION":
    //                 return sendEmail.sendResetPasswordConfirmation(user);
    //             default:
    //                 throw new Error("Invalid template key");
    //         }

    //         return responseFormatter.handleOk(call, callback, appMessage.user.invitationInfo, { user }, null);

    //     } catch (error) {
    //         serverLogger.error(appMessage.user.notFound, null, error);
    //         return responseFormatter.handleInternal(call, callback, appMessage.user.notFound);
    //     }
    // }
    sendEmailNotification: async (call, callback) => {
        try {
            const { templateKey, user, token, role } = call.request;

            switch (templateKey) {
                case appConstant.EMAIL_TEMPLATES.RESET_PASSWORD:
                    await sendEmail.sendForgotPasswordEmail(user, token);
                    break;
                case appConstant.EMAIL_TEMPLATES.INVITATION_EMAIL:
                    await sendEmail.sendInvitationEmail(user, token, role);
                    break;
                case appConstant.EMAIL_TEMPLATES.RESET_PASSWORD_CONFIRMATION:
                    await sendEmail.sendResetPasswordConfirmation(user);
                    break;
                default:
                    return responseFormatter.handleInvalidArgument(call, callback, appMessage.notification.templateInvalid);
            }
            return responseFormatter.handleOk(call, callback, appMessage.user.invitationInfo, { user }, null);

        } catch (error) {
            serverLogger.error("Failed to send email notification", null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.notFound);
        }
    }

};