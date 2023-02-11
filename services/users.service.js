const db = require("../helpers/database");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
class UserServices {
  async getUsers() {
    return db
      .query("SELECT * FROM profile")
      .then((data) => {
        if (data[0].length > 0) {
          return data[0];
        } else {
          return "No user found ";
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  async getById(id) {
    let users = db
      .query("SELECT * FROM profile WHERE id =?", [id])
      .then((data) => {
        if (data[0].length > 0) {
          return data[0];
        } else {
          return "No user found ";
        }
      });

    return users;
  }

  async getUserByEmail(email) {
    let user = db
      .query("SELECT * FROM profile WHERE email = ?", [email])
      .then((data) => {
        if (data[0]) {
          return data[0];
        }
      });

    return user;
  }

  async update(id, payload) {
    let result = await db.query("UPDATE profile SET ?  WHERE id = ?", [
      payload,
      id,
    ]);

    if (result) {
      let user = await this.getById(id);
      return user;
    }
  }
  async destroy(id) {
    const result = await db.query("DELETE FROM profile WHERE id = ?", [id]);
    if (result) {
      return {
        status: 200,
        message: "User deleted successfully",
      };
    } else {
      return { status: 200, message: "something went wrong" };
    }
  }

  async createUser(payload) {
    payload.token = uuidv4();
    const {
      token,
      name,
      email,
      phone,
      password,
      credit,
      auto_recharge,
      onboarding,
      network,
      smtp,
    } = payload;

    // Hash the user password
    const hash_password = await bcrypt.hash(password, 10).then((data) => {
      return data;
    });

    const result = await db.query(
      "INSERT INTO `profile`(`token`,  `name`, `email`, `phone`,  `password`,  `credit`, `auto_recharge`, `onboarding`, `network`, `smtp`)VALUES(?,?,?,?,?,?,?,?,?,?)",
      [
        token,
        name,
        email,
        phone,
        hash_password,
        credit,
        auto_recharge,
        onboarding,
        network,
        smtp,
      ]
    );

    if (result) {
      const user = await this.getById(result[0].insertId);
      delete user.password;

      return {
        status: 201,
        data: user,
        message: "User created successfully",
      };
    }
  }
}

module.exports = new UserServices();
