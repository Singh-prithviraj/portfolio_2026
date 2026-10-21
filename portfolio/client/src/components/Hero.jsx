import { useState } from "react";
import { Scramble, Typewriter, CountUp } from "./Effects.jsx";

export default function Hero({ profile, onNavigate }) {
  const initials = getInitials(profile.name);
  const projectCount = profile.projects?.length || 0;
  const certCount = profile.certifications?.length || 0;
  const cgpa = profile.education?.[0]?.detail?.match(/[\d.]+/)?.[0];
  const [imgOk, setImgOk] = useState(true);
  const roles = [profile.title, "Django & DRF Engineer", "Odoo Developer", "REST API Builder"];

  return (
    <section id="home" className="section-tight hero container">
      <div>
        <div className="hero-eyebrow hero-anim">
          <span className="eyebrow-pill">
            <span className="live-dot" /> Open to new opportunities
          </span>
        </div>

        <p className="hero-greet hero-anim">Hi, my name is</p>
        <h1 className="hero-name hero-anim">
          <span className="gradient-text"><Scramble text={profile.name} /></span>
        </h1>
        <p className="hero-role hero-anim">
          I'm a <strong><Typewriter words={roles} /></strong>
        </p>
        <p className="hero-summary hero-anim">{profile.summary}</p>

        <div className="hero-actions hero-anim">
          <button className="btn btn-primary magnetic" onClick={() => onNavigate("projects")}>
            View Projects
          </button>
          <button className="btn btn-secondary magnetic" onClick={() => onNavigate("contact")}>
            Let's Talk
          </button>
        </div>

        <div className="hero-stats hero-anim">
          <div className="stat">
            <div className="stat-num gradient-text"><CountUp to={projectCount} suffix="+" /></div>
            <div className="stat-label">Projects built</div>
          </div>
          <div className="stat">
            <div className="stat-num gradient-text"><CountUp to={certCount} /></div>
            <div className="stat-label">Certifications</div>
          </div>
          {cgpa && (
            <div className="stat">
              <div className="stat-num gradient-text"><CountUp to={cgpa} decimals={1} /></div>
              <div className="stat-label">MCA CGPA</div>
            </div>
          )}
        </div>
      </div>

      <div className="hero-avatar-wrap">
        <div className="hero-avatar">
          <span className="orbit o1"><i /></span>
          <span className="orbit o2"><i /></span>
          {imgOk ? (
            <img className="hero-photo" src="/profile.jpg" alt={profile.name} onError={() => setImgOk(false)} />
          ) : (
            <span className="hero-avatar-initials">{initials}</span>
          )}
        </div>
        <span className="hero-badge">
          <span className="live-dot" style={{ background: "#34d399", width: 6, height: 6, borderRadius: "50%" }} />
          Python / Django
        </span>
      </div>
    </section>
  );
}

function getInitials(name = "") {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
}
