const express = require("express");
const router = express.Router();

const {
  index,
  update,
  destroy,
  store,
} = require("../controllers/domains.controller");

router.get("/", index);
router.get("/:id", update_by_id);
router.post("/", store);
router.put("/:id", update_plan, update);

module.exports = router;
