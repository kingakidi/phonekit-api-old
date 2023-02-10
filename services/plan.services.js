const db = require("../helpers/database");
class PlanServices {
  async getAllPlan() {
    const plans = await db.query("SELECT * FROM plans");

    if (plans[0]) {
      return plans[0];
    } else {
      return "unable to get plans";
    }
  }

  async getPlanById(id) {
    const plan = await db.query("SELECT * FROM plans WHERE id = ?", [id]);
    if (plan[0]) {
      return plan;
    } else {
      return "Something went wrong";
    }
  }

  async postPlan(payload) {
    const plan = await db.query("INSERT INTO plans SET ?", [payload]);

    if (plan[0]) {
      return "Plan created successfully";
    } else {
      return "something went wrong";
    }
  }

  async updatePlan(id, payload) {
    const result = db.query("UPDATE plans SET ? WHERE id = ?", [payload, id]);

    if (result) {
      const plan = await this.getPlanById(id);
      return plan;
    } else {
      return "Unable to update plan";
    }
  }

  async deletePlan(id) {
    const result = db.query("DELETE FROM plans WHERE id = ?", id);

    if (result) {
      return "Plans Deleted successfully";
    } else {
      return "something went wrong";
    }
  }
}
module.exports = new PlanServices();
