const axios = require("axios");
const AWS = require("aws-sdk");
const admin = require("firebase-admin"); // FCM
const { Expo } = require('expo-server-sdk'); // Expo
const appConfig = require("@configs/app.config");
const serverLogger = require("@loggers/server.logger");
const path = require("path");

// Push message builder
const buildPushMessage = (deviceToken, title, body, data = {}) => ({
    deviceToken,
    title,
    body,
    data: {
        ...data,
        message: body,
        title
    }
});

// Firebase Cloud Messaging
const sendViaFCM = async (push) => {
    if (!appConfig.USE_FCM) return null; // <-- Control via config

    const serviceAccount = require(path.resolve(__dirname, "../../firebase-service-account.json"));

    // ✅ Initialize Firebase once, no condition
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }

    const message = {
        token: push.deviceToken,
        notification: {
            title: push.title,
            body: push.body
        },
        data: push.data
    };

    try {
        const result = await admin.messaging().send(message);
        serverLogger.info(`Push sent via FCM: ${result}`);
        return result;
    } catch (err) {
        serverLogger.error("FCM Push Error:", err);
        return null;
    }
};

// OneSignal
const sendViaOneSignal = async (push) => {
    if (!appConfig.ONESIGNAL_APP_ID || !appConfig.ONESIGNAL_API_KEY) return null;

    const payload = {
        app_id: appConfig.ONESIGNAL_APP_ID,
        include_player_ids: [push.deviceToken],
        headings: { en: push.title },
        contents: { en: push.body },
        data: push.data
    };

    try {
        const result = await axios.post("https://onesignal.com/api/v1/notifications", payload, {
            headers: {
                Authorization: `Basic ${appConfig.ONESIGNAL_API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        serverLogger.info(`Push sent via OneSignal: ${result.data.id}`);
        return result.data;
    } catch (err) {
        serverLogger.error("OneSignal Push Error:", err);
        return null;
    }
};

// AWS SNS (Mobile Push)
const sendViaSNSPush = async (push) => {
    if (!appConfig.AWS_ACCESS_KEY_ID || !appConfig.AWS_SECRET_ACCESS_KEY) return null;

    const sns = new AWS.SNS({
        accessKeyId: appConfig.AWS_ACCESS_KEY_ID,
        secretAccessKey: appConfig.AWS_SECRET_ACCESS_KEY,
        region: appConfig.AWS_REGION || "us-east-1"
    });

    const payload = {
        default: push.body,
        APNS: JSON.stringify({
            aps: {
                alert: { title: push.title, body: push.body },
                sound: "default"
            },
            ...push.data
        }),
        GCM: JSON.stringify({
            notification: { title: push.title, body: push.body },
            data: push.data
        })
    };

    const params = {
        Message: JSON.stringify(payload),
        MessageStructure: "json",
        TargetArn: push.deviceToken
    };

    try {
        const result = await sns.publish(params).promise();
        serverLogger.info(`Push sent via SNS: ${result.MessageId}`);
        return result;
    } catch (err) {
        serverLogger.error("SNS Push Error:", err);
        return null;
    }
};

// Expo Push Notifications
const sendViaExpo = async (push) => {
    if (!appConfig.EXPO_ACCESS_TOKEN) return null;

    // Check if the token is an Expo push token
    if (!Expo.isExpoPushToken(push.deviceToken)) {
        serverLogger.warn(`Device token ${push.deviceToken} is not a valid Expo push token`);
        return null;
    }

    try {
        const expo = new Expo({ accessToken: appConfig.EXPO_ACCESS_TOKEN });

        const message = {
            to: push.deviceToken,
            sound: 'default',
            title: push.title,
            body: push.body,
            data: push.data
        };

        const ticket = await expo.sendPushNotificationsAsync([message]);

        serverLogger.info(`Push sent via Expo: ${JSON.stringify(ticket)}`);
        return ticket[0];
    } catch (err) {
        serverLogger.error("Expo Push Error:", err);
        return null;
    }
};

// Main Dispatcher
const sendPushNotification = async (deviceToken, title, body, data = {}) => {
    try {
        const push = buildPushMessage(deviceToken, title, body, data);

        const providers = [
            () => sendViaFCM(push),
            () => sendViaOneSignal(push),
            () => sendViaSNSPush(push),
            () => sendViaExpo(push)
        ];

        for (const provider of providers) {
            const result = await provider();
            if (result) return result;
        }

        serverLogger.error("No valid push notification provider configuration found.");
    } catch (err) {
        serverLogger.error("Failed to send push notification", null, err);
    }
};

module.exports = sendPushNotification;