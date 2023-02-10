const express = require("express");
const router = express.Router();
const {
  index,
  getById,
  destroy,
  update,
  store,
} = require("../controllers/users.controller");
const {
  create_user,
  update_user,
} = require("../middlewares/validation.middlewares");

router.get("/", index);
router.put("/:id", update_user, update);
router.delete("/:id", destroy);
router.get("/:id", getById);
router.post("/", create_user, store);

module.exports = router;
