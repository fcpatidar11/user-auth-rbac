/**
 * Configuration module for application-wide settings
 * @module config
 */

/**
 * Supported language codes for the application
 * @type {string[]}
 */
const ACCEPT_LANGUAGES = ["en", "fr", "de", "nl", "lb"];

/**
 * File upload configuration for different contexts
 * @typedef {Object} FileUploadFormat
 * @property {string} type - The context for file upload (e.g., "profile")
 * @property {number} maxSizeInMB - Maximum allowed file size in megabytes
 * @property {number} maxFiles - Maximum number of files allowed for upload
 * @property {string[]} acceptExtensions - List of allowed file extensions
 */

/**
 * Configuration for various file upload contexts
 * @type {FileUploadFormat[]}
 */
const FILE_UPLOAD_FORMATS = [
    {
        type: "profile",
        maxSizeInMB: 5, // Added a reasonable default value
        maxFiles: 1,
        acceptExtensions: [".png", ".jpg", ".jpeg", ".webp", ".svg"]
    }
];

module.exports = {
    ACCEPT_LANGUAGES,
    FILE_UPLOAD_FORMATS
};