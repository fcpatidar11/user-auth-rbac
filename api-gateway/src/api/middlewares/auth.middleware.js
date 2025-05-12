const grpc = require("@grpc/grpc-js");

module.exports = {
    extractHeaders: (req, res, next) => {
        const metadata = new grpc.Metadata();
        const headers = req.headers || {};

        // Add common headers with fallbacks in a clean way
        metadata.add('request-device-type', headers["device-type"] || "unknown");
        metadata.add('request-ip-address', headers["x-forwarded-for"] ||
            req.connection?.remoteAddress ||
            req.socket?.remoteAddress ||
            "unknown");
        metadata.add('request-user-agent', headers["user-agent"] || "unknown");
        metadata.add('request-language', headers["accept-language"]?.toLowerCase() || "");
        metadata.add('request-authorization', headers["authorization"] || "");

        // Attach metadata to request object
        req.rpcMetaData = metadata;

        // Combine request data into a single object
        req.combineRequest = {
            ...(req.body || {}),
            reqParams: req.params || {},
            reqQueries: req.query || {}
        };

        next();
    }
};