const express = require("express");
const router = express.Router();

const {
  index,
  update,
  destroy,
  store,
  single,
  get_by_name,
} = require("../controllers/domains.controller");

const {
  create_domain,
  update_domain,
} = require("../middlewares/validation/domain.validation");
router.get("/", index);
router.get("/domain_name/:name", get_by_name);
router.get("/:id", single);

router.post("/", create_domain, store);
router.put("/:id", update_domain, update);
router.delete("/:id", destroy);

module.exports = router;
