const _ = require('lodash');

let txnList = [];

let transactionList = function () {
    return {
        getTxnList: function () {
            return txnList;
        },
        addTxn: function (txnObj) {

            // check if transaction_id exists 
            const isTxnIdExist = _.findIndex(txnList, (o) => {
                return _.isMatch(o, {
                    "transaction_id": txnObj.transaction_id
                })
            }) > -1;
            if (isTxnIdExist) return {
                "msg": "transaction_id already exists",
                "status": "not ok"
            }

            // add object to transaction list
            txnList.push(txnObj);
            return {
                "status": "ok"
            }
        },
        getTxnById: (txnId) => {

            // filter transaction list by transaction_id
            let fileteredTxn = _.filter(txnList, _.matches({
                "transaction_id": txnId
            }));
            return fileteredTxn;
        },
        getTxnByType: (type) => {

            // will return all transactions groupby type
            let fileteredTxn = _.filter(txnList, _.matches({
                "type": type
            }));
            return fileteredTxn;
        },
        getSumByParentId: (txnId) => {
            
            // find parent_id from transaction_id provided in param
            let txn = _.find(txnList, (o) => {
                return _.isMatch(o, {
                    "transaction_id": txnId
                })
            });
            let parentId = txn.parent_id;

            // find and retunr all transaction with same parent_id
            let fileteredTxn = _.filter(txnList, _.matches({
                "parent_id": parentId
            }));
            return fileteredTxn;
        }
    }
}

module.exports = {
    transactionList
};