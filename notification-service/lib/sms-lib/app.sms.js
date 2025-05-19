// const nodemailer = require("nodemailer");
const appConfig = require("@configs/app.config");
const accountSid = appConfig.TWILIO_ACCOUNT_SID;
const authToken = appConfig.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
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

const sendVerificationCode = (phoneNumber) => {
    return new Promise((resolve, reject) => {
        client.verify.v2.services(appConfig.TWILIO_ACCOUNT_OTP_SID)
            .verifications
            .create({
                to: phoneNumber,
                channel: "sms"
            }).then(verification => {
                resolve(verification);
            }).catch(err => {
                reject(err);
            });
    });
};
const sendSMSNotification = (phoneNumber, messageBody) => {
    return new Promise((resolve, reject) => {
        client.messages
            .create({
                body: messageBody,
                from: appConfig.TWILIO_PHONE_NUMBER, // e.g. '+13346335892'
                to: phoneNumber
            })
            .then(message => {
                console.log(`📨 SMS sent: ${message.sid}`);
                resolve(message);
            })
            .catch(error => {
                console.error(`❌ Failed to send SMS: ${error.message}`);
                reject(error);
            });
    });
};
const verifyCode = (phoneNumber, code) => {
    return new Promise((resolve, reject) => {
        client.verify.v2.services(appConfig.TWILIO_ACCOUNT_OTP_SID)
            .verificationChecks
            .create({
                to: phoneNumber,
                code: code
            })
            .then(verificationCheck => {
                resolve(verificationCheck);
            })
            .catch(err => {
                reject(err);
            });
    });
};

// Export all functions
module.exports = {
    sendVerificationCode,
    sendSMSNotification,
    verifyCode // 👈 Add this to your exports
};