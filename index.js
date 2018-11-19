// set environment variables first
require('./envVars');

// set globals
require('./globals');

const {server} = require('./config');

// Start API Server
const app =require('./web/server').app;

// starting server and plugin gracefull shutdown module
let appServer = require('./web/server').appServer;
require('./gracefullyShutDown')(appServer);

logger.info(`Environment: ${server.env}`);

// uncaughtException Exception notification
process.on('uncaughtException', (err) => {
    logger.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    logger.error(err.stack);
    process.exit(1);
});

module.exports = {app}