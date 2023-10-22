const { register } = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { getCurrent } = require("./getCurrent");
const { handleSubscription } = require("./handleSubscription");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  handleSubscription,
};
