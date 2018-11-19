const Boom = require('boom');
const Joi = require('joi');

const {
    transactionJoiSchema
} = rootRequire('commons').SCHEMA;

const {
    transactionList
} = rootRequire('models');

async function logic({
    body,
    params
}) {
    try {
        // assign transaction id id
        const transaction_id = params.transaction_id;
        // adding transaction id to body object
        const txnObj = Object.assign(body, {
            transaction_id,
        });

        // checking for validation
        const {
            error
        } = Joi.validate(txnObj, transactionJoiSchema.transactionSchema);

        if (error) throw Boom.badRequest("Invalid input parameters");

        const result = transactionList().addTxn(txnObj);
        if(result.status === "not ok") throw Boom.badRequest(result.msg);
        return result;

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