const express = require("express");
const router = express.Router();
const {
  index,
  update,
  store,
  update_by_id,
} = require("../controllers/plan.controler");

router.get("/", index);
router.get("/:id", update_by_id);
router.post("/", store);
router.put("/:id", update);

module.exports = router;
