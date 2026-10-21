import "dotenv/config";
import fs from "fs";
import mongoose from "mongoose";
import Profile from "./models/Profile.js";

const run = async () => {
  if (!process.env.MONGO_URI) {
    console.error("Set MONGO_URI in server/.env before seeding.");
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGO_URI);
  const data = JSON.parse(fs.readFileSync("./data/profile.json", "utf-8"));
  await Profile.deleteMany({});
  await Profile.create(data);
  console.log("Seeded profile into MongoDB.");
  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
