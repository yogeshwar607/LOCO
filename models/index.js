const mongoose = require('mongoose');

// Setting default SYSTEM PROMISE
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

// loading all the models

const Transactions = mongoose.model('transaction', require('./transaction.schema')(Schema));

// registring models
const model = {
    Transactions
};

module.exports = model;