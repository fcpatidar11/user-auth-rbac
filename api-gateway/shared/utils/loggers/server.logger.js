/**
 * @fileoverview Enhanced logging utility using Winston
 * Provides structured logging with file path and line number extraction
 * @module logger
 * @author [Original Author]
 */

const winston = require('winston');
const path = require('path');

/**
 * Logger configuration options
 * @typedef {Object} LoggerConfig
 * @property {string} logDir - Directory for log files
 * @property {boolean} console - Whether to log to console
 * @property {string} level - Default log level
 */

/**
 * Default configuration for loggers
 * @type {LoggerConfig}
 */
const DEFAULT_CONFIG = {
    logDir: 'logs',
    console: true,
    level: 'info'
};

/**
 * Extracts file path and line number from an error stack trace
 * @param {Error} error - The error object containing stack trace
 * @returns {Object} Object containing file path and line number
 */
const getCallerInfoFromError = (error) => {
    if (!error || !error.stack) return {};

    const stackLines = error.stack.split('\n');
    const callerStack = stackLines[1] || ''; // Usually the first line after 'Error: ...'
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
 * Creates a Winston format configuration with timestamp and custom formatting
 * @returns {winston.Logform.Format} Configured Winston format
 */
const createLogFormat = () => {
    return winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message, file, line, stack, data }) => {
            let logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

            if (file && line) {
                logMessage += ` (at ${file}:${line})`;
            }

            if (stack) {
                logMessage += `\nStack Trace: ${stack}`;
            }

            if (data) {
                logMessage += `\nData: ${JSON.stringify(data, null, 2)}`;
            }

            return logMessage;
        })
    );
};

/**
 * Creates transports for the logger based on configuration
 * @param {string} level - Log level
 * @param {string} filename - Log file name
 * @param {LoggerConfig} config - Logger configuration
 * @returns {Array<winston.transport>} Array of Winston transports
 */
const createTransports = (level, filename, config = DEFAULT_CONFIG) => {
    const transports = [
        new winston.transports.File({
            filename: path.join(config.logDir, filename),
            level
        })
    ];

    if (config.console) {
        transports.push(new winston.transports.Console({ level }));
    }

    return transports;
};

/**
 * Creates a Winston logger instance with specified level and filename
 * @param {string} level - Log level
 * @param {string} filename - Log file name
 * @param {LoggerConfig} config - Logger configuration
 * @returns {winston.Logger} Configured Winston logger
 */
const createLogger = (level, filename, config = DEFAULT_CONFIG) => {
    return winston.createLogger({
        level,
        format: createLogFormat(),
        transports: createTransports(level, filename, config)
    });
};

/**
 * Factory function to create all logger instances
 * @param {LoggerConfig} config - Logger configuration
 * @returns {Object} Object containing all logger instances
 */
const createLoggers = (config = DEFAULT_CONFIG) => {
    return {
        infoLogger: createLogger('info', 'info.log', config),
        errorLogger: createLogger('error', 'error.log', config),
        debugLogger: createLogger('debug', 'debug.log', config),
        warnLogger: createLogger('warn', 'general.log', config)
    };
};

/**
 * Initializes all logger instances
 * @type {Object} Object containing all logger instances
 */
const loggers = createLoggers();

/**
 * Logs messages with metadata, extracting file path and line number if an error occurs
 * @param {winston.Logger} loggerInstance - Winston logger instance
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @param {Object} [metaData={}] - Additional metadata
 * @param {Error} [error=null] - Error object
 */
const logWithMetadata = (loggerInstance, level, message, metaData = {}, error = null) => {
    const logData = { level, message };

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

    if (Object.keys(metaData).length > 0) {
        logData.data = metaData;
    }

    loggerInstance.log(logData);
};

/**
 * Logger interface exposing different log levels
 * @type {Object}
 */
const logger = {
    /**
     * Logs an info message
     * @param {string} message - Message to log
     * @param {Object} [metaData={}] - Additional metadata
     */
    info: (message, metaData = {}) =>
        logWithMetadata(loggers.infoLogger, 'info', message, metaData),

    /**
     * Logs a warning message
     * @param {string} message - Message to log
     * @param {Object} [metaData={}] - Additional metadata
     */
    warn: (message, metaData = {}) =>
        logWithMetadata(loggers.warnLogger, 'warn', message, metaData),

    /**
     * Logs an error message
     * @param {string} message - Message to log
     * @param {Object} [metaData={}] - Additional metadata
     * @param {Error} [error=null] - Error object
     */
    error: (message, metaData = {}, error = null) =>
        logWithMetadata(loggers.errorLogger, 'error', message, metaData, error),

    /**
     * Logs a debug message
     * @param {string} message - Message to log
     * @param {Object} [metaData={}] - Additional metadata
     */
    debug: (message, metaData = {}) =>
        logWithMetadata(loggers.debugLogger, 'debug', message, metaData),

    /**
     * Reconfigure all loggers with new settings
     * @param {LoggerConfig} config - New logger configuration
     */
    configure: (config) => {
        Object.assign(loggers, createLoggers(config));
    }
};

module.exports = logger;