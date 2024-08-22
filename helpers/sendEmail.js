const nodemailer = require("nodemailer");

const { SENDINBLUE_SMTP_USER, SENDINBLUE_SMTP_PASS, SENDER_EMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: SENDINBLUE_SMTP_USER,
    pass: SENDINBLUE_SMTP_PASS,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: SENDER_EMAIL };
  await transporter.sendMail(email, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// sendEmail({
//   to: ["exemple@gmail.com"],
//   subject: "Test Email from Brevo",
//   html: "<h1>Hello from Brevo!</h1>",
// });

module.exports = sendEmail;
