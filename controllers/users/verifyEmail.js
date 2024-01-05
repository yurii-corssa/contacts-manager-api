const { ctrlWrapper, requestError } = require("../../helpers");
const { User } = require("../../models/user");

const { LOCAL_FRONTEND_URL } = process.env;

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) throw requestError(400, "Invalid or expired link");

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.redirect(`${LOCAL_FRONTEND_URL}/login`);
};

module.exports = { verifyEmail: ctrlWrapper(verifyEmail) };
