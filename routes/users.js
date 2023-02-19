const express = require("express");
const router = express.Router();
const {
  index,
  getById,
  destroy,
  update,
  store,
  filter_user,
} = require("../controllers/users.controller");

const {
  create_user,
  update_user,
} = require("../middlewares/validation/user.validation");

router.get("/", index);
router.get("/filter", filter_user);
router.put("/:id", update_user, update);
router.delete("/:id", destroy);
router.get("/:id", getById);
router.post("/", create_user, store);

module.exports = router;
