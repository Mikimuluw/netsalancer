const ENTRIES = [
  {
    year: "2011",
    label: "NBE DIRECTIVE",
    title: "Mandatory 100% surrender",
    body: "All foreign earnings surrendered to NBE within 28 days. Retention: 0%.",
    highlight: false,
    yearClass: "tl-year-ghost",
  },
  {
    year: "2017",
    label: "NBE DIRECTIVE",
    title: "30% retention introduced",
    body: "Exporters may retain 30% in foreign currency accounts. 70% mandatory surrender remains.",
    highlight: false,
    yearClass: "tl-year-soft",
  },
  {
    year: "2023",
    label: "NBE DIRECTIVE",
    title: "50% retention",
    body: "Retention allowance increased to 50%. Informal channels still cheaper than surrendering half.",
    highlight: false,
    yearClass: "tl-year-mid",
  },
  {
    year: "2026",
    label: "FXD/04/2026 \u2014 FEBRUARY 12",
    title: "100% retention. Full stop.",
    body: "Every dollar you earn is yours. No surrender requirement. No haircut. At the official rate \u2014 which is effectively the same as the informal rate.",
    highlight: true,
    yearClass: "tl-year-now",
    sub: "The informal channel\u2019s only advantage \u2014 the rate \u2014 is now gone.",
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="tl-section">
      <div className="w">
        <span className="eyebrow">THE ROAD HERE</span>
        <h2 className="sec-h">
          15 years of tightening.<br />
          <em>One directive changed everything.</em>
        </h2>
        <span className="sec-am">15 ዓመታት ጥብቅነት — አንድ ትእዛዝ ሁሉን ቀይሮታል</span>
        <p className="tl-intro">
          Every NBE directive before FXD/04/2026 moved in one direction:
          less of your money, yours. Then February 12, 2026 happened.
        </p>
      </div>
      <div className="w">
        <div className="tl-track">
          {ENTRIES.map((e, i) => (
            <div
              key={e.year}
              className={`tl-entry ${e.highlight ? "tl-entry-now" : ""}`}
            >
              <div className="tl-left">
                <span className={`tl-year ${e.yearClass}`}>{e.year}</span>
                {i < ENTRIES.length - 1 && <div className="tl-line" style={{ opacity: 0.2 + i * 0.27 }} />}
              </div>
              <div className={`tl-card ${e.highlight ? "tl-card-now" : ""}`}>
                <span className={`tl-label ${e.highlight ? "tl-label-now" : ""}`}>
                  {e.label}
                </span>
                <h3 className={`tl-title ${e.highlight ? "tl-title-now" : ""}`}>
                  {e.title}
                </h3>
                <p className={`tl-body ${e.highlight ? "tl-body-now" : ""}`}>
                  {e.body}
                </p>
                {e.sub && <p className="tl-sub">{e.sub}</p>}
              </div>
            </div>
          ))}
        </div>
        <p className="tl-coda">
          <em>Netsalancer launched the same month. Not a coincidence.</em>
        </p>
      </div>
    </section>
  );
}
