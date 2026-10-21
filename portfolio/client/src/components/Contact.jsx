import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/profile$/, "")
  : "http://localhost:5000/api";

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "ok" | "err"

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("ok");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("err");
    }
  };

  return (
    <section id="contact" className="section container">
      <h2 className="section-heading">Contact Me</h2>
      <p className="section-sub">Have a project in mind, or just want to say hi? Reach out below.</p>

      <div className="contact-grid reveal-stagger">
        <div className="contact-info-card spot">
          <span className="contact-icon" style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa" }}>
            ✉
          </span>
          <div>
            <div className="label">Email</div>
            <div className="value">{profile.email}</div>
          </div>
        </div>
        <div className="contact-info-card spot">
          <span className="contact-icon" style={{ background: "rgba(52,211,153,0.15)", color: "#34d399" }}>
            ☎
          </span>
          <div>
            <div className="label">Phone</div>
            <div className="value">{profile.phone}</div>
          </div>
        </div>
        <div className="contact-info-card spot">
          <span className="contact-icon" style={{ background: "rgba(236,72,153,0.15)", color: "#ec4899" }}>
            📍
          </span>
          <div>
            <div className="label">Location</div>
            <div className="value">Ujjain, Madhya Pradesh, India</div>
          </div>
        </div>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 18 }}>Have a question?</h3>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" value={form.message} onChange={handleChange} required />
        </div>
        <button className="btn btn-primary" type="submit" disabled={status === "sending"} style={{ alignSelf: "flex-start" }}>
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>
        {status === "ok" && <div className="form-status ok">Message sent — thanks for reaching out!</div>}
        {status === "err" && (
          <div className="form-status err">Couldn't reach the API. Is the server running on localhost:5000?</div>
        )}
      </form>
    </section>
  );
}
