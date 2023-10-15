const { ctrlWrapper, requestError } = require("../helpers");
const Contact = require("../models/contact");

const getAll = async (req, res, next) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");

  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId, "-createdAt -updatedAt");

  if (!result) throw requestError(404);

  res.json(result);
};

const add = async (req, res, next) => {
  const result = await Contact.create(req.body);

  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) throw requestError(404);

  res.json({ message: "Delete succes" });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

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
