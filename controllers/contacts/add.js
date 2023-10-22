const { ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models/contact");

const add = async (req, res, next) => {
  const user = req.user;
  const result = await Contact.create({ ...req.body, owner: user._id });

  const { _id, name, email, phone, favorite } = result;

  res.status(201).json({ _id, name, email, phone, favorite });
};

module.exports = {
  add: ctrlWrapper(add),
};
