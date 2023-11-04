const { ctrlWrapper, requestError } = require("../../helpers");
const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const errorMessage = "Email or password is wrong";
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw requestError(401, errorMessage);

  if (!user.verify) throw requestError(401, "Email not verified");

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw requestError(401, errorMessage);

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      username: user.username,
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = { login: ctrlWrapper(login) };
