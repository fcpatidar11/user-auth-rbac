const serverLogger = require("@loggers/server.logger");
const { userActivityLogService } = require("@src/grpc/connectors/clients/userActivityLog.client");
const { Status: grpcStatus } = require("@grpc/grpc-js/build/src/constants");
/**
 * Publishes activity logs
 *
 * @param {Object} logData - The activity log details.
 * @param {Object} requestMetadata - Metadata about the request.
 */
module.exports.sendActivityLogs = (logData, requestMetadata) => {
  try {
    if ((logData.performedBy || requestMetadata["auth-user-id"]) && logData.actionType && logData.moduleType) {
      const payload = {
        performedBy: logData.performedBy || requestMetadata["auth-user-id"],
        performedFor: logData.performedFor || logData.performedBy || requestMetadata["auth-user-id"],
        actionType: logData.actionType,
        moduleType: logData.moduleType,
        entityId: logData.entityId || "",
        entityType: logData.entityType || "",
        metadata: logData.metadata || "",
        requestDetails: logData.requestDetails || "",
        previousData: logData.previousData || "",
        newData: logData.newData || "",
        remarks: logData.remarks || "",
        loggedAt: new Date(),
        deviceType: requestMetadata["request-device-type"] || "System",
        ipAddress: requestMetadata["request-ip-address"] || "Unknown",
        userAgent: requestMetadata["request-user-agent"] || "Unknown",
      };

      userActivityLogService.batchTrackActivityLogs({ activities: [payload] }, (error, result) => {
        if (error) {
          serverLogger.error("GRPC Activity Log Service Error", null, error);
        } else if (!result || result.code !== grpcStatus.OK) {
          serverLogger.error("GRPC Activity Log Service returned an unexpected response", result, new Error("GRPC Activity Log Service returned an unexpected response"));
        }
      });
    }
  } catch (error) {
    serverLogger.error("Publish Error of Activities Logs in Authentication Service", {
      logData: logData,
      requestMetadata: requestMetadata
    }, error);
  }
};
