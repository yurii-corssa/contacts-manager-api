const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user.js");
const controllers = require("../../controllers/users");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controllers.register
);

router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  controllers.resendVerifyEmail
);

router.post("/login", validateBody(schemas.loginSchema), controllers.login);

router.post("/logout", authenticate, controllers.logout);

router.get("/current", authenticate, controllers.getCurrent);

router.get("/verify/:verificationToken", controllers.verifyEmail);

module.exports = router;
