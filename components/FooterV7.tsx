import Link from "next/link";
import Logo from "./Logo";

export default function FooterV7() {
  return (
    <footer>
      <div className="ww">
        <div className="footer-top">
          <div>
            <Logo size="lg" />
            <div className="footer-tagline">ገቢዎ። ምንዛሪዎ። ነፃነትዎ።</div>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>Site</h4>
              <Link href="#problem">The Problem</Link>
              <Link href="#calc">Calculators</Link>
              <Link href="#compare">Comparison</Link>
              <Link href="#waitlist">Documents</Link>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <a href="https://nbe.gov.et" target="_blank" rel="noopener noreferrer">NBE Official ↗</a>
              <a href="https://nbe.gov.et/mandates/directives/" target="_blank" rel="noopener noreferrer">FXD/04/2026 Text ↗</a>
              <Link href="#waitlist">Free Template</Link>
              <Link href="#waitlist">Join Waitlist</Link>
            </div>
            <div className="footer-col">
              <h4>Platform</h4>
              <Link href="#waitlist">Account Opening</Link>
              <Link href="#waitlist">International Cards</Link>
              <Link href="#waitlist">Payment Routing</Link>
              <Link href="#waitlist">NBE Compliance</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Netsalancer — Built on NBE Directive FXD/04/2026. Not affiliated with the National Bank of Ethiopia. Not a bank. Information and tools only.</p>
          <p>mikimuluw@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}