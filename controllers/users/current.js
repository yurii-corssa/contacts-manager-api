const { ctrlWrapper } = require("../../helpers");

const current = async (req, res) => {
  const { username, email, subscription } = req.user;

  res.json({
    user: {
      username,
      email,
      subscription,
    },
  });
};

module.exports = { current: ctrlWrapper(current) };
