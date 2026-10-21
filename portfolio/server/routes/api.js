import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Profile from "../models/Profile.js";
import { sendContactEmail } from "../utils/mailer.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router();

// GET /api/profile — returns Mongo data if connected, else the local JSON file.
router.get("/profile", async (req, res) => {
  try {
    if (req.app.get("mongoConnected")) {
      const profile = await Profile.findOne();
      if (profile) return res.json(profile);
    }
    const filePath = path.join(__dirname, "../data/profile.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load profile data." });
  }
});

// POST /api/contact — accepts { name, email, message } and emails it to you.
router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email and message are required." });
  }

  try {
    await sendContactEmail({ name, email, message });
    console.log(`Contact email sent for message from ${name} <${email}>`);
    res.status(201).json({ ok: true });
  } catch (err) {
    // Still log the message so nothing is lost if email isn't configured yet.
    console.warn("Could not send contact email:", err.message);
    console.log("Message received (not emailed):", { name, email, message });
    res.status(500).json({
      error: "Message received but email delivery failed. Check server logs.",
    });
  }
});

export default router;

