const Joi = require("joi");

exports.create_user = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    credit: Joi.string().required(),
    endpoint: Joi.string().uri().required(),
    auto_recharge: Joi.string().required(),
    onboarding: Joi.string().required(),
    network: Joi.string().required(),
    smtp: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      sucess: false,
      message: "validation failed",
      error: error.details,
    });
  }

  // check course title exist for the user
  next();
};
exports.update_user = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),

    credit: Joi.number().required(),
    endpoint: Joi.string().required(),
    auto_recharge: Joi.string().required(),
    onboarding: Joi.string().required(),

    network: Joi.string().required(),
    smtp: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      sucess: false,
      message: "validation failed",
      error: error.details,
    });
  }

  // check course title exist for the user
  next();
};
