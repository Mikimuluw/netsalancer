"use client";

import { useState, useRef, useEffect } from "react";

export default function Badge({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function enter() {
    timer.current = setTimeout(() => setShow(true), 150);
  }
  function leave() {
    if (timer.current) clearTimeout(timer.current);
    setShow(false);
  }
  function toggle() {
    setShow((s) => !s);
  }

  useEffect(() => {
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, []);

  return (
    <div
      className="badge"
      onMouseEnter={enter}
      onMouseLeave={leave}
      onClick={toggle}
    >
      {children}
      {show && (
        <div className="badge-tip">
          <span className="badge-tip-title">DIRECTIVE FXD/04/2026</span>
          <p className="badge-tip-body">
            National Bank of Ethiopia. Issued January 2026.
            Grants exporters 100% foreign exchange retention rights.
            Effective February 12, 2026. Replaces all prior
            mandatory surrender directives.
          </p>
          <a
            href="https://nbe.gov.et/mandates/directives/"
            target="_blank"
            rel="noopener noreferrer"
            className="badge-tip-link"
            onClick={(e) => e.stopPropagation()}
          >
            Full text at nbe.gov.et ↗
          </a>
        </div>
      )}
    </div>
  );
}
