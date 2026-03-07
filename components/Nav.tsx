import Link from "next/link";
import Logo from "./Logo";

export default function Nav() {
  return (
    <nav>
      <div className="nav-in">
        <Logo size="md" />
        <ul className="nav-links nav-section-links">
          <li><Link href="#problem">PROBLEM</Link></li>
          <li><Link href="#calc">CALCULATE</Link></li>
          <li><Link href="#compare">COMPARE</Link></li>
        </ul>
        <div className="nav-right">
          <Link href="/start" className="nav-start-link">START →</Link>
          <Link href="#waitlist" className="nav-cta">FREE DOCS</Link>
        </div>
      </div>
    </nav>
  );
}