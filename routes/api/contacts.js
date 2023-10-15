const express = require("express");
const controllers = require("../../controllers/contacts.js");
const { validateId, validateBody } = require("../../middlewares");
const { addSchema } = require("../../schemas/contacts.js");

const router = express.Router();

router.get("/", controllers.getAll);

router.get("/:contactId", validateId, controllers.getById);

router.post("/", validateBody(addSchema), controllers.add);

router.delete("/:contactId", validateId, controllers.deleteById);

router.put(
  "/:contactId",
  validateId,
  validateBody(addSchema),
  controllers.updateById
);

module.exports = router;
