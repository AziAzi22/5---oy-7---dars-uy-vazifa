const Joi = require("joi");

// REGISTER
exports.registerValidator = (data) =>
  Joi.object({
    email: Joi.string().email().required(),

    username: Joi.string()
    .alphanum()
      .min(3)
      .max(30)
      .required(),

    password: Joi.string()
      .min(8)
      .required(),

    birth_year: Joi.number()
      .integer()
      .min(1900)
      .max(new Date().getFullYear())
      .required(),
  }).validate(data, { abortEarly: false });


// LOGIN
exports.loginValidator = (data) =>
  Joi.object({
    email: Joi.string()
      .email()
      .required(),  

    password: Joi.string()
      .required(),
  }).validate(data, { abortEarly: false });
