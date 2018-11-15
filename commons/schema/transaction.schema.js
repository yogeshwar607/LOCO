const Joi = require('joi');

const transactionSchema = Joi.object().keys({
  amount: Joi.number().required(),
  type:Joi.string().required(),
  transaction_id:Joi.any().required(),
  parent_id:Joi.any().optional(),
});

module.exports = {
  transactionSchema,
};