const { requestError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const isBody = Object.keys(req.body).length;
    if (!isBody) next(requestError(400, "missing fields"));

    const { error } = schema.validate(req.body);
    if (error) next(requestError(400));

    next();
  };
  return func;
};

module.exports = validateBody;
