const { ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { page = 1, limit = 30, favorite } = req.query;
  const skip = (page - 1) * limit;

  const { _id: owner } = req.user;
  const filter = { owner };
  if (favorite !== undefined) filter.favorite = favorite === "true";

  // const result = await Contact.find({ owner }, "-createdAt -updatedAt").populate("owner", "username email subscription");
  const result = await Contact.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  });

  const contacts = result.map((contact) => {
    const { _id: id, name, email, phone, favorite, owner } = contact;

    return { id, name, email, phone, favorite, owner };
  });

  res.json(contacts);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
