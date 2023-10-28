const path = require("path");

const getUniqueFilename = (req, file, cb) => {
  const { _id: userId } = req.user;
  const date = new Date();
  const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}-${date
    .getHours()
    .toString()
    .padStart(2, "0")}${date.getMinutes().toString().padStart(2, "0")}${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
  const ext = path.extname(file.originalname);
  const newName = `${userId}_${formattedDate}${ext}`;

  cb(null, newName);
};

module.exports = getUniqueFilename;
