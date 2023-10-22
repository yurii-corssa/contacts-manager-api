const express = require("express");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user.js");
const controllers = require("../../controllers/users");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controllers.register
);

router.post("/login", validateBody(schemas.loginSchema), controllers.login);

module.exports = router;
