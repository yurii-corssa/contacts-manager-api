const multer = require("multer");
const path = require("path");
const getUniqueFilename = require("../helpers/getUniqueFilename");
const { avatarFilter } = require("../helpers");
const tempDir = path.join(__dirname, "../", "temp");

const storage = multer.diskStorage({
  destination: tempDir,
  filename: getUniqueFilename,
});

const upload = multer({
  storage,
  limits: 1048576,
  fileFilter: avatarFilter,
});

module.exports = upload;
