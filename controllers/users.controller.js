const userServices = require("../services/users.service");

exports.index = async (req, res) => {
  const users = await userServices.getUsers();
  return res.status(200).json(users);
};
exports.filter_user = async (req, res) => {
  const users = await userServices.getUsersFilter();
  return res.status(200).json(users);
};
exports.getById = async (req, res) => {
  let id = req.params.id;
  const user = await userServices.getById(id);

  res.status(200).json(user);
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    // if the user email is the same, proceeds,
    // if different check if it already exist
    const userDetails = await userServices.getById(id);

    if (
      userDetails[0].email.trim().toLowerCase() !==
      req.body.email.trim().toLowerCase()
    ) {
      // Check if email already exist
      const checkEmail = await userServices.getUserByEmail(req.body.email);

      if (checkEmail.length <= 0) {
        const response = await userServices.update(id, req.body);

        return res.status(200).json({
          status: 200,
          message: "user updated successfully",
          data: response,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "email already exist on another account",
        });
      }
    } else {
      const response = await userServices.update(id, req.body);

      return res.status(200).json({
        status: 200,
        message: "user updated successfully",
        data: response,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("something went wrong");
  }
};
exports.destroy = async (req, res) => {
  let id = req.params.id;
  const user = await userServices.destroy(id);

  if (user) {
    return res.status(204).json({
      status: 204,
      message: "Users deleted successfully",
    });
  } else {
    return res.status(400).json({});
  }
};

exports.store = async (req, res) => {
  try {
    // Check email existence
    const isEmail = await userServices.getUserByEmail(req.body.email);

    if (isEmail.length > 0) {
      return res.status(400).json({
        status: 400,
        message: "Email already exist",
      });
    } else {
      const response = await userServices.createUser(req.body);

      if (response) return res.status(201).json(response);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      message: "something went wrong",
    });
  }
};
