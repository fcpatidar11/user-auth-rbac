const notificationModel = require("@src/grpc/models/notification.model")
const notificationValidations = require("@interceptors/validations/notification.validation");

module.exports = {
    sendEmailNotification: notificationValidations.sendEmailNotification(notificationModel.sendEmailNotification)
};