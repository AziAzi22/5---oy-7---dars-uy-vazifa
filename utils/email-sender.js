const nodemailer = require("nodemailer");

const sendMessage = async (email, code) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "aziazi22t@gmail.com",
        pass: "cfybrkirkdxpckaw",
      },
    });

    return await transporter.sendMail({
      from: "aziazi22t@gmail.com",
      to: email,
      subject: "Lesson verification code",
      text: "bu kod tasdiqlash uchun",
      html: `<b>${code}</b>`,
    });
  } catch (error) {
    console.log("Email send error:", error.message);
    throw error;
  }
};

module.exports = sendMessage;