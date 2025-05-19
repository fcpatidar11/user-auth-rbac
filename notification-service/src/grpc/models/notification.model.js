const appMessage = require("@messages/app.message");
const serverLogger = require("@loggers/server.logger");
const sendEmail = require("@templates/email.template");
const responseFormatter = require("@formatters/grpc.response");
const appConstant = require("@constants/app.constant");
const { sendVerificationCode, sendSMSNotification, verifyCode } = require("@sms/app.sms");


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
    },

    sendVerificationCode: async (call, callback) => {
        try {
            const { phoneNumber } = call.request;
            sendVerificationCode(phoneNumber).then(verification => {
                console.log(verification.sid);
                console.log(verification.sid)
                const verificationCode = verification.sid;
                return responseFormatter.handleOk(call, callback, appMessage.user.invitationInfo, { verificationCode }, null);
            }).catch(err => {
                console.log(err);
                const resMessage = err && err.code && err.code == "60200" ? "Please make sure that the mobile number provided is valid." : "Not send";
                return responseFormatter.handleInternal(call, callback, resMessage);

                // return res.status(422).json({ success: false, message: resMessage, response: {} });
            });

        } catch (error) {
            serverLogger.error("Failed to send email notification", null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.notFound);
        }
    },
    sendSMSNotification: async (call, callback) => {
        try {
            const { phoneNumber, message = 'Hello Narendra bhai ' } = call.request;
            sendSMSNotification(phoneNumber, message)
                .then(result => {
                    console.log("✅ SMS SID:", result.sid);
                    const responseData = { messageSid: result.sid };
                    return responseFormatter.handleOk(call, callback, appMessage.user.invitationInfo, responseData, null);
                })
                .catch(err => {
                    console.error("❌ SMS Error:", err);
                    const resMessage = err?.code === 60200
                        ? "Please make sure that the mobile number provided is valid."
                        : "Failed to send SMS.";
                    return responseFormatter.handleInternal(call, callback, resMessage);
                });

        } catch (error) {
            serverLogger.error("Failed to send email notification", null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.notFound);
        }
    },
    verifyOTPCode: async (call, callback) => {
        try {
            const { phoneNumber, code } = call.request;
            verifyCode(phoneNumber, code)
                .then(result => {
                    if (result.status === "approved") {
                        return responseFormatter.handleOk(call, callback, "Verification successful", { phoneNumber }, null);
                    } else {
                        return responseFormatter.handleInvalidArgument(call, callback, "Invalid or expired code.");
                    }
                })
                .catch(err => {
                    console.error("❌ Code Verification Failed:", err);
                    const resMessage = err?.code === 60200
                        ? "Invalid phone number."
                        : "Code verification failed.";
                    return responseFormatter.handleInternal(call, callback, resMessage);
                });
        } catch (error) {
            serverLogger.error("Failed to verify code", null, error);
            return responseFormatter.handleInternal(call, callback, "Failed to verify code.");
        }
    }
};