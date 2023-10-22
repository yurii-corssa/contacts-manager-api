const jwt = require("jsonwebtoken");
const { requestError } = require("../helpers");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") next(requestError(401));

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById({ _id: id });
    if (!user) next(requestError(401));

    next();
  } catch {
    next(requestError(401));
  }
};

module.exports = authenticate;
