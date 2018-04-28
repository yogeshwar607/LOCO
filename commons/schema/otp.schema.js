const Joi = require('joi');

const otpSchema = Joi.object().keys({
  id: Joi.string().required(),
  otp: Joi.string().required(),
});

module.exports = {
  otpSchema,
};