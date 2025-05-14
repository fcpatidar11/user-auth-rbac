// const nodemailer = require("nodemailer");
const appConfig = require("@configs/app.config");
const serverLogger = require("@loggers/server.logger");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(appConfig.SMTP_KEY);
// Create a reusable transporter
// const transporter = nodemailer.createTransport({
//     host: appConfig.SMTP_HOST,
//     port: appConfig.SMTP_PORT,
//     secure: true,
//     auth: {
//         user: appConfig.SMTP_EMAIL,
//         pass: appConfig.SMTP_PASSWORD
//     },
//     tls: { rejectUnauthorized: false }
// });

// const sendMailNotification = async (recipients, cc = [], bcc = [], subject, html, attachments = []) => {
//     try {
//         const message = {
//             from: appConfig.SMTP_FROM_EMAIL,
//             to: recipients, cc, bcc,
//             subject, html, attachments
//         };

//         const info = await transporter.sendMail(message);
//         console.log(`✅ Email sent: ${info.messageId}`);
//         return info;
//     } catch (error) {
//         serverLogger.error(`Failed to send email: ${error.message}`, null, error)
//     }
// };

const sendMailNotification = async (recipients, cc = [], bcc = [], subject, html, attachments = []) => {
    try {
        const message = {
            to: recipients,
            from: appConfig.SMTP_FROM_EMAIL,  // Use From email set in config
            subject,
            html,
            cc,
            bcc,
            attachments
        };
        const info = await sgMail.send(message);
        console.log(`✅ Email sent via SendGrid: ${info[0].statusCode}`);
        return info;
    } catch (error) {
        serverLogger.error(`Failed to send email: ${error.message}`, null, error);
    }
};
module.exports = sendMailNotification;
