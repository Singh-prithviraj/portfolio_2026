import { useState } from "react";

export default function About({ profile }) {
  const [tab, setTab] = useState("education");
  const latestJob = profile.experience?.[0];
  const latestEdu = profile.education?.[0];

  return (
    <section id="about" className="section container">
      <h2 className="section-heading">About Me</h2>
      <p className="section-sub">A quick summary of my background and what I've been building.</p>

      <div className="about-card reveal spot">
        <div className="about-card-head">
          <span>&lt;/&gt;</span> {profile.title}
        </div>
        <ul>
          {latestJob && (
            <li>
              Currently working as a <strong>{latestJob.role}</strong> at{" "}
              <strong>{latestJob.company.split(",")[0]}</strong>, building and customizing
              business modules with Python and Odoo.
            </li>
          )}
          <li>
            Hands-on experience across <strong>Django, REST APIs, and Django ORM</strong>,
            built through {profile.projects?.length || 0} personal projects covering
            authentication, real-time features, and cloud media storage.
          </li>
          <li>
            Strong foundation in <strong>OOP, DBMS, and Operating Systems</strong>, with a
            proven ability to build scalable web and automation solutions.
          </li>
          {latestEdu && (
            <li>
              Currently pursuing <strong>{latestEdu.degree}</strong> at{" "}
              {latestEdu.school.split(",").slice(-2).join(",").trim()} ({latestEdu.period}).
            </li>
          )}
          <li>
            Adept at <strong>problem-solving and process optimization</strong>, focused on
            delivering clean, maintainable code in collaborative environments.
          </li>
        </ul>

        <div className="about-tabs">
          <button
            className={`about-tab ${tab === "education" ? "active" : ""}`}
            onClick={() => setTab("education")}
          >
            Education
          </button>
          <button
            className={`about-tab ${tab === "certifications" ? "active" : ""}`}
            onClick={() => setTab("certifications")}
          >
            Certifications
          </button>
        </div>

        {tab === "education" ? (
          <div className="edu-grid">
            {profile.education.map((edu) => (
              <div className="edu-card spot" key={edu.degree}>
                <div className="edu-card-icon">🎓 {edu.period}</div>
                <div className="edu-degree">{edu.degree}</div>
                <div className="edu-school">{edu.school}</div>
                <div className="edu-period" style={{ marginBottom: 14 }}>
                  {edu.coursework}
                </div>
                <span className="edu-badge">{edu.detail}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="about-cert-list">
            {profile.certifications.map((c) => (
              <div className="cert-row" key={c.name}>
                <span className="cert-name">{c.name}</span>
                <span className="cert-issuer">
                  {c.issuer}
                  {c.year ? ` · ${c.year}` : ""}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
