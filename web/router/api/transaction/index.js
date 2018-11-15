const updateTxn = require('./update.handler');
const getTxn = require('./get.handler');

module.exports = (router) => {
    router.put('/transactionservice/transaction/:transaction_id', updateTxn);
    router.get('/transactionservice/transaction/:transaction_id', getTxn);
    router.get('/transactionservice/types/:type', getTxn);
    router.get('/transactionservice/sum/:transaction_id', getTxn);
};