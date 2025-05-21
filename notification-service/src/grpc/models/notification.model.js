const appMessage = require("@messages/app.message");
const serverLogger = require("@loggers/server.logger");
const responseFormatter = require("@formatters/grpc.response");
const appConstant = require("@constants/app.constant");
const sendMailNotification = require("@mailer/app.mailer");
const sendPushNotification = require("@push/app.push");
const { sendVerificationCode, sendSMSNotification, verifyCode } = require("@sms/app.sms");
const emailTemplateHelper = require("@helpers/emailTemplate.helper");
const SMSTemplateHelper = require("@helpers/smsTemplate.helper");

module.exports = {
    sendEmailNotification: async (call, callback) => {
        try {
            const { email, templateName, templateVariables } = call.request;
            let emailTemplateData = await emailTemplateHelper.retrieve({ templateName: templateName });
            if (!emailTemplateData) {
                return responseFormatter.handleInvalidArgument(call, callback, appMessage.notification.templateInvalid);
            }

            let templateHtml = emailTemplateData.template.replace(/####BODY####/g, emailTemplateData.templateBody);

            // Step 2: Replace dynamic placeholders in the combined template
            for (const { pattern, value } of templateVariables) {
                if (pattern && value) {
                    templateHtml = templateHtml.replace(new RegExp(pattern, 'g'), value);
                }
            }

            await sendMailNotification(emailTemplateData.sendFrom, [email], [], [], emailTemplateData.subject || appConstant.EMAIL_TEMPLATES_SUBJECTS.INVITATION_EMAIL, templateHtml, []);

            // await sendEmail.sendEmail(user, emailTemplateData, templateVariables);

            return responseFormatter.handleOk(call, callback, appMessage.notification.emailNotificationSent, {}, null);

        } catch (error) {
            serverLogger.error("Failed to send email notification", null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.notification.emailNotificationFailed);
        }
    },
    sendSMSNotification: async (call, callback) => {
        try {
            const { phoneNumber, templateName, templateVariables } = call.request;
            let smsTemplateData = await SMSTemplateHelper.retrieve({ templateName: templateName });
            if (!smsTemplateData) {
                return responseFormatter.handleInvalidArgument(call, callback, appMessage.notification.templateInvalid);
            }

            let message = smsTemplateData.message;

            // Step 2: Replace dynamic placeholders in the combined template
            for (const { pattern, value } of templateVariables) {
                if (pattern && value) {
                    message = message.replace(new RegExp(pattern, 'g'), value);
                }
            }

            sendSMSNotification(phoneNumber, message)
                .then(result => {
                    const responseData = { messageSid: result.sid };
                    return responseFormatter.handleOk(call, callback, appMessage.notification.smsNotificationSent, responseData, null);
                })
                .catch(err => {
                    serverLogger.error("SMS Error:", null, err);
                    // const resMessage = err?.code === 60200
                    //     ? "Please make sure that the mobile number provided is valid."
                    //     : "Failed to send SMS.";
                    return responseFormatter.handleInternal(call, callback, appMessage.notification.smsNotificationFailed);
                });

        } catch (error) {
            serverLogger.error("SMS Error:", null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.user.notFound);
        }
    },

    sendPushNotification: async (call, callback) => {
        try {
            const { deviceToken, title, body, user } = call.request;

            sendPushNotification(deviceToken, title, body, user)
                .then(result => {
                    const responseData = { messageSid: result };
                    return responseFormatter.handleOk(call, callback, appMessage.notification.pushNotificationSent, responseData, null);
                })
                .catch(err => {
                    serverLogger.error("Push notification Error", null, err);
                    const resMessage = err?.code === 60200
                        ? "Please make sure that the mobile number provided is valid."
                        : "Failed to send SMS.";
                    return responseFormatter.handleInternal(call, callback, resMessage);
                });

        } catch (error) {
            serverLogger.error("Push notification Error", null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.notification.pushNotificationFailed);
        }
    },
    sendVerificationCode: async (call, callback) => {
        try {
            const { phoneNumber } = call.request;
            sendVerificationCode(phoneNumber).then(verification => {
                console.log(verification.sid);
                console.log(verification.sid)
                const verificationCode = verification.sid;
                return responseFormatter.handleOk(call, callback, appMessage.notification.emailNotificationSent, { verificationCode }, null);
            }).catch(err => {
                serverLogger.error("Failed to send email notification", null, err);
                // const resMessage = err && err.code && err.code == "60200" ? "Please make sure that the mobile number provided is valid." : "Not send";
                return responseFormatter.handleInternal(call, callback, appMessage.notification.emailNotificationFailed);

                // return res.status(422).json({ success: false, message: resMessage, response: {} });
            });

        } catch (error) {
            serverLogger.error("Failed to send email notification", null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.notification.emailNotificationFailed);
        }
    },
    verifyOTPCode: async (call, callback) => {
        try {
            const { phoneNumber, code } = call.request;
            verifyCode(phoneNumber, code)
                .then(result => {
                    if (result.status === "approved") {
                        return responseFormatter.handleOk(call, callback, appMessage.notification.verified, { phoneNumber }, null);
                    } else {
                        return responseFormatter.handleInvalidArgument(call, callback, appMessage.notification.invalidCode);
                    }
                })
                .catch(err => {
                    serverLogger.error("Failed to verify code", null, err);
                    const resMessage = err?.code === 60200
                        ? "Invalid phone number."
                        : "Code verification failed.";
                    return responseFormatter.handleInternal(call, callback, resMessage);
                });
        } catch (error) {
            serverLogger.error("Failed to verify code", null, error);
            return responseFormatter.handleInternal(call, callback, appMessage.notification.verificationFailed);
        }
    }
};