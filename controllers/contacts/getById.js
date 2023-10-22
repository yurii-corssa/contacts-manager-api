const { requestError, ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models/contact");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId, "-createdAt -updatedAt");

  if (!result) throw requestError(404);

  res.json(result);
};

module.exports = {
  getById: ctrlWrapper(getById),
};
