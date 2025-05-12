const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDir = path.join(process.cwd(), "request-log");

const requestLogStream = rfs.createStream("request.log", {
	interval: "1d",
	maxFiles: 15,
	path: logDir,
});

const logFormat = (tokens, req, res) => JSON.stringify({
	method: tokens.method(req, res),
	url: tokens.url(req, res),
	status: tokens.status(req, res),
	responseTime: `${tokens['response-time'](req, res)} ms`,
	contentLength: res.get('Content-Length') || 0,
	body: req.body,
	query: req.query,
	params: req.params,
	response: res.locals.body || null,
	files: req.files,
	headers: req.headers,
});

morgan.token('log-filter', (req, res) => {
	return [422, 400, 401, 403, 500].includes(res.statusCode) ? logFormat(morgan, req, res) : null;
});

const captureRequest = morgan(':log-filter', { stream: requestLogStream });

const captureResponse = (req, res, next) => {
	const originalJson = res.json.bind(res);
	res.json = (body) => {
		res.locals.body = body;
		return originalJson(body);
	};
	next();
};

module.exports = { captureRequest, captureResponse };
