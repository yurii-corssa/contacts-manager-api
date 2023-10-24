const { requestError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log(error);

    if (error) next(requestError(400, error.message));

    next();
  };
  return func;
};

module.exports = validateBody;
