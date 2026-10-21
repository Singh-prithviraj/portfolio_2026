import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import apiRouter from "./routes/api.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.set("mongoConnected", false);

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Portfolio API is running. Try GET /api/profile");
});

const start = async () => {
  if (process.env.MONGO_URI) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      app.set("mongoConnected", true);
      console.log("MongoDB connected.");
    } catch (err) {
      console.warn("MongoDB connection failed, falling back to profile.json:", err.message);
    }
  }
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
};

start();
