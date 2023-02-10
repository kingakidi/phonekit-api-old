const db = require("../helpers/database");

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
    const result = await db.query("INSERT INTO profile ? ", [payload]);

    if (result) {
      console.log(result);
      return {
        status: 201,

        message: "User created successfully",
      };
    }
  }
}

module.exports = new UserServices();
