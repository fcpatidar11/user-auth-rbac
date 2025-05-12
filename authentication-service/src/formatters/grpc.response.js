const { sendActivityLogs } = require("@connectors/activityLogConnector");
const { Status: grpcStatus } = require("@grpc/grpc-js/build/src/constants");
const appConfig = require("@configs/app.config");
const { getMessageByCode } = require("@shared/utils/translationMessage.util");
const appConstant = require("@constants/app.constant");

const getLanguage = (call) => {
    const metadata = call.metadata?.getMap() || {};
    return appConstant.ACCEPT_LANGUAGES.includes(metadata["request-language"]) ? metadata["request-language"] : appConfig.AUTHENTICATION_SERVICE_DEFAULT_LANGUAGE;
};

module.exports.handleOk = (call, callback, messageCode, response = {}, loggedData) => {
    const language = getLanguage(call);
    if (loggedData) {
        sendActivityLogs(loggedData, call.metadata?.getMap() || {});
    }
    return callback(null, {
        code: grpcStatus.OK,
        details: getMessageByCode(messageCode, language),
        ...response
    });
};

module.exports.handleCancelled = (call, callback, messageCode) => {
    const language = getLanguage(call);
    return callback(null, {
        code: grpcStatus.CANCELLED,
        details: getMessageByCode(messageCode, language)
    });
};

module.exports.handleUnknown = (call, callback, messageCode) => {
    const language = getLanguage(call);
    return callback(null, {
        code: grpcStatus.UNKNOWN,
        details: getMessageByCode(messageCode, language)
    });
};

module.exports.handleInvalidArgument = (call, callback, messageCode) => {
    const language = getLanguage(call);
    return callback(null, {
        code: grpcStatus.INVALID_ARGUMENT,
        details: getMessageByCode(messageCode, language)
    });
};

module.exports.handleDeadlineExceeded = (call, callback, messageCode) => {
    const language = getLanguage(call);
    return callback(null, {
        code: grpcStatus.DEADLINE_EXCEEDED,
        details: getMessageByCode(messageCode, language)
    });
};

module.exports.handleNotFound = (call, callback, messageCode) => {
    const language = getLanguage(call);
    return callback(null, {
        code: grpcStatus.NOT_FOUND,
        details: getMessageByCode(messageCode, language)
    });
};

module.exports.handleAlreadyExists = (call, callback, messageCode) => {
    const language = getLanguage(call);
    return callback(null, {
        code: grpcStatus.ALREADY_EXISTS,
        details: getMessageByCode(messageCode, language)
    });
};

module.exports.handlePermissionDenied = (call, callback, messageCode) => {
    const language = getLanguage(call);
    return callback(null, {
        code: grpcStatus.PERMISSION_DENIED,
        details: getMessageByCode(messageCode, language)
    });
};

module.exports.handleResourceExhausted = (call, callback, messageCode) => {
    const language = getLanguage(call);
    return callback(null, {
        code: grpcStatus.RESOURCE_EXHAUSTED,
        details: getMessageByCode(messageCode, language)
    });
};

module.exports.handleFailedPrecondition = (call, callback, messageCode) => {
    const language = getLanguage(call);
    return callback(null, {
        code: grpcStatus.FAILED_PRECONDITION,
        details: getMessageByCode(messageCode, language)
    });
};

module.exports.handleAborted = (call, callback, messageCode) => {
    const language = getLanguage(call);
    return callback(null, {
        code: grpcStatus.ABORTED,
        details: getMessageByCode(messageCode, language)
    });
};

module.exports.handleOutOfRange = (call, callback, messageCode) => {
    const language = getLanguage(call);
    return callback(null, {
        code: grpcStatus.OUT_OF_RANGE,
        details: getMessageByCode(messageCode, language)
    });
};

module.exports.handleUnimplemented = (call, callback, messageCode) => {
    const language = getLanguage(call);
    return callback(null, {
        code: grpcStatus.UNIMPLEMENTED,
        details: getMessageByCode(messageCode, language)
    });
};

module.exports.handleInternal = (call, callback, messageCode) => {
    const language = getLanguage(call);
    return callback(null, {
        code: grpcStatus.INTERNAL,
        details: getMessageByCode(messageCode, language)
    });
};

module.exports.handleUnavailable = (call, callback, messageCode) => {
    const language = getLanguage(call);
    return callback(null, {
        code: grpcStatus.UNAVAILABLE,
        details: getMessageByCode(messageCode, language)
    });
};

module.exports.handleDataLoss = (call, callback, messageCode) => {
    const language = getLanguage(call);
    return callback(null, {
        code: grpcStatus.DATA_LOSS,
        details: getMessageByCode(messageCode, language)
    });
};

module.exports.handleUnauthenticated = (call, callback, messageCode) => {
    const language = getLanguage(call);
    return callback(null, {
        code: grpcStatus.UNAUTHENTICATED,
        details: getMessageByCode(messageCode, language)
    });
};