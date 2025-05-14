const sendMailNotification = require("@mailer/app.mailer");
const appConstant = require("@constants/app.constant");
const serverLogger = require("@loggers/server.logger");
const fs = require("fs");
const appConfig = require("@configs/app.config");
const durationParser = require("@utils/durationParser.util");

module.exports = {
    sendForgotPasswordEmail: (user, token) => {
        try {
            let templateHtml = fs.readFileSync("shared/utils/templates/emails/forgotPassword.html", encoding = "utf8");
            templateHtml = templateHtml.replace("####SUPPORT_EMAIL####", appConfig.SMTP_FROM_EMAIL);
            templateHtml = templateHtml.replace("####SUPPORT_EMAIL####", appConfig.SMTP_FROM_EMAIL);
            templateHtml = templateHtml.replace("####CURRENT_YEAR####", new Date().getFullYear());
            templateHtml = templateHtml.replace("####RESET_LINK####", `${appConfig.AUTHENTICATION_SERVICE_WEB_RESET_PASSWORD_URL}?token=${token}`);
            templateHtml = templateHtml.replace("####RESET_LINK####", `${appConfig.AUTHENTICATION_SERVICE_WEB_RESET_PASSWORD_URL}?token=${token}`);
            templateHtml = templateHtml.replace("####USERNAME####", user.firstName);
            templateHtml = templateHtml.replace(/####PROJECTNAME####/g, appConfig.PROJECT_NAME);
            templateHtml = templateHtml.replace("####LINK_EXPIRE####", durationParser.formatDuration(appConfig.AUTHENTICATION_SERVICE_RESET_PASSWORD_TOKEN_EXPIRE_TIME));
            sendMailNotification([user.email], [], [], appConstant.EMAIL_TEMPLATES_SUBJECTS.RESET_PASSWORD, templateHtml, []);
        } catch (error) {
            serverLogger.error("Failed to send forgot password email", null, error);
        }
    },
    sendInvitationEmail: (user, token, role) => {
        try {
            let templateHtml = fs.readFileSync("shared/utils/templates/emails/invitationEmail.html", encoding = "utf8");
            templateHtml = templateHtml.replace("####SUPPORT_EMAIL####", appConfig.SMTP_FROM_EMAIL);
            templateHtml = templateHtml.replace("####SUPPORT_EMAIL####", appConfig.SMTP_FROM_EMAIL);
            templateHtml = templateHtml.replace("####CURRENT_YEAR####", new Date().getFullYear());
            templateHtml = templateHtml.replace("####VERIFICATION_LINK####", `${appConfig.AUTHENTICATION_SERVICE_WEB_INVITATION_URL}?token=${token}`);
            templateHtml = templateHtml.replace("####VERIFICATION_LINK####", `${appConfig.AUTHENTICATION_SERVICE_WEB_INVITATION_URL}?token=${token}`);
            templateHtml = templateHtml.replace("####USERNAME####", user.firstName);
            templateHtml = templateHtml.replace(/####PROJECTNAME####/g, appConfig.PROJECT_NAME);
            templateHtml = templateHtml.replace("####ROLE####", role);
            templateHtml = templateHtml.replace("####LINK_EXPIRE####", durationParser.formatDuration(appConfig.AUTHENTICATION_SERVICE_INVITATION_TOKEN_EXPIRE_TIME));
            sendMailNotification([user.email], [], [], appConstant.EMAIL_TEMPLATES_SUBJECTS.INVITATION_EMAIL, templateHtml, []);
        } catch (error) {
            serverLogger.error("Failed to send reset password email", null, error);
        }
    },
    sendResetPasswordConfirmation: (user) => {
        try {
            let templateHtml = fs.readFileSync("shared/utils/templates/emails/resetPasswordConfirmation.html", encoding = "utf8");
            templateHtml = templateHtml.replace("####SUPPORT_EMAIL####", appConfig.SMTP_FROM_EMAIL);
            templateHtml = templateHtml.replace("####SUPPORT_EMAIL####", appConfig.SMTP_FROM_EMAIL);
            templateHtml = templateHtml.replace("####CURRENT_YEAR####", new Date().getFullYear());
            templateHtml = templateHtml.replace("####USERNAME####", user.firstName);
            templateHtml = templateHtml.replace(/####PROJECTNAME####/g, appConfig.PROJECT_NAME);
            templateHtml = templateHtml.replace("####LOGIN_LINK####", appConfig.WEB_BASE_URL);
            sendMailNotification([user.email], [], [], appConstant.EMAIL_TEMPLATES_SUBJECTS.RESET_PASSWORD_CONFIRMATION, templateHtml, []);
        } catch (error) {
            serverLogger.error("Failed to send reset password confirmation email", null, error);
        }
    }
}