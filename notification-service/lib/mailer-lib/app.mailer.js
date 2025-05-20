const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const AWS = require("aws-sdk");
const appConfig = require("@configs/app.config");
const serverLogger = require("@loggers/server.logger");

// Shared message builder
const buildMessage = (sendFrom, recipients, cc, bcc, subject, html, attachments) => {
    return {
        from: sendFrom || appConfig.SMTP_FROM_EMAIL,
        to: recipients,
        subject,
        html,
        ...(cc?.length && { cc }),
        ...(bcc?.length && { bcc }),
        ...(attachments?.length && { attachments })
    };
};

// Send via SendGrid
const sendViaSendGrid = async (message) => {
    if (!appConfig.SENDGRID_API_KEY) return null;

    sgMail.setApiKey(appConfig.SENDGRID_API_KEY);
    const response = await sgMail.send(message);
    serverLogger.info(`✅ Email sent via SendGrid: ${response[0].statusCode}`);
    return response;
};

// Send via AWS SES
const sendViaSES = async (sendFrom, recipients, cc, bcc, subject, html) => {
    if (!appConfig.AWS_ACCESS_KEY_ID || !appConfig.AWS_SECRET_ACCESS_KEY) return null;

    const ses = new AWS.SES({
        accessKeyId: appConfig.AWS_ACCESS_KEY_ID,
        secretAccessKey: appConfig.AWS_SECRET_ACCESS_KEY,
        region: appConfig.AWS_REGION || "us-east-1"
    });

    const params = {
        Source: sendFrom || appConfig.SMTP_FROM_EMAIL,
        Destination: {
            ToAddresses: Array.isArray(recipients) ? recipients : [recipients],
            ...(cc?.length && { CcAddresses: cc }),
            ...(bcc?.length && { BccAddresses: bcc })
        },
        Message: {
            Subject: { Charset: "UTF-8", Data: subject },
            Body: {
                Html: { Charset: "UTF-8", Data: html },
                Text: { Charset: "UTF-8", Data: html.replace(/<[^>]*>?/gm, "") }
            }
        }
    };

    const result = await ses.sendEmail(params).promise();
    serverLogger.info(`Email sent via AWS SES: ${result.MessageId}`);
    return result;
};

// Send via SMTP
const sendViaSMTP = async (message) => {
    if (!appConfig.SMTP_HOST || !appConfig.SMTP_EMAIL || !appConfig.SMTP_PASSWORD) return null;

    const transporter = nodemailer.createTransport({
        host: appConfig.SMTP_HOST,
        port: appConfig.SMTP_PORT,
        secure: true,
        auth: {
            user: appConfig.SMTP_EMAIL,
            pass: appConfig.SMTP_PASSWORD
        },
        tls: { rejectUnauthorized: false }
    });

    const info = await transporter.sendMail(message);
    serverLogger.info(`Email sent via SMTP: ${info.messageId}`);
    return info;
};

// Send via Gmail
const sendViaGmail = async (message) => {
    if (!appConfig.GMAIL_USER || !appConfig.GMAIL_PASSWORD) return null;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: appConfig.GMAIL_USER,
            pass: appConfig.GMAIL_PASSWORD
        }
    });

    const info = await transporter.sendMail(message);
    serverLogger.info(`Email sent via Gmail: ${info.messageId}`);
    return info;
};

// Main dispatcher with priority sequence
const sendMailNotification = async (sendFrom, recipients, cc = [], bcc = [], subject, html, attachments = []) => {
    try {
        const message = buildMessage(sendFrom, recipients, cc, bcc, subject, html, attachments);

        const providers = [
            () => sendViaSendGrid(message),
            () => sendViaSMTP(message),
            () => sendViaSES(sendFrom, recipients, cc, bcc, subject, html),
            () => sendViaGmail(message)
        ];

        for (const provider of providers) {
            const result = await provider();
            if (result) return result;
        }

        serverLogger.error("No valid email configuration found.");
    } catch (error) {
        serverLogger.error(`Failed to send email: ${error.message}`, null, error);
    }
};

module.exports = sendMailNotification;
