const cuid = require('cuid');
const Boom = require('boom');
const Joi = require('joi');
const _ = require('lodash');

const {
    transactionDAO
} = rootRequire('commons').DAO;

async function logic({
    params,
    url
}) {
    try {
        const reqType = url.split('/')[2];
        const baseQuery = {};

        // if transactionId id is present
        if (reqType === "transaction") {
            const transactionId = params.transaction_id
            baseQuery.transaction_id = transactionId;
            const result = await new transactionDAO().find({
                baseQuery
            });

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
                return {}
            }
        }
        if (reqType === "types") {
            baseQuery.type = params.type;
            const result = await new transactionDAO().find({
                baseQuery
            });

            const txnIdArr = result.map((ele) => {
                return ele.transaction_id
            });
            return txnIdArr;

        }
        if (reqType === "sum") {
            baseQuery.transaction_id = params.transaction_id;

            // first find parent id of transaction
            const {
                parent_id
            } = await new transactionDAO().findOne({
                baseQuery
            });

            if (!parent_id) return {
                sum: 0
            }

            const result = await new transactionDAO().find({
                baseQuery: {
                    parent_id
                }
            });

            const sum = result.reduce((sum, ele) => {
                return sum + ele.amount;
            }, 0);

            return {sum};
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