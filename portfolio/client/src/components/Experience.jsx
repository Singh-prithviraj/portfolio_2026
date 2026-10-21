export default function Experience({ profile }) {
  if (!profile.experience?.length) return null;

  return (
    <section id="experience" className="section container">
      <h2 className="section-heading">Experience</h2>
      <p className="section-sub">Where I've worked and what I've built there.</p>

      <div className="reveal-stagger">
        {profile.experience.map((job) => (
          <div className="entry" key={job.role + job.company}>
            <div className="entry-role">{job.role}</div>
            <div className="entry-meta">
              {job.company} · {job.period}
            </div>
            <ul>
              {job.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
