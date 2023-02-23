const Joi = require("joi");

exports.create_domain = async (req, res, next) => {
  const schema = Joi.object({
    // payment_id, name, description rules, price
    user_id: Joi.string().required(),
    domain: Joi.string().uri().required(),
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
