import Particles from "@/components/Particles";
import Nav from "@/components/Nav";
import FooterV7 from "@/components/FooterV7";
import Link from "next/link";

const STEPS = [
  {
    num: "01",
    title: "Choose Your Bank",
    am: "ባንክዎን ይምረጡ",
    body: "Commercial Bank of Ethiopia (CBE) and Dashen Bank both offer FX retention accounts under FXD/04/2026. CBE has the widest branch network. Dashen has faster international card issuance.",
    docs: [],
    note: "\u2192 Recommended: Dashen Bank for faster international card",
    noteColor: "var(--blue-lt)",
    blue: false,
  },
  {
    num: "02",
    title: "Gather Your Documents",
    am: "\u1230\u1290\u12F6\u1277\u1295 \u12EB\u12D8\u1309\u1301",
    body: "You need four things. All freelancers qualify \u2014 no business registration required under the new directive.",
    docs: ["Valid Ethiopian ID", "Taxpayer ID (TIN)", "Proof of foreign income (Upwork/Fiverr/Toptal statement)", "Passport photo"],
    note: "No business license required. Freelance contracts accepted.",
    noteColor: "var(--text-soft)",
    blue: true,
  },
  {
    num: "03",
    title: "Visit the Branch",
    am: "\u1245\u122D\u1295\u1327\u1349\u1295 \u12ED\u130E\u1265\u1299",
    body: "Go to any CBE or Dashen branch and ask specifically for a \u2018Foreign Currency Retention Account\u2019 \u2014 use that exact phrase. Some tellers may be unfamiliar with FXD/04/2026. Show them the directive reference if needed.",
    docs: ["All documents from Step 02"],
    note: "\u2192 Print the FXD/04/2026 summary from our free docs package",
    noteColor: "var(--amber-lt)",
    blue: false,
  },
  {
    num: "04",
    title: "Complete the Application",
    am: "\u121B\u1218\u120D\u12A8\u127B\u12CD\u1295 \u12ED\u121D\u1209",
    body: "The bank will give you their account opening form. In the account type field, write: \u2018Foreign Currency Retention Account \u2014 FXD/04/2026\u2019. Processing time: 1\u20133 business days.",
    docs: ["Bank\u2019s account opening form", "FXD/04/2026 reference"],
    note: null,
    noteColor: null,
    blue: true,
  },
  {
    num: "05",
    title: "Receive Your Account & Card",
    am: "\u1218\u1208\u12EB\u12CE\u1295 \u12ED\u1240\u1260\u1209",
    body: "You will receive an ETB account, a USD retention account, and an international Visa or Mastercard. The card works for online subscriptions, international purchases, and ATMs abroad.",
    docs: [],
    note: "\u2192 This card is in your name. For the first time.",
    noteColor: "var(--blue-lt)",
    blue: false,
  },
  {
    num: "06",
    title: "Start Getting Paid",
    am: "ክፍያ መቀበል ይጀምሩ",
    body: "Direct clients can wire payments straight into your new FX account today. For platform earnings (Upwork, Fiverr, Toptal) — most platforms can\u2019t pay Ethiopian banks directly yet. That\u2019s exactly what we\u2019re building. Join the Netsalancer waitlist: think PayPal, built for Ethiopian freelancers. Clients pay you through us, and your earnings land in your FX retention account in Addis — legal, in your name, from day one.",
    docs: [],
    note: "\u2192 Every payment builds your bank statement history and your visa application.",
    noteColor: "var(--amber-lt)",
    noteWeight: true,
    blue: true,
  },
];

export default function StartPage() {
  return (
    <>
      <Particles />
      <Nav />
      <main>
        {/* Hero */}
        <section className="start-hero">
          <div className="w">
            <span className="eyebrow">ART. 01 — GET STARTED</span>
            <h1 className="start-h1">Open your account.</h1>
            <span className="start-am">መለያዎን ይክፈቱ</span>
            <p className="start-body">
              Six steps. One afternoon. Your earnings in your name.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="start-steps">
          <div className="w">
            {STEPS.map((s) => (
              <div
                key={s.num}
                className={`step-card ${s.blue ? "step-card-blue" : ""}`}
              >
                <span className="step-ghost">{s.num}</span>
                <div className="step-content">
                  <span className="step-label">
                    STEP {s.num} / 06
                  </span>
                  <h3 className="step-title">{s.title}</h3>
                  <span className="step-am">{s.am}</span>
                  <p className="step-body">{s.body}</p>
                  {s.docs.length > 0 && (
                    <div className="step-docs">
                      {s.docs.map((d) => (
                        <span key={d} className="doc-pill">{d}</span>
                      ))}
                    </div>
                  )}
                  {s.note && (
                    <p
                      className={`step-note ${(s as Record<string, unknown>).noteWeight ? "step-note-bold" : ""}`}
                      style={{ color: s.noteColor ?? undefined }}
                    >
                      {s.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="start-cta">
          <div className="w start-cta-grid">
            <div>
              <h2 className="start-cta-h">Download the complete package.</h2>
              <span className="start-cta-am">ሙሉ ጥቅሉን ያውርዱ</span>
              <p className="start-cta-body">
                Cover letter, document checklist, FXD/04/2026 summary,
                and a pre-filled application timeline. Free. No account needed.
              </p>
              <Link href="/#waitlist" className="btn btn-amb">
                ↓ Download Free Package
              </Link>
            </div>
            <div className="start-cta-facts">
              <p>Processing time — 1–3 business days</p>
              <p>Card issuance — 5–10 business days</p>
              <p>First withdrawal — available immediately</p>
              <p>Bank statement history — starts day one</p>
            </div>
          </div>
        </section>
      </main>
      <FooterV7 />
    </>
  );
}
