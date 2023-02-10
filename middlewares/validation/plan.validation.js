const Joi = require("joi");

exports.create_plan = async (req, res, next) => {
  const schema = Joi.object({
    // payment_id, name, description rules, price
    payment_id: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    rules: Joi.string().required(),
    price: Joi.string().required(),
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

exports.update_plan = async (req, res, next) => {
  const schema = Joi.object({
    payment_id: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    rules: Joi.string().required(),
    price: Joi.string().required(),
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
