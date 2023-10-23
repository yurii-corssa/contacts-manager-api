const { requestError } = require("../helpers");
const { Contact } = require("../models/contact");

const checkOwner = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);

  const isNotOwner = contact.owner.toString() !== owner.toString();
  if (isNotOwner) next(requestError(403));

  next();
};

module.exports = checkOwner;
