const jwt = require("jsonwebtoken");
const { requestError } = require("../helpers");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") return next(requestError(401));

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById({ _id: id });

    if (!user || !user.token || user.token !== token) {
      return next(requestError(401));
    }
    req.user = user;

    next();
  } catch {
    next(requestError(401));
  }
};

module.exports = authenticate;
