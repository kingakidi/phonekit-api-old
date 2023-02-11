const express = require("express");
const router = express.Router();

const { login } = require("../controllers/auth.controller");
const { auth_login } = require("../middlewares/validation/auth.validation");

router.post("/login", auth_login, login);
module.exports = router;
