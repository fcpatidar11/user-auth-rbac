const serverLogger = require("@loggers/server.logger");
const { notificationService } = require("@src/grpc/connectors/clients/notification.client");
const { Status: grpcStatus } = require("@grpc/grpc-js/build/src/constants");
/**
 * Publishes activity logs
 *
 * @param {Object} logData - The activity log details.
 * @param {Object} requestMetadata - Metadata about the request.
 */
module.exports.sendEmailNotificationConnector = (payload = {}) => {
    return new Promise((resolve, reject) => {
        try {
            notificationService.sendEmailNotification(payload, (error, result) => {
                if (error) {
                    serverLogger.error("GRPC Email Notification Service Error", null, error);
                    return reject(error);
                } else {
                    console.log("GRPC Email Notification Response:", result);
                    return resolve(result);
                }
            });
        } catch (error) {
            serverLogger.error("GRPC Email Notification Service Exception", error);
            return reject(error);
        }
    });
};

