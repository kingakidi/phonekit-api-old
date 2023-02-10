const db = require("../helpers/database");
exports.login = async (req, res) => {
  try {
    // check if the email exist
    const isUser = await db.query("SELECT * FROM profile WHERE email = ?", [
      req.body.email,
    ]);

    if (isUser) {
      //verify user password, and generate jwt token
    } else {
      return res.status(400).json({
        status: 400,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong",
    });
  }
};
