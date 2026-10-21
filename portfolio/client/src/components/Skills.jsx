const CATEGORY_COLORS = {
  "Programming Languages": "#eef2f8",
  "Backend Technologies": "#38bdf8",
  Frontend: "#a78bfa",
  Databases: "#34d399",
  "Development Tools": "#fb923c",
  "Core Competencies": "#ec4899",
  "CS Fundamentals": "#fbbf24",
};

export default function Skills({ profile }) {
  const entries = Object.entries(profile.skills || {});

  return (
    <section id="skills" className="section container">
      <h2 className="section-heading">Skills</h2>
      <p className="section-sub">
        The languages, frameworks and tools I use to design, build and ship backend systems.
      </p>

      <div className="skills-grid reveal-stagger">
        {entries.map(([group, items]) => (
          <div className="skill-card spot" key={group}>
            <div
              className="skill-card-title"
              style={{ color: CATEGORY_COLORS[group] || "#eef2f8" }}
            >
              {group}
            </div>
            <div className="skill-tags">
              {items.map((item) => (
                <span className="skill-tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
