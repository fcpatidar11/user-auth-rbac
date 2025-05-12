/**
 * Configuration module for the API Gateway application.
 * 
 * This module loads environment variables from environment-specific files 
 * and provides a consolidated configuration object for the application.
 * 
 * @module config
 */

const dotenv = require('dotenv');
const path = require('path');

/**
 * Determines the current environment or defaults to 'local'
 * @type {string}
 */
const currentEnvironment = process.env.NODE_ENV || 'local';

/**
 * Load environment variables from the environment-specific .env file
 * Example: .env.development, .env.production, .env.local
 */
dotenv.config({ path: `.env.${currentEnvironment}` });

/**
 * Get an absolute path relative to the current working directory
 * 
 * @param {string} relativePath - Path relative to CWD
 * @returns {string} Absolute path
 */
function getAbsolutePath(relativePath) {
    return path.join(process.cwd(), relativePath);
}

/**
 * Application configuration object
 * Contains all configuration values required by the application
 */
module.exports = {
    // API Gateway settings
    API_GATEWAY_APP_PORT: process.env.API_GATEWAY_APP_PORT,
    API_GATEWAY_BODY_PARSER_LIMIT: process.env.API_GATEWAY_BODY_PARSER_LIMIT,
    API_GATEWAY_BODY_PARAMETER_LIMIT: process.env.API_GATEWAY_BODY_PARAMETER_LIMIT,

    // Authentication service settings
    AUTHENTICATION_SERVICE_DATABASE_URL: process.env.AUTHENTICATION_SERVICE_DATABASE_URL,
    AUTHENTICATION_SERVICE_ADDRESS: process.env.AUTHENTICATION_SERVICE_ADDRESS,

    // Activity logs service settings
    ACTIVITY_LOGS_SERVICE_ADDRESS: process.env.ACTIVITY_LOGS_SERVICE_ADDRESS,

    // Web application settings
    WEB_BASE_URL: process.env.WEB_BASE_URL,

    // File storage settings
    TEMP_FOLDER_MAX_FILE_AGE_HOURS: process.env.TEMP_FOLDER_MAX_FILE_AGE_HOURS,

    // Paths to service proto definitions
    AUTHENTICATION_SERVICE_PROTO_PATH: getAbsolutePath('../proto-schemas/authentication-service'),
    ACTIVITY_LOGS_SERVICE_PROTO_PATH: getAbsolutePath('../proto-schemas/activity-log-service'),

    // File system paths
    PUBLIC_FOLDER_PATH: getAbsolutePath('../public'),
    TEMP_FOLDER_PATH: process.env.TEMP_FOLDER_PATH,
};