const twilio = require("twilio");
const AWS = require("aws-sdk");
const axios = require("axios");
const appConfig = require("@configs/app.config");
const serverLogger = require("@loggers/server.logger");

// Message builder
const buildSmsMessage = (to, message, from = null) => ({
    to,
    message,
    from
});

// Twilio
const sendViaTwilio = async (sms) => {
    if (!appConfig.TWILIO_ACCOUNT_SID || !appConfig.TWILIO_AUTH_TOKEN || !appConfig.TWILIO_PHONE_NUMBER) return null;

    const client = twilio(appConfig.TWILIO_ACCOUNT_SID, appConfig.TWILIO_AUTH_TOKEN);

    const result = await client.messages.create({
        body: sms.message,
        from: sms.from || appConfig.TWILIO_PHONE_NUMBER,
        to: sms.to
    });

    serverLogger.info(`SMS sent via Twilio: ${result.sid}`);
    return result;
};

// AWS SNS
const sendViaSNS = async (sms) => {
    if (!appConfig.AWS_ACCESS_KEY_ID || !appConfig.AWS_SECRET_ACCESS_KEY) return null;

    const sns = new AWS.SNS({
        accessKeyId: appConfig.AWS_ACCESS_KEY_ID,
        secretAccessKey: appConfig.AWS_SECRET_ACCESS_KEY,
        region: appConfig.AWS_REGION || "us-east-1"
    });

    const params = {
        Message: sms.message,
        PhoneNumber: sms.to
    };

    const result = await sns.publish(params).promise();
    serverLogger.info(`SMS sent via AWS SNS: ${result.MessageId}`);
    return result;
};

// Nexmo / Vonage
const sendViaNexmo = async (sms) => {
    if (!appConfig.NEXMO_API_KEY || !appConfig.NEXMO_API_SECRET || !appConfig.NEXMO_FROM_NUMBER) return null;

    const response = await axios.post('https://rest.nexmo.com/sms/json', {
        api_key: appConfig.NEXMO_API_KEY,
        api_secret: appConfig.NEXMO_API_SECRET,
        to: sms.to,
        from: sms.from || appConfig.NEXMO_FROM_NUMBER,
        text: sms.message
    });

    serverLogger.info(`SMS sent via Nexmo: ${response.data.messages?.[0]?.messageId}`);
    return response.data;
};

// TextMagic
const sendViaTextMagic = async (sms) => {
    if (!appConfig.TEXTMAGIC_USERNAME || !appConfig.TEXTMAGIC_API_KEY) return null;

    const auth = Buffer.from(`${appConfig.TEXTMAGIC_USERNAME}:${appConfig.TEXTMAGIC_API_KEY}`).toString("base64");

    const response = await axios.post(
        "https://rest.textmagic.com/api/v2/messages",
        {
            text: sms.message,
            phones: sms.to
        },
        {
            headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/json"
            }
        }
    );

    serverLogger.info(`SMS sent via TextMagic: ${response.data.id}`);
    return response.data;
};

// Main dispatcher
const sendSMSNotification = async (to, message, from = null) => {
    try {
        const sms = buildSmsMessage(to, message, from);

        const providers = [
            () => sendViaTwilio(sms),
            () => sendViaSNS(sms),
            () => sendViaNexmo(sms),
            () => sendViaTextMagic(sms)
        ];

        for (const provider of providers) {
            const result = await provider();
            if (result) return result;
        }

        serverLogger.error("No valid SMS provider configuration found.");
    } catch (error) {
        serverLogger.error(`Failed to send SMS: ${error.message}`, null, error);
    }
};

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
// const sendSMSNotification = (phoneNumber, messageBody) => {
//     return new Promise((resolve, reject) => {
//         client.messages
//             .create({
//                 body: messageBody,
//                 from: appConfig.TWILIO_PHONE_NUMBER, // e.g. '+13346335892'
//                 to: phoneNumber
//             })
//             .then(message => {
//                 console.log(`📨 SMS sent: ${message.sid}`);
//                 resolve(message);
//             })
//             .catch(error => {
//                 console.error(`❌ Failed to send SMS: ${error.message}`);
//                 reject(error);
//             });
//     });
// };
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