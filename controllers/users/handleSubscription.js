const { ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/user");

const handleSubscription = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, req.body, { new: true });

  res.json({
    user: {
      username: user.username,
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = {
  handleSubscription: ctrlWrapper(handleSubscription),
};
