const cuid = require('cuid');
const Boom = require('boom');
const Joi = require('joi');
const _ = require('lodash');

const {
    transactionList
} = rootRequire('models');

async function logic({
    params,
    url
}) {
    try {
        const reqType = url.split('/')[2];

        if (reqType === "transaction") {
            const transactionId = params.transaction_id
            let result = transactionList().getTxnById(transactionId);

            if (result.length) {
                const {
                    amount,
                    transaction_id,
                    parent_id
                } = result[0];

                return {
                    amount,
                    transaction_id,
                    parent_id
                };
            } else {
                return Boom.badRequest({
                    "status": "not ok"
                })
            }
        }
        if (reqType === "types") {
            let result = transactionList().getTxnByType(params.type);
            const txnIdArr = result.map((ele) => {
                return ele.transaction_id
            });
            return txnIdArr;
        }
        if (reqType === "sum") {
            let transactionId = params.transaction_id;

            let result = transactionList().getSumByParentId(transactionId);

            const sum = result.reduce((sum, ele) => {
                return sum + ele.amount;
            }, 0);

            return {
                sum
            };
        }

    } catch (e) {
        logger.error(e);
        throw e;
    }
}

function handler(req, res, next) {
    logic(req)
        .then(data => {
            res.json({
                success: true,
                data,
            });
        })
        .catch(err => next(err));
}
module.exports = handler;