const BANNERS = [
  "linear-gradient(135deg, #8b5cf6, #ec4899)",
  "linear-gradient(135deg, #38bdf8, #8b5cf6)",
  "linear-gradient(135deg, #fb923c, #ec4899)",
];

export default function Projects({ profile }) {
  return (
    <section id="projects" className="section container">
      <h2 className="section-heading">My Projects</h2>
      <p className="section-sub">
        A few things I've built end-to-end, from data model to deployed interface.
      </p>

      <div className="projects-grid reveal-stagger">
        {profile.projects.map((proj, i) => (
          <div className="project-card spot tilt" key={proj.name}>
            <div className="project-banner" style={{ background: BANNERS[i % BANNERS.length] }}>
              {proj.name.split("—")[0].trim()}
              {/* <span className="live-tag">
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                Live
              </span> */}
            </div>
            <div className="project-body">
              <div className="project-name">{proj.name}</div>
              <div className="project-stack">{proj.stack}</div>
              <ul>
                {proj.points.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
              {proj.link && (
                <a className="project-link" href={proj.link} target="_blank" rel="noreferrer">
                  View Repository ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
