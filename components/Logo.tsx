import Link from "next/link";

type LogoSize = "sm" | "md" | "lg";

export default function Logo({ size = "md" }: { size?: LogoSize }) {
  const sizeClass = size === "sm" ? "logo-sm" : size === "lg" ? "logo-lg" : "";
  return (
    <Link href="/" className={`logo ${sizeClass}`}>
      <span className="l-net">NET</span>
      <span className="l-sep">፡</span>
      <span style={{position:"relative",display:"inline-block",padding:"6px 0",lineHeight:1,verticalAlign:"middle"}}>
        <span style={{position:"absolute",top:"-1px",left:"50%",transform:"translateX(-50%) rotate(90deg)",fontFamily:"'IBM Plex Mono',monospace",fontSize:"11px",color:"#C084FC",opacity:0.85,lineHeight:1}}>{"{"}</span>
        <span className="l-tsa-glyph" style={{fontFamily:"'Noto Serif Ethiopic',serif",fontSize:"18px",fontWeight:600,color:"#C084FC",textShadow:"0 0 8px rgba(192,132,252,0.9),0 0 22px rgba(192,132,252,0.5)",lineHeight:1,display:"block"}}>ፃ</span>
        <span style={{position:"absolute",bottom:"-1px",left:"50%",transform:"translateX(-50%) rotate(-90deg)",fontFamily:"'IBM Plex Mono',monospace",fontSize:"11px",color:"#C084FC",opacity:0.85,lineHeight:1}}>{"}"}</span>
      </span>
      <span className="l-sep">፡</span>
      <span className="l-end">LANCER</span>
    </Link>
  );
}
