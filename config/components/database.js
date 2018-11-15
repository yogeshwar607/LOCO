const MONGO = require('nconf').get('MONGO');

const config = {
  db: MONGO.database,
  dbURI: MONGO.url,
  connectionString: MONGO.url
};

module.exports = config;