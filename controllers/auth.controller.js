const db = require("../helpers/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  try {
    // check if the email exist
    const { email, password } = req.body;
    const isUser = await db.query(
      "SELECT * FROM profile WHERE email = ? LIMIT 1",
      [email]
    );

    if (isUser[0].length > 0) {
      //verify user password, and generate jwt token
      const user = isUser[0];

      const db_password = user[0].password;

      bcrypt.compare(password, db_password, function (err, result) {
        if (!result)
          return res.status(400).send({
            status: "failed",
            message: "Invalid password",
          });

        const payload = {
          fullname: user.fullname,
          permissionId: user.permissionId,
          userId: user.id,
        };

        const token = jwt.sign(payload, process.env.SECRET);
        delete user[0].password;

        return res.status(200).send({
          status: "success",
          message: "login successfully",

          data: {
            user: user[0],
            token,
          },
        });
      });
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
