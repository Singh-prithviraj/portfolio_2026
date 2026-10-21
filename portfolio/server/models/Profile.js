import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    name: String,
    title: String,
    email: String,
    phone: String,
    links: { linkedin: String, github: String },
    summary: String,
    skills: { type: Map, of: [String] },
    experience: [
      {
        role: String,
        company: String,
        period: String,
        points: [String],
      },
    ],
    projects: [
      {
        name: String,
        stack: String,
        link: String,
        points: [String],
      },
    ],
    education: [
      {
        degree: String,
        school: String,
        period: String,
        detail: String,
        coursework: String,
      },
    ],
    certifications: [
      {
        name: String,
        issuer: String,
        year: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Profile", ProfileSchema);
