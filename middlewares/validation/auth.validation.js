const Joi = require("joi");

exports.auth_login = async () => {
  // check if the inputs are complates,
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      sucess: false,
      message: "validation failed",
      error: error.details,
    });
  }
  // check if the user email exist
  next();
};
