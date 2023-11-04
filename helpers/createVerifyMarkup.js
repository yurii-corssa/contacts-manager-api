const handlebars = require("handlebars");
const fs = require("fs/promises");
const path = require("path");

const { BASE_URL } = process.env;

const templatePath = path.join(
  __dirname,
  "templates",
  "verificationTemplate.handlebars"
);

const createVerifyMarkup = async (username, verificationToken) => {
  const source = await fs.readFile(templatePath, "utf-8");
  const template = handlebars.compile(source);

  const verificationLink = `${BASE_URL}/api/auth/verify/${verificationToken}`;

  const emailMarkup = template({
    username,
    verificationLink,
  });

  return emailMarkup;
};

module.exports = createVerifyMarkup;
