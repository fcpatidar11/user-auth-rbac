/**
 * gRPC Client for Authentication Service
 * This module provides a client to interact with the Authentication gRPC service.
 * 
 * @module authenticationClient
 */

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const appConfig = require("@configs/app.config");

// Configuration constants
const AUTHENTICATION_SERVICE_ADDRESS = appConfig.AUTHENTICATION_SERVICE_ADDRESS;
const PROTO_PATH = appConfig.AUTHENTICATION_SERVICE_PROTO_PATH;

/**
 * Proto definition paths
 * @type {string[]}
 */
const protoDefinitions = [
    `${PROTO_PATH}/proto-definitions/permission.proto`,
    `${PROTO_PATH}/proto-definitions/role.proto`,
    `${PROTO_PATH}/proto-definitions/user.proto`,
    `${PROTO_PATH}/proto-definitions/userAuthorizationGuard.proto`,
    `${PROTO_PATH}/proto-definitions/userAddress.proto`,
    `${PROTO_PATH}/proto-definitions/userContact.proto`,
    `${PROTO_PATH}/proto-definitions/auth.proto`,
    `${PROTO_PATH}/proto-definitions/userRelationship.proto`,
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
 * User Service gRPC client
 * @type {Object}
 */
const userService = new protoBuf.authenticationPackage.userService(
    AUTHENTICATION_SERVICE_ADDRESS,
    grpc.credentials.createInsecure()
);

/**
 * Permission Service gRPC client
 * @type {Object}
 */
const permissionService = new protoBuf.authenticationPackage.permissionService(
    AUTHENTICATION_SERVICE_ADDRESS,
    grpc.credentials.createInsecure()
);

/**
 * Role Service gRPC client
 * @type {Object}
 */
const roleService = new protoBuf.authenticationPackage.roleService(
    AUTHENTICATION_SERVICE_ADDRESS,
    grpc.credentials.createInsecure()
);

/**
 * userAuthorizationGuard Service gRPC client
 * @type {Object}
 */
const userAuthorizationGuardService = new protoBuf.authenticationPackage.userAuthorizationGuardService(
    AUTHENTICATION_SERVICE_ADDRESS,
    grpc.credentials.createInsecure()
);

/**
 * Address Service gRPC client
 * @type {Object}
 */
const userAddressService = new protoBuf.authenticationPackage.userAddressService(
    AUTHENTICATION_SERVICE_ADDRESS,
    grpc.credentials.createInsecure()
);

/**
 * Contact Service gRPC client
 * @type {Object}
 */
const userContactService = new protoBuf.authenticationPackage.userContactService(
    AUTHENTICATION_SERVICE_ADDRESS,
    grpc.credentials.createInsecure()
);

/**
 * Auth Service gRPC client
 * @type {Object}
 */
const authService = new protoBuf.authenticationPackage.authService(
    AUTHENTICATION_SERVICE_ADDRESS,
    grpc.credentials.createInsecure()
);

/**
 * User Relationship Service gRPC client
 * @type {Object}
 */
const userRelationshipService = new protoBuf.authenticationPackage.userRelationshipService(
    AUTHENTICATION_SERVICE_ADDRESS,
    grpc.credentials.createInsecure()
);

// Export the client instance
module.exports = {
    authService,
    userService,
    permissionService,
    roleService,
    userAuthorizationGuardService,
    userAddressService,
    userContactService,
    userRelationshipService
};
