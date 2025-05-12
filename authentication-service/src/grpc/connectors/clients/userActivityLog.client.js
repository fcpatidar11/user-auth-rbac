const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const appConfig = require("@configs/app.config");
const ACTIVITY_LOGS_SERVICE_ADDRESS = appConfig.ACTIVITY_LOGS_SERVICE_ADDRESS;

const protoDefinitions = [
    `${appConfig.ACTIVITY_LOGS_SERVICE_PROTO_PATH}/proto-definitions/userActivityLog.proto`
];

const protoBuf = grpc.loadPackageDefinition(
    protoLoader.loadSync(protoDefinitions, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);

module.exports.userActivityLogService = new protoBuf.activityLogPackage.userActivityLogService(
    ACTIVITY_LOGS_SERVICE_ADDRESS,
    grpc.credentials.createInsecure()
);

