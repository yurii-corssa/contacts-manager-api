const { User } = require("../../models/user");
const {
  ctrlWrapper,
  requestError,
  createVerifyMarkup,
  sendEmail,
} = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw requestError(400, "Email not found");
  if (user.verify)
    throw requestError(400, "Verification has already been passed");

  const emailMarkup = await createVerifyMarkup(
    user.username,
    user.verificationToken
  );
  const verifyEmail = {
    to: [email],
    subject: "Verification Email",
    html: emailMarkup,
  };

  await sendEmail(verifyEmail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = { resendVerifyEmail: ctrlWrapper(resendVerifyEmail) };
