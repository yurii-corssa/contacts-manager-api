const path = require("path");
const fs = require("fs/promises");
const { ctrlWrapper, resizeAvatar, requestError } = require("../../helpers");
const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  if (!req.file) throw requestError(400);

  const { _id: userId } = req.user;
  const { path: tempPath, filename } = req.file;
  const publicPath = path.join(avatarsDir, filename);

  await resizeAvatar(tempPath, 250);
  await fs.rename(tempPath, publicPath);

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(userId, { avatarURL });

  res.json({ avatarURL });
};

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };
