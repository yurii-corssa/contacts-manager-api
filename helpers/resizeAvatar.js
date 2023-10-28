const Jimp = require("jimp");
const requestError = require("./requestError");
const fs = require("fs/promises");

const resizeAvatar = async (tempPath, size) => {
  try {
    const image = await Jimp.read(tempPath);

    const width = image.bitmap.width;
    const height = image.bitmap.height;

    const minSize = Math.min(width, height);
    const offsetX = (width - minSize) / 2;
    const offsetY = (height - minSize) / 2;

    image
      .crop(offsetX, offsetY, minSize, minSize)
      .resize(size, size)
      .write(tempPath);
  } catch {
    await fs.unlink(tempPath);
    throw requestError(400, "Invalid image content");
  }
};

module.exports = resizeAvatar;
