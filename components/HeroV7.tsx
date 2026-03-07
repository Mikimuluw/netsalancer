import Badge from "./Badge";
import LiveRateStat from "./LiveRateStat";

const STATS = [
  { val: "100%", label: "FX Retention", am: "የውጭ ምንዛሪ ሙሉ ጥቅም" },
  { val: "Feb 12", label: "Effective Date", am: "የፀና ቀን" },
  { val: "$0", label: "Min. Deposit", am: "ዝቅተኛ ተቀማጭ" },
];

export default function HeroV7() {
  return (
    <section className="hero">
      <div className="ww">
        <div className="hero-grid">
          <div className="hero-left">
            <Badge>FXD/04/2026 — Effective February 12, 2026</Badge>

            <h1 className="hero-h1">
              The directive is real.<br />
              <em>Use it.</em>
            </h1>
            <span className="hero-am">ትእዛዙ እውነት ነው — ተጠቀምበት</span>

            <p className="hero-body">
              Ethiopia&apos;s <strong>FXD/04/2026 directive</strong> gives freelancers legal{" "}
              <strong>100% foreign exchange retention</strong> at effectively the same rate
              you&apos;re getting through informal channels right now.
              Use the <a href="#calc" className="hero-link">calculators below</a> to see exactly what that means.
            </p>
          </div>
          <div className="hero-right">
            <span className="hero-fxd-big">FXD/04/<br />2026</span>
            <span className="hero-fxd-date">Effective February 12, 2026</span>
            <span className="hero-fxd-nbe">NBE Directive FXD/04/2026</span>
          </div>
        </div>
      </div>

      <div className="ww">
        <div className="stat-row">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <span className="stat-val">{s.val}</span>
              <span className="stat-label">{s.label}</span>
              <span className="stat-am">{s.am}</span>
            </div>
          ))}
          <LiveRateStat />
        </div>
        <p className="rate-note">Rates update live · Bank &amp; black market data refreshed hourly</p>
        <div className="scroll-hint">↓ ART. 01</div>
      </div>
    </section>
  );
}
