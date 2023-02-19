const Joi = require("joi");

exports.auth_login = async (req, res, next) => {
  console.log(req.body);
  // check if the inputs are complates,
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    console.log();
    return res.status(400).json({
      sucess: false,
      message: "validation failed",
      error: error.details,
    });
  }
  // check if the user email exist
  next();
};
