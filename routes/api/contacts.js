const express = require("express");
const controllers = require("../../controllers/contacts.js");
const { validateId, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/contact.js");

const router = express.Router();

router.get("/", controllers.getAll);

router.get("/:contactId", validateId, controllers.getById);

router.post("/", validateBody(schemas.addContactSchema), controllers.add);

router.delete("/:contactId", validateId, controllers.deleteById);

router.put(
  "/:contactId",
  validateId,
  validateBody(schemas.addContactSchema),
  controllers.updateById
);

router.patch(
  "/:contactId/favorite",
  validateId,
  validateBody(schemas.updateFavoriteSchema),
  controllers.updateStatusContact
);

module.exports = router;
