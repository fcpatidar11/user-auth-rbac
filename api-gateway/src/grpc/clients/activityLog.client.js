/**
 * gRPC Client for Activity Log Service
 * This module provides a client to interact with the Activity Log gRPC service.
 * 
 * @module activityLogClient
 */

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const appConfig = require("@configs/app.config");

// Configuration constants
const ACTIVITY_LOGS_SERVICE_ADDRESS = appConfig.ACTIVITY_LOGS_SERVICE_ADDRESS;
const PROTO_PATH = appConfig.ACTIVITY_LOGS_SERVICE_PROTO_PATH;

/**
 * Proto definition paths
 * @type {string[]}
 */
const protoDefinitions = [
    `${PROTO_PATH}/proto-definitions/userActivityLog.proto`
];

/**
 * Proto loader options
 * @type {import("@grpc/proto-loader").Options}
 */
const protoOptions = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
};

/**
 * Loads the protobuf definitions
 * @returns {Object} The loaded protobuf package
 * @throws {Error} If proto loading fails
 */
const packageDefinition = protoLoader.loadSync(protoDefinitions, protoOptions);
const protoBuf = grpc.loadPackageDefinition(packageDefinition);

/**
 * Activity Log Service gRPC client
 * @type {Object}
 */
const userActivityLogService = new protoBuf.userActivityLogPackage.userActivityLogService(
    ACTIVITY_LOGS_SERVICE_ADDRESS,
    grpc.credentials.createInsecure()
);

// Export the client instance
module.exports = {
    userActivityLogService
};