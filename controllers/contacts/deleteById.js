const { requestError, ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models/contact");

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) throw requestError(404);

  res.json({ message: "Delete succes" });
};

module.exports = {
  deleteById: ctrlWrapper(deleteById),
};
