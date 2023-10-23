const express = require("express");
const controllers = require("../../controllers/contacts");
const { validateId, validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact.js");
const checkOwner = require("../../middlewares/checkOwner");

const router = express.Router();

router.get("/", authenticate, controllers.getAll);

router.get(
  "/:contactId",
  authenticate,
  validateId,
  checkOwner,
  controllers.getById
);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addContactSchema),
  controllers.add
);

router.delete(
  "/:contactId",
  authenticate,
  validateId,
  checkOwner,
  controllers.deleteById
);

router.put(
  "/:contactId",
  authenticate,
  validateId,
  checkOwner,
  validateBody(schemas.addContactSchema),
  controllers.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateId,
  checkOwner,
  validateBody(schemas.updateFavoriteSchema),
  controllers.updateStatusContact
);

module.exports = router;
