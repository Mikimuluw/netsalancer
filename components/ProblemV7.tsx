const PROBLEMS = [
  {
    n: "01/",
    title: "Account Freeze Risk",
    titleAm: "የሒሳብ ማቆም አደጋ",
    desc: "One PayPal flag and you lose your entire balance — years of work, overnight. Informal channels have zero recourse, no protection, no appeals.",
    impact: "$10,000+ lost this way by Ethiopian freelancers",
  },
  {
    n: "02/",
    title: "No International Access",
    titleAm: "ዓለም አቀፍ ተደራሽነት የለም",
    desc: "Black market = birr cash only. No AWS, Adobe, Figma, GitHub Copilot. Every tool you can\u2019t access makes you less competitive than developers anywhere else.",
    impact: "Your toolset permanently limited to what local cash can buy",
  },
  {
    n: "03/",
    title: "No Path to Scale",
    titleAm: "ዕድገት የለም",
    desc: "No bank statements = no visa applications, no enterprise clients, no loans. You can\u2019t grow from freelancer to agency without formal documentation.",
    impact: "Trapped as a solo freelancer regardless of your skill level",
  },
];

export default function ProblemV7() {
  return (
    <section id="problem">
      <div className="w">
        <span className="eyebrow">Art. 01 — The Problem</span>
        <h2 className="sec-h">What informal channels<br />actually cost you</h2>
        <span className="sec-am">ኢ-መደበኛ ሰርጦች ምን ያህል ያስወጣሉ</span>
        <ul className="prob-list">
          {PROBLEMS.map((p) => (
            <li className="prob-item" key={p.n}>
              <span className="prob-n">{p.n}</span>
              <div>
                <h3 className="prob-title">{p.title}</h3>
                <span className="prob-title-am">{p.titleAm}</span>
                <p className="prob-desc">{p.desc}</p>
                <span className="prob-impact">{p.impact}</span>
              </div>
            </li>
          ))}
        </ul>
        <a href="#calc" className="micro-cta">Calculate your actual savings →</a>
      </div>
    </section>
  );
}