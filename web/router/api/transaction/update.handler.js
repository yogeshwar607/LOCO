const Boom = require('boom');
const Joi = require('joi');
const orzo = require('orzo');

const {
    getErrorMessages,
} = rootRequire('commons').UTILS;

const {
    transactionJoiSchema
} = rootRequire('commons').SCHEMA;

const {
    transactionDAO
} = rootRequire('commons').DAO;

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

        if (error) throw Boom.badRequest(getErrorMessages(error));

        const _transactionDAO = new transactionDAO();
        const result = await _transactionDAO.save(txnObj);
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