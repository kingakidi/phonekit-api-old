const express = require("express");
const router = express.Router();

const {
  create_plan,
  update_plan,
} = require("../middlewares/validation/plan.validation");
const {
  index,
  update,
  store,
  update_by_id,
  plan_by_id,
} = require("../controllers/plan.controler");

router.get("/", index);
router.get("/:id", plan_by_id);
router.post("/", create_plan, store);
router.put("/:id", update_plan, update);

module.exports = router;
