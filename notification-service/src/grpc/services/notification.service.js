const notificationModel = require("@src/grpc/models/notification.model")
const notificationValidations = require("@interceptors/validations/notification.validation");

module.exports = {
    sendEmailNotification: notificationValidations.sendEmailNotification(notificationModel.sendEmailNotification),
    sendSMSNotification: notificationValidations.sendSMSNotification(notificationModel.sendSMSNotification),
    sendPushNotification: notificationValidations.sendPushNotification(notificationModel.sendPushNotification),
    sendVerificationCode: notificationValidations.sendVerificationCode(notificationModel.sendVerificationCode),
    verifyOTPCode: notificationValidations.verifyOTPCode(notificationModel.verifyOTPCode)
};