const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user.js");
const controllers = require("../../controllers/users");

const router = express.Router();

router.patch(
  "/",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  controllers.handleSubscription
);

module.exports = router;
