const winston = require("winston");
const path = require("path");

/**
 * Extracts file path and line number from the error stack trace
 * @param {Error} error - The error object
 */
const getCallerInfoFromError = (error) => {
    if (!error || !error.stack) return {};
    const stackLines = error.stack.split("\n");
    const callerStack = stackLines[1] || ""; // Usually the first line after 'Error: ...'
    const match = callerStack.match(/\((.*):(\d+):(\d+)\)/);
    
    if (match) {
        return {
            file: path.relative(process.cwd(), match[1]),
            line: match[2]
        };
    }
    return {};
};

/**
 * Custom log format with timestamp, level, message, file path, and line number
 */
const customFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message, file, line, stack }) => {
        let logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
        if (file && line) logMessage += ` (at ${file}:${line})`;
        if (stack) logMessage += `\nStack Trace: ${stack}`;
        return logMessage;
    })
);

/**
 * Winston Logger Instances
 */
const infoLogger = winston.createLogger({
    level: "info",
    format: customFormat,
    transports: [
        new winston.transports.File({ filename: "logs/info.log" }),
        new winston.transports.Console()
    ]
});

const errorLogger = winston.createLogger({
    level: "error",
    format: customFormat,
    transports: [
        new winston.transports.File({ filename: "logs/error.log" }),
        new winston.transports.Console()
    ]
});

const debugLogger = winston.createLogger({
    level: "debug",
    format: customFormat,
    transports: [
        new winston.transports.File({ filename: "logs/debug.log" }),
        new winston.transports.Console()
    ]
});

const warnLogger = winston.createLogger({
    level: "warn",
    format: customFormat,
    transports: [
        new winston.transports.File({ filename: "logs/general.log" }),
        new winston.transports.Console()
    ]
});

/**
 * Logs messages with metadata, extracting file path and line number if an error occurs
 */
const logWithMetadata = (loggerInstance, level, message, metaData = {}, error = null) => {
    let logData = { level, message };

    if (error instanceof Error) {
        const { file, line } = getCallerInfoFromError(error);
        logData.file = file;
        logData.line = line;
        logData.stack = error.stack;
        logData.error = {
            name: error.name,
            message: error.message,
            code: error.code || null
        };
    }

    if (metaData) {
        logData.data = metaData;
    }

    loggerInstance.log(logData);
};

/**
 * Export different log functions for different severity levels
 */
module.exports = {
    info: (message, metaData) => logWithMetadata(infoLogger, "info", message, metaData),
    warn: (message, metaData) => logWithMetadata(warnLogger, "warn", message, metaData),
    error: (message, metaData, error) => logWithMetadata(errorLogger, "error", message, metaData, error),
    debug: (message, metaData) => logWithMetadata(debugLogger, "debug", message, metaData)
};
