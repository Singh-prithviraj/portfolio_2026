export default function CTA({ profile, onNavigate }) {
  return (
    <section className="section-tight container">
      <div className="cta-card reveal spot">
        <h2 className="cta-title">Let's Work Together</h2>
        <p className="cta-sub">
          Ready to bring your idea to life? I'd love to hear about your project and discuss
          how we can make it happen.
        </p>

        <div className="cta-checks">
          <div className="cta-check">
            <span className="check-dot">✓</span> REST API design & backend architecture
          </div>
          <div className="cta-check">
            <span className="check-dot">✓</span> Django ORM & database design
          </div>
          <div className="cta-check">
            <span className="check-dot">✓</span> Authentication & authorization
          </div>
          <div className="cta-check">
            <span className="check-dot">✓</span> Process automation & clean, testable code
          </div>
        </div>

        <button className="btn btn-primary magnetic" onClick={() => onNavigate("contact")}>
          Hire Me Now →
        </button>

        <div className="cta-note">
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", display: "inline-block" }} />
          Usually responds within a day
        </div>
      </div>
    </section>
  );
}
