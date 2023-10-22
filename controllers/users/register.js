const { ctrlWrapper, requestError } = require("../../helpers");
const { User } = require("../../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) throw requestError(409, "Email in use");

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      username: newUser.username,
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = { register: ctrlWrapper(register) };
