const { nanoid } = require("nanoid");
const {
  ctrlWrapper,
  requestError,
  createVerifyMarkup,
  sendEmail,
} = require("../../helpers");
const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const register = async (req, res) => {
  // const { username, email, password } = req.body;

  const user = await User.findOne({ email: req.body.email });
  if (user) throw requestError(409, "Email in use");

  const avatarURL = gravatar.url(req.body.email, { s: "200", d: "mm" });
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const verificationToken = nanoid();
  const { username, email, subscription } = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const emailMarkup = await createVerifyMarkup(username, verificationToken);
  const verifyEmail = {
    to: [email],
    subject: "Verification Email",
    html: emailMarkup,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      username,
      email,
      subscription,
    },
  });
};

module.exports = { register: ctrlWrapper(register) };
