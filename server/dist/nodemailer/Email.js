"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer = require("nodemailer");
const sendMail = async ({ to, subject, html, qrBase64, }) => {
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
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
};
exports.sendMail = sendMail;
//# sourceMappingURL=Email.js.map