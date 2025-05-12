/**
 * @file Logging Middleware
 * @description Middleware for HTTP request/response logging with rotating file storage and FormData support
 */

const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');

// Configuration constants
const LOG_DIR = path.join(process.cwd(), 'request-log');
const MAX_LOG_FILES = 15;
const ROTATION_INTERVAL = '1d';
const ERROR_STATUS_CODES = [400, 401, 403, 422, 500];
const FORM_DATA_CONTENT_TYPE = 'multipart/form-data';

/**
 * Creates a rotating file stream for storing request logs
 * @returns {import('rotating-file-stream').RotatingFileStream} Configured log stream
 */
function createLogStream() {
	return rfs.createStream('request.log', {
		interval: ROTATION_INTERVAL,
		maxFiles: MAX_LOG_FILES,
		path: LOG_DIR
	});
}

/**
 * Safely processes the request body, handling FormData appropriately
 * @param {Object} req - Express request object
 * @returns {Object} Sanitized request body
 */
function processRequestBody(req) {
	// If there's no body, return null
	if (!req.body || Object.keys(req.body).length === 0) {
		return null;
	}

	// Check if request is multipart/form-data
	const contentType = req.headers['content-type'] || '';
	if (contentType.includes(FORM_DATA_CONTENT_TYPE)) {
		// Return a summary for FormData instead of the full data
		// This prevents logging potentially large binary data
		return {
			type: 'FormData',
			fields: Object.keys(req.body),
			hasFiles: req.files && Object.keys(req.files).length > 0
		};
	}

	// Return normal body for JSON/form submissions
	return req.body;
}

/**
 * Safely processes uploaded files information
 * @param {Object} req - Express request object
 * @returns {Object|null} Sanitized files information
 */
function processFiles(req) {
	if (!req.files || Object.keys(req.files).length === 0) {
		return null;
	}

	// Transform files object to include metadata without binary content
	const processedFiles = {};

	// Handle both array and object formats of files
	if (Array.isArray(req.files)) {
		return {
			count: req.files.length,
			fileNames: req.files.map(file => file.originalname || file.name || 'unknown')
		};
	} else {
		Object.keys(req.files).forEach(fieldName => {
			const files = Array.isArray(req.files[fieldName]) ? req.files[fieldName] : [req.files[fieldName]];

			processedFiles[fieldName] = files.map(file => ({
				name: file.originalname || file.name || 'unknown',
				size: file.size || 0,
				mimeType: file.mimetype || file.type || 'unknown'
			}));
		});

		return processedFiles;
	}
}

/**
 * Formats log entries as JSON with detailed request/response information
 * @param {Object} tokens - Morgan tokens object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {string} JSON formatted log entry
 */
function formatLogEntry(tokens, req, res) {
	try {
		return JSON.stringify({
			method: tokens.method(req, res),
			url: tokens.url(req, res),
			status: Number(tokens.status(req, res)),
			responseTime: `${tokens['response-time'](req, res)} ms`,
			contentLength: res.get('Content-Length') || 0,
			contentType: req.headers['content-type'] || 'not specified',
			body: processRequestBody(req),
			query: req.query || {},
			params: req.params || {},
			response: res.locals.body || null,
			files: processFiles(req),
			headers: req.headers,
			timestamp: new Date().toISOString()
		});
	} catch (error) {
		console.error('Error formatting log entry:', error);
		return JSON.stringify({
			error: 'Failed to format log entry',
			errorMessage: error.message,
			timestamp: new Date().toISOString()
		});
	}
}

// Register custom token with Morgan for selective logging
morgan.token('log-filter', (req, res) => {
	return ERROR_STATUS_CODES.includes(res.statusCode)
		? formatLogEntry(morgan, req, res)
		: null;
});

/**
 * Middleware to capture HTTP requests and log them based on status code
 * Only logs requests with error status codes defined in ERROR_STATUS_CODES
 */
const captureRequest = morgan(':log-filter', {
	stream: createLogStream(),
	skip: (req, res) => {
		// Skip logging for successful requests
		return !ERROR_STATUS_CODES.includes(res.statusCode);
	}
});

/**
 * Middleware to capture response body content for logging
 * Wraps the original res.json method to store the response body in res.locals
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const captureResponse = (req, res, next) => {
	if (!res.json) {
		next();
		return;
	}

	const originalJson = res.json.bind(res);

	res.json = (body) => {
		try {
			res.locals.body = body;
		} catch (error) {
			console.error('Error capturing response body:', error);
		}
		return originalJson(body);
	};

	next();
};

/**
 * Middleware to prepare FormData for logging
 * Should be placed before other middleware that needs to request the parsed form
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const prepareFormData = (req, res, next) => {
	const contentType = req.headers['content-type'] || '';

	if (contentType.includes(FORM_DATA_CONTENT_TYPE)) {
		// We don't modify the actual FormData parsing here
		// This middleware is just a hook point for any preprocessing needed
		console.debug('FormData request detected');
	}

	next();
};

module.exports = {
	captureRequest,
	captureResponse,
	prepareFormData
};