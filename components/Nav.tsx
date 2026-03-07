import Link from "next/link";
import Logo from "./Logo";

export default function Nav() {
  return (
    <nav>
      <div className="nav-in">
        <Logo size="md" />
        <ul className="nav-links">
          <li><Link href="#problem">PROBLEM</Link></li>
          <li><Link href="#calc">CALCULATE</Link></li>
          <li><Link href="#compare">COMPARE</Link></li>
        </ul>
        <Link href="#waitlist" className="nav-cta">FREE DOCS</Link>
      </div>
    </nav>
  );
}