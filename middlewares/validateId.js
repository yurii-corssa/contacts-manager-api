const { isValidObjectId } = require("mongoose");
const { requestError } = require("../helpers");

const validateId = (req, res, next) => {
  console.log(req.params);
  const { contactId } = req.params;

  if (!isValidObjectId(contactId))
    next(requestError(400, `${contactId} is not valid Id`));

  next();
};

module.exports = validateId;
