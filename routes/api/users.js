const express = require("express");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user.js");
const controllers = require("../../controllers/users");

const router = express.Router();

router.patch(
  "/subscription",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  controllers.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllers.updateAvatar
);

module.exports = router;
