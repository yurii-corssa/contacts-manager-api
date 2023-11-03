// const Mailgun = require("mailgun.js");
// const formData = require("form-data");

// const { MAILGUN_API_KEY } = process.env;
// const DOMAIN = "sandboxf6da984a1cec4bff842768456b0805d3.mailgun.org";
// const SENDER_EMAIL = "yurii.corssa@gmail.com";

// const mailgun = new Mailgun(formData);
// const mg = mailgun.client({
//   username: "api",
//   key: MAILGUN_API_KEY,
// });

// const sendEmail = async (data) => {
//   await mg.messages
//     .create(DOMAIN, {
//       ...data,
//       from: SENDER_EMAIL,
//     })
//     .then((message) => console.log(message))
//     .catch((err) => console.log(err));
// };

// sendEmail({
//   to: ["yurkaflyer@gmail.com"],
//   subject: "Hello",
//   html: "<h1>Testing some Mailgun awesomeness!</h1>",
// });

/* ---------------------------------- */

const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const { ELASTICEMAIL_SMTP_KEY } = process.env;
const EMAIL = "yurii.corssa@gmail.com";

const templatePath = path.join(
  __dirname,
  "templates",
  "emailTemplate.handlebars"
);
const source = fs.readFileSync(templatePath, "utf-8");
const template = handlebars.compile(source);
const emailHtml = template({
  name: "Recipient Name",
  senderName: "Your Company Name",
});

const nodemailerConfig = {
  host: "smtp.elasticemail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: ELASTICEMAIL_SMTP_KEY,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: EMAIL };
  await transporter.sendMail(email, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// sendEmail({
//   to: ["yurii.tsyhanok.im@gmail.com"],
//   subject: "Greetings from Our Test Email!",
//   html: emailHtml,
// });

module.exports = sendEmail;
