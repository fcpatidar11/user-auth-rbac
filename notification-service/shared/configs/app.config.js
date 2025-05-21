const dotenv = require('dotenv');
const path = require("path");

// Load environment variables from specific file
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'local'}` });

module.exports = {
    AUTHENTICATION_SERVICE_DATABASE_URL: process.env.AUTHENTICATION_SERVICE_DATABASE_URL,
    NOTIFICATION_SERVICE_ADDRESS: process.env.NOTIFICATION_SERVICE_ADDRESS,
    AUTHENTICATION_SERVICE_DEFAULT_LANGUAGE: process.env.AUTHENTICATION_SERVICE_DEFAULT_LANGUAGE,
    NOTIFICATION_SERVICE_PROTO_PATH: path.join(process.cwd(), `../proto-schemas/notification-service`),

    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,

    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_EMAIL: process.env.SMTP_EMAIL,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL,

    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,

    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,

    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_ACCOUNT_OTP_SID: process.env.TWILIO_ACCOUNT_OTP_SID,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,

    NEXMO_API_KEY: process.env.NEXMO_API_KEY,
    NEXMO_API_SECRET: process.env.NEXMO_API_SECRET,
    NEXMO_FROM_NUMBER: process.env.NEXMO_FROM_NUMBER,

    TEXTMAGIC_USERNAME: process.env.TEXTMAGIC_USERNAME,
    TEXTMAGIC_API_KEY: process.env.TEXTMAGIC_API_KEY,

    USE_FCM: process.env.USE_FCM === "true",

    ONESIGNAL_APP_ID: process.env.ONESIGNAL_APP_ID,
    ONESIGNAL_API_KEY: process.env.ONESIGNAL_API_KEY,

    EXPO_ACCESS_TOKEN: process.env.EXPO_ACCESS_TOKEN,
};