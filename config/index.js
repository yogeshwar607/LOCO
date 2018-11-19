const express = require('./components/express');
const server = require('./components/server');
const logger = require('./components/logger');
const redisClient = require('./components/redis')();

module.exports = {
  server,
  express,
  logger,
  redisClient  
};