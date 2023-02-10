const userServices = require("../services/users.service");

exports.index = async (req, res) => {
  const users = await userServices.getUsers();
  res.status(200).json(users);
};

exports.getById = async (req, res) => {
  let id = req.params.id;
  const user = await userServices.getById(id);

  res.status(200).json(user);
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    const response = await userServices.update(id, req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("something went wrong");
  }
};
exports.destroy = async (req, res) => {
  let id = req.params.id;
  const user = await userServices.destroy(id);
  console.log(user);
};

exports.store = async (req, res) => {
  try {
    const response = await userServices.createUser(req.body);

    if (response) res.status(201).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      message: "something went wrong",
    });
  }
};
