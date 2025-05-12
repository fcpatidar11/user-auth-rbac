require('../../moduleAliases');
const express = require('express');
const cors = require('cors');
const { json, urlencoded } = require('body-parser');
const appConfig = require('@configs/app.config');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('@docs/api.swagger.json');

// Initialize express app
const app = express();

// Security and performance optimizations
app.disable('x-powered-by'); // Hide Express fingerprint
app.set('trust proxy', 1); // Trust first proxy if behind one

// CORS configuration
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    maxAge: 86400 // Cache preflight requests for 24 hours
}));

// Request parsing middleware
app.use(json({
    limit: appConfig.API_GATEWAY_BODY_PARSER_LIMIT,
    strict: true // Only accept arrays and objects
}));

app.use(urlencoded({
    extended: true,
    limit: appConfig.API_GATEWAY_BODY_PARSER_LIMIT,
    parameterLimit: appConfig.API_GATEWAY_BODY_PARAMETER_LIMIT
}));

// Routes
app.use('/api', require('@routes/app.route'));

// Swagger documentation with improved options
const swaggerOptions = {
    swaggerOptions: {
        filter: true
    }
};

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// 404 handler middleware
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(`[ERROR] ${req.method} ${req.url} - ${err.message}`);

    res.status(statusCode).json({
        success: false,
        message: appConfig.NODE_ENV === 'production'
            ? 'Internal Server Error'
            : err.message
    });
});

// Start the server
const server = app.listen(appConfig.API_GATEWAY_APP_PORT, () => {
    console.log(`✅ API Server is running on port ${appConfig.API_GATEWAY_APP_PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

module.exports = server; // Export for testing