const express = require("express");
const Joi = require("joi");
const contacts = require("../../models/contacts.js");
const requestError = require("../../helpers/requestError.js");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const putSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();

    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getById(contactId);

    if (!result) throw requestError(404);

    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) throw requestError(400, "missing required name field");

    const result = await contacts.addContact(req.body);

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

    if (!result) throw requestError(404);

    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const isBody = Object.keys(req.body).length;
    if (!isBody) throw requestError(400, "missing fields");

    const { error } = putSchema.validate(req.body);
    if (error) throw requestError(400);

    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);

    if (!result) throw requestError(404);

    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
