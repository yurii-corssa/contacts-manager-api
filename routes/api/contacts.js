const express = require("express");
const controllers = require("../../controllers/contacts");
const { validateId, validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact.js");

const router = express.Router();

router.get("/", authenticate, controllers.getAll);

router.get("/:contactId", authenticate, validateId, controllers.getById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addContactSchema),
  controllers.add
);

router.delete("/:contactId", authenticate, validateId, controllers.deleteById);

router.put(
  "/:contactId",
  authenticate,
  validateId,
  validateBody(schemas.addContactSchema),
  controllers.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateId,
  validateBody(schemas.updateFavoriteSchema),
  controllers.updateStatusContact
);

module.exports = router;
