const contacts = require("../models/contacts.js");
const { requestError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const result = await contacts.listContacts();

  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getById(contactId);

  if (!result) throw requestError(404);

  res.json(result);
};

const add = async (req, res, next) => {
  const result = await contacts.addContact(req.body);

  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);

  if (!result) throw requestError(404);

  res.json(result);
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);

  if (!result) throw requestError(404);

  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
