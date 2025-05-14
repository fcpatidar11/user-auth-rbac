const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const appConfig = require("@configs/app.config");
const NOTIFICATION_SERVICE_ADDRESS = appConfig.NOTIFICATION_SERVICE_ADDRESS;

const protoDefinitions = [
    `${appConfig.NOTIFICATION_SERVICE_PROTO_PATH}/proto-definitions/notification.proto`
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

module.exports.notificationService = new protoBuf.notificationPackage.notificationService(
    NOTIFICATION_SERVICE_ADDRESS,
    grpc.credentials.createInsecure()
);

