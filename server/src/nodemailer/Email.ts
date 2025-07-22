const nodemailer = require("nodemailer");

type EmailOptions = { content: string };

export const sendMail = async ({
  to,
  subject,
  html,
  qrBase64,
}: {
  to: string;
  subject: string;
  html: string;
  qrBase64: string;
}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "infolavonetech@gmail.com",
        pass: "lcjo lonp opir upzp", // NOT your normal password
      },
    });

    const info = await transporter.sendMail({
      from: '"QR Code" <infolavonetech@gmail.com>',
      to,
      subject,
      html,
      attachments: [
        {
          filename: "qr-code.png",
          content: qrBase64.split("base64,")[1], // extract base64 content
          encoding: "base64",
          contentType: "image/png",
        },
      ],
    });

    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
