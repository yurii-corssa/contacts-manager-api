const { isValidObjectId } = require("mongoose");
const { requestError } = require("../helpers");

const validateId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId))
    next(requestError(400, `${contactId} is not valid Id`));

  next();
};

module.exports = validateId;
