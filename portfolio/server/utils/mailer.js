import nodemailer from "nodemailer";

// Reads credentials from environment variables only — never hardcode
// an email address or password here. Set these in server/.env:
//   EMAIL_USER  = the Gmail address you send FROM (and usually receive at)
//   EMAIL_PASS  = a 16-character Gmail App Password (not your normal password)
//   CONTACT_TO  = optional — where contact-form messages get delivered
//                 (defaults to EMAIL_USER if not set)

let transporter = null;

export function getTransporter() {
  if (transporter) return transporter;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return null; // not configured yet — routes/api.js falls back to logging only
  }

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter;
}

export async function sendContactEmail({ name, email, message }) {
  const t = getTransporter();
  if (!t) {
    throw new Error(
      "Email is not configured. Set EMAIL_USER and EMAIL_PASS in server/.env."
    );
  }

  const to = process.env.CONTACT_TO || process.env.EMAIL_USER;

  await t.sendMail({
    from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
    to,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: `From: ${name} (${email})\n\n${message}`,
    html: `
      <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    `,
  });
}

// Minimal escaping so submitted text can't break the HTML email body.
function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
