const { ctrlWrapper } = require("../../helpers");

const getCurrent = async (req, res) => {
  const { username, email, subscription } = req.user;

  res.json({
    user: {
      username,
      email,
      subscription,
    },
  });
};

module.exports = { getCurrent: ctrlWrapper(getCurrent) };
