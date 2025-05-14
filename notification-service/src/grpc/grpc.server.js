require('../../moduleAliases');
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const server = new grpc.Server();
const appConfig = require("@configs/app.config")
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

const notificationService = require("@services/notification.service");


server.addService(protoBuf.notificationPackage.notificationService.service, notificationService);

server.bindAsync(NOTIFICATION_SERVICE_ADDRESS, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err != null) {
        return console.error("❌ Error while Authentication Service listening", err);
    } else {
        console.log(`✅ Notification Service listening on ${port}`);
    }
});
