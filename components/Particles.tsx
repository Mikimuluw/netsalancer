"use client";

import { useEffect } from "react";

const SYMS = ["$", "@", "{}", "→", "~", "//", "≈", "↗", "fn", "git", "ETB", "USD", "async", "%", "true", "[ ]"];

export default function Particles() {
  useEffect(() => {
    if (window.matchMedia("(max-width: 680px)").matches) return;
    const c = document.getElementById("ptcl");
    if (!c || c.children.length > 0) return;
    for (let i = 0; i < 16; i++) {
      const el = document.createElement("div");
      el.className = "ps";
      const sym = SYMS[Math.floor(Math.random() * SYMS.length)];
      const sz = 9 + Math.random() * 3;
      const left = Math.random() * 100;
      const dur = 28 + Math.random() * 36;
      const del = Math.random() * 50;
      const dx = (Math.random() - 0.5) * 50;
      const hue = Math.random();
      const col =
        hue > 0.78
          ? `rgba(160,56,144,${0.08 + Math.random() * 0.12})`
          : hue > 0.55
            ? `rgba(74,158,200,${0.07 + Math.random() * 0.1})`
            : `rgba(200,134,30,${0.07 + Math.random() * 0.12})`;
      el.textContent = sym;
      el.style.cssText = `left:${left}%;font-size:${sz}px;color:${col};--dx:${dx}px;animation-duration:${dur}s;animation-delay:-${del}s;`;
      c.appendChild(el);
    }
  }, []);

  return <div id="ptcl" />;
}