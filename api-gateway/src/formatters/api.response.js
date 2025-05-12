const serviceLogger = require("@loggers/server.logger");
const { Status: grpcStatus } = require("@grpc/grpc-js/build/src/constants");

/**
 * Creates a success response
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {String} message - Response message
 * @param {Object} data - Response data
 * @returns {Object} JSON response
 */
const successResponse = (res, statusCode, message, response = {}) =>
  res.status(statusCode).json({ success: true, message, response });

/**
 * Creates an error response
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {String} message - Error message
 * @returns {Object} JSON response
 */
const errorResponse = (res, statusCode, message) =>
  res.status(statusCode).json({ success: false, message });

// Map gRPC status codes to HTTP response handlers
const grpcToHttpMapping = {
  [grpcStatus.CANCELLED]: 409,
  [grpcStatus.UNKNOWN]: 405,
  [grpcStatus.INVALID_ARGUMENT]: 422,
  [grpcStatus.ALREADY_EXISTS]: 422,
  [grpcStatus.UNAVAILABLE]: 422,
  [grpcStatus.DATA_LOSS]: 422,
  [grpcStatus.DEADLINE_EXCEEDED]: 504,
  [grpcStatus.NOT_FOUND]: 404,
  [grpcStatus.PERMISSION_DENIED]: 403,
  [grpcStatus.RESOURCE_EXHAUSTED]: 400,
  [grpcStatus.FAILED_PRECONDITION]: 422,
  [grpcStatus.ABORTED]: 422,
  [grpcStatus.OUT_OF_RANGE]: 502,
  [grpcStatus.UNIMPLEMENTED]: 503,
  [grpcStatus.INTERNAL]: 500,
  [grpcStatus.UNAUTHENTICATED]: 401
};

// Response factory to avoid repetitive code
const responseFactory = (statusCode) => (res, message) => errorResponse(res, statusCode, message);

const responseHandlers = {
  // Client error responses
  badRequest: responseFactory(400),
  unauthorized: responseFactory(401),
  forbidden: responseFactory(403),
  notFound: responseFactory(404),
  methodNotAllowed: responseFactory(405),
  conflict: responseFactory(409),
  unprocessable: responseFactory(422),
  tooManyRequests: responseFactory(429),

  // Server error responses
  internalServerError: responseFactory(500),
  notImplemented: responseFactory(501),
  badGateway: responseFactory(502),
  serviceUnavailable: responseFactory(503),
  gatewayTimeout: responseFactory(504),

  /**
   * Handles service responses and maps gRPC errors to HTTP responses
   * @param {Object} res - Express response object
   * @param {Error} error - Error object
   * @param {Object} result - Result object
   * @returns {Object} HTTP response
   */
  serviceResponse: (res, error, result = {}) => {
    if (error) {
      serviceLogger.error(error?.details || error.message || 'Unknown error', null, error);
      return responseHandlers.internalServerError(res, error?.details || error.message || 'Internal server error');
    }

    const { code, details } = result || {};

    if (result && (result.code || result.details)) {
      delete result.code;
      delete result.details;
    }
    
    if (code === grpcStatus.OK) {
      return successResponse(res, 200, details || 'Success', result);
    }

    const statusCode = grpcToHttpMapping[code] || 500;
    return errorResponse(res, statusCode, details || 'An error occurred');
  }
};

module.exports = responseHandlers;