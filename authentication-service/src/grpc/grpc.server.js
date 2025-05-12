require('../../moduleAliases');
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const server = new grpc.Server();
const appConfig = require("@configs/app.config")
const AUTHENTICATION_SERVICE_ADDRESS = appConfig.AUTHENTICATION_SERVICE_ADDRESS;

const protoDefinitions = [
    `${appConfig.AUTHENTICATION_SERVICE_PROTO_PATH}/proto-definitions/permission.proto`,
    `${appConfig.AUTHENTICATION_SERVICE_PROTO_PATH}/proto-definitions/role.proto`,
    `${appConfig.AUTHENTICATION_SERVICE_PROTO_PATH}/proto-definitions/user.proto`,
    `${appConfig.AUTHENTICATION_SERVICE_PROTO_PATH}/proto-definitions/userAuthorizationGuard.proto`,
    `${appConfig.AUTHENTICATION_SERVICE_PROTO_PATH}/proto-definitions/userAddress.proto`,
    `${appConfig.AUTHENTICATION_SERVICE_PROTO_PATH}/proto-definitions/userContact.proto`,
    `${appConfig.AUTHENTICATION_SERVICE_PROTO_PATH}/proto-definitions/auth.proto`,
    `${appConfig.AUTHENTICATION_SERVICE_PROTO_PATH}/proto-definitions/userRelationship.proto`,
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

const permissionService = require("@services/permission.service");
const roleService = require("@services/role.service");
const userService = require("@services/user.service");
const userAddressService = require("@services/userAddress.service");
const userContactService = require("@services/userContact.service");
const authService = require("@services/auth.service");
const userRelationshipService = require("@services/userRelationship.service");
const userAuthorizationGuardService = require("@src/grpc/services/userAuthorizationGuard.service");

server.addService(protoBuf.authenticationPackage.permissionService.service, permissionService);
server.addService(protoBuf.authenticationPackage.roleService.service, roleService);
server.addService(protoBuf.authenticationPackage.userService.service, userService);
server.addService(protoBuf.authenticationPackage.userAddressService.service, userAddressService);
server.addService(protoBuf.authenticationPackage.userContactService.service, userContactService);
server.addService(protoBuf.authenticationPackage.authService.service, authService);
server.addService(protoBuf.authenticationPackage.userRelationshipService.service, userRelationshipService);
server.addService(protoBuf.authenticationPackage.userAuthorizationGuardService.service, userAuthorizationGuardService);

server.bindAsync(AUTHENTICATION_SERVICE_ADDRESS, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err != null) {
        return console.error("❌ Error while Authentication Service listening", err);
    } else {
        console.log(`✅ Authentication Service listening on ${port}`);
    }
});
