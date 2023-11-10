const { requestError, ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models/contact");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) throw requestError(404);

  const { _id: id, name, email, phone, favorite, owner } = result;

  res.json({ id, name, email, phone, favorite, owner });
};

module.exports = {
  updateById: ctrlWrapper(updateById),
};
