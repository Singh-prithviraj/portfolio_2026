export default function Footer({ profile, onNavigate }) {
  return (
    <footer className="footer container">
      <div className="footer-grid">
        <div>
          <div className="footer-brand gradient-text">{profile.name}</div>
          <div className="footer-role">{profile.title}</div>
          <div className="footer-contact">
            <span>✉ {profile.email}</span>
            <span>☎ {profile.phone}</span>
            <span>📍 India (Remote OK)</span>
          </div>
        </div>

        <div>
          <div className="footer-heading">Quick Links</div>
          <div className="footer-links">
            <a onClick={() => onNavigate("home")}>Home</a>
            <a onClick={() => onNavigate("about")}>About</a>
            <a onClick={() => onNavigate("skills")}>Skills</a>
            <a onClick={() => onNavigate("projects")}>Projects</a>
            <a onClick={() => onNavigate("contact")}>Contact</a>
          </div>
        </div>

        <div>
          <div className="footer-heading">Connect</div>
          <div className="footer-social">
            {profile.links?.github && (
              <a className="icon-btn" href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                GH
              </a>
            )}
            <a className="icon-btn" href={`mailto:${profile.email}`} aria-label="Email">
              ✉
            </a>
          </div>
          <p className="footer-note">
            Building scalable backend systems with Python, Django and REST APIs.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} {profile.name}. Built with the MERN stack.
      </div>
    </footer>
  );
}
