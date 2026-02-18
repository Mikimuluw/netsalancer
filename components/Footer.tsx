import { Mail, MapPin, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-et-dark text-white">
      {/* Flag stripe */}
      <div className="flag-stripe"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                <div className="w-2 h-6 rounded-sm bg-et-green"></div>
                <div className="w-2 h-6 rounded-sm bg-et-gold"></div>
                <div className="w-2 h-6 rounded-sm bg-et-red"></div>
              </div>
              <span className="font-bold text-xl">Netsalancer</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Your earnings. Your currency. Your freedom.
            </p>
            <p className="text-white/50 text-xs">
              Built by Ethiopian developers for Ethiopian freelancers.
            </p>
            <div className="mt-4 flex items-center gap-2 text-white/60 text-sm">
              <MapPin size={14} />
              <span>Addis Ababa, Ethiopia</span>
            </div>
            <a
              href="mailto:mikimuluw@gmail.com"
              className="mt-2 flex items-center gap-2 text-white/60 text-sm hover:text-et-gold transition-colors"
            >
              <Mail size={14} />
              mikimuluw@gmail.com
            </a>
          </div>

          {/* About */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              About FXD/04/2026
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "How It Works", href: "#problem" },
                { label: "See Calculators", href: "#calculators" },
                { label: "Compare Channels", href: "#comparison" },
                { label: "FAQ", href: "#faq" },
                { label: "Get Free Documents", href: "#pdf-generator" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://www.nbe.gov.et"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 text-sm hover:text-white transition-colors flex items-center gap-1.5"
                >
                  NBE Official Website
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.nbe.gov.et"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 text-sm hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Download FXD/04/2026 Text
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="#pdf-generator"
                  className="text-white/60 text-sm hover:text-white transition-colors"
                >
                  Free Application Template
                </a>
              </li>
              <li>
                <a
                  href="#waitlist"
                  className="text-white/60 text-sm hover:text-white transition-colors"
                >
                  Join Waitlist
                </a>
              </li>
            </ul>
          </div>

          {/* Platform preview */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Coming Q2 2026
            </h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
              <div className="text-et-gold font-bold mb-1 text-sm">
                Netsalancer Platform
              </div>
              <ul className="space-y-1.5 text-white/60 text-xs">
                <li>📱 Digital FX Account Opening</li>
                <li>💳 Instant International Cards</li>
                <li>⚡ Smart Payment Routing</li>
                <li>🛡️ Full NBE Compliance</li>
              </ul>
            </div>
            <a
              href="#waitlist"
              className="block bg-et-green text-white text-center py-2.5 rounded-lg text-sm font-semibold hover:bg-et-green-dark transition-colors"
            >
              Join Waitlist →
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-white/40 text-xs text-center sm:text-left">
              © {currentYear} Netsalancer. All rights reserved.
              <br />
              Powered by FXD/04/2026 — National Bank of Ethiopia Directive
            </div>
            <div className="flex items-center gap-4 text-xs text-white/40">
              <span>
                🏛️ Netsalancer is not a bank. We provide information and tools
                to help freelancers access FXD/04/2026 benefits.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
