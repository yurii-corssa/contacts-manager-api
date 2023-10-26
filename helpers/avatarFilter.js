const requestError = require("./requestError");

const types = ["jpeg", "jpg", "png", "gif"];

const avatarFilter = async (req, file, cb) => {
  const allowedMimeTypes = types.map((type) => `image/${type}`);
  const isNotValidMimeType = !allowedMimeTypes.includes(file.mimetype);

  if (isNotValidMimeType) {
    cb(requestError(400, "Invalid file type"));
  } else {
    cb(null, true);
  }
};

module.exports = avatarFilter;
