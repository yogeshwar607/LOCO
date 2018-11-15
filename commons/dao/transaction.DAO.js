// const assert = require('assert');

const MODEL = rootRequire('models').Transactions;
const DAO = require('./DAO'); // return constructor function.

function TransactionDAO() {
  this.Model = MODEL;
}

// Prototypal Inheritance
TransactionDAO.prototype = new DAO();

module.exports = function () {
  return new TransactionDAO();
};