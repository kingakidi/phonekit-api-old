const express = require("express");
const router = express.Router();

const {
  index,
  update,
  destroy,
  store,
} = require("../controllers/domains.controller");

router.get("/", index);
router.get("/:id", index);
router.post("/", store);
router.put("/:id", update);

module.exports = router;
