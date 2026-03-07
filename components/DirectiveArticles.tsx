const ARTICLES = [
  {
    label: "ART. 1",
    text: "Exporters may retain 100% of foreign exchange earnings in their accounts at authorized banks.",
    blue: false,
  },
  {
    label: "ART. 2",
    text: "Retained foreign exchange may be used for any permissible current account transaction.",
    blue: false,
  },
  {
    label: "ART. 3",
    text: "Authorized banks shall provide foreign exchange services to account holders on demand.",
    blue: false,
  },
  {
    label: "ART. 4 — EFFECT",
    text: "Previous directives requiring mandatory surrender of foreign exchange earnings are hereby repealed.",
    blue: true,
  },
];

export default function DirectiveArticles() {
  return (
    <section className="dir-section">
      <div className="ww">
        <div className="dir-grid">
          {ARTICLES.map((a) => (
            <div key={a.label} className={`dir-card ${a.blue ? "dir-card-blue" : ""}`}>
              <span className="dir-label">{a.label}</span>
              <p className="dir-text">{a.text}</p>
            </div>
          ))}
        </div>
        <p className="dir-source">
          Quoted from NBE Directive FXD/04/2026. Full text at{" "}
          <a href="https://nbe.gov.et/mandates/directives/" target="_blank" rel="noopener noreferrer">
            nbe.gov.et ↗
          </a>
        </p>
      </div>
    </section>
  );
}
