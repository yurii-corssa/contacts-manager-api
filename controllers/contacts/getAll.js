const { ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 2 } = req.query;
  const skip = (page - 1) * limit;

  // const result = await Contact.find({ owner }, "-createdAt -updatedAt").populate("owner", "username email subscription");
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  });

  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
