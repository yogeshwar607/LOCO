const winston = require('winston');
const envConfig = require('nconf');


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
      ),
    colorize: true,
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
    //   new winston.transports.File({ filename: 'error.log', level: 'error' }),
    //   new winston.transports.File({ filename: 'combined.log' })
    ]
  });
   
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  // 
  if (envConfig.get('NODE_ENV') !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
  }


module.exports = logger;
