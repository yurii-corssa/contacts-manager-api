const { requestError, ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models/contact");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) throw requestError(404);

  res.json(result);
};

module.exports = {
  updateById: ctrlWrapper(updateById),
};
