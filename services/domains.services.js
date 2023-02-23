const db = require("../helpers/database");

class DomainServices {
  async getAllDomain() {
    const domains = await db.query("SELECT * FROM domains");
    if (domains[0]) {
      if (domains[0]) return domains[0];
    } else {
      return "Something went wrong";
    }
  }

  async getDomainById(id) {
    const domains = await db.query("SELECT * FROM domains WHERE id = ?", [id]);
    if (domains[0]) {
      return domains[0];
    } else {
      return "Something went wrong";
    }
  }

  async getDomainByName(domain) {
    const domains = await db.query("SELECT * FROM domains WHERE domain = ?", [
      domain,
    ]);
    if (domains[0]) {
      return domains[0];
    } else {
      return "Something went wrong";
    }
  }

  async postDomain(data) {
    const result = await db.query("INSERT INTO domains SET ?", data);

    if (result) {
      return result[0];
    }
  }

  async updateDomain(id, data) {
    const result = await db.query("UPDATE domains SET ? WHERE id = ?", [
      data,
      id,
    ]);

    if (result) {
      return result[0];
    } else {
      return "Something went wrong";
    }
  }

  async deleteDomain(id) {
    const result = await db.query("DELETE FROM domains WHERE id = ?", [id]);

    if (result) {
      return result[0];
    }
  }

  generateDomainSSL() {}
}

module.exports = new DomainServices();
