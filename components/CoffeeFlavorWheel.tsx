"use client";

import { useState } from "react";

const FLAVOR_DATA = [
  {id:"floral",name:"Floral",amharic:"አበባ",emoji:"🌸",desc:"Delicate and aromatic — like the highlands of Kaffa in spring bloom. If you taste this, you've been blessed.",children:[{name:"Black Tea",children:[{name:"Black Tea",amharic:"ሻይ"}]},{name:"Floral",children:[{name:"Chamomile",amharic:"ካሞሜል"},{name:"Rose",amharic:"ጽጌረዳ"},{name:"Jasmine",amharic:"ጃስሚን"}]}]},
  {id:"fruity",name:"Fruity",amharic:"ፍሬ",emoji:"🍓",desc:"Bright and juicy. Ethiopian coffee literally invented fruit flavor. Don't let anyone tell you otherwise.",children:[{name:"Berry",children:[{name:"Blackberry",amharic:"ጥቁር ቤሪ"},{name:"Raspberry",amharic:"ራዝቤሪ"},{name:"Blueberry",amharic:"ብሉቤሪ"},{name:"Strawberry",amharic:"ስትሮቤሪ"}]},{name:"Dried Fruit",children:[{name:"Raisin",amharic:"ዘቢብ"},{name:"Prune",amharic:"ፕሩን"}]},{name:"Other Fruit",children:[{name:"Coconut",amharic:"ኮኮናት"},{name:"Cherry",amharic:"ቼሪ"},{name:"Pomegranate",amharic:"ሮማን"},{name:"Peach",amharic:"ፒች"}]},{name:"Citrus",children:[{name:"Grapefruit",amharic:"ግሬፕፍሩት"},{name:"Orange",amharic:"ብርቱካን"},{name:"Lemon",amharic:"ሎሚ"},{name:"Lime",amharic:"ላይም"}]}]},
  {id:"sour",name:"Sour/Fermented",amharic:"ሆምጣጤ",emoji:"🍋",desc:"Complex acids that separate true ቡጠማ members from those who just say 'mmm, good coffee.'",children:[{name:"Sour",children:[{name:"Sour Aromatics",amharic:"ሆምጣጤ ሽታ"},{name:"Acetic Acid",amharic:"አሲቲክ"},{name:"Citric Acid",amharic:"ሲትሪክ"},{name:"Malic Acid",amharic:"ማሊክ"}]},{name:"Fermented",children:[{name:"Winey",amharic:"ወይን"},{name:"Whiskey",amharic:"ዊስኪ"},{name:"Fermented",amharic:"ፈርሜንቴድ"},{name:"Overripe",amharic:"ካለፈ ብስለት"}]}]},
  {id:"green",name:"Green/Vegetative",amharic:"ዕፅዋት",emoji:"🌿",desc:"Earthy and raw — like standing barefoot in a Jimma coffee forest at dawn.",children:[{name:"Olive Oil",children:[{name:"Olive Oil",amharic:"ወይራ ዘይት"}]},{name:"Raw",children:[{name:"Raw",amharic:"ጥሬ"}]},{name:"Green",children:[{name:"Under-ripe",amharic:"ያልበሰለ"},{name:"Peapod",amharic:"አተር"},{name:"Fresh",amharic:"ትኩስ"},{name:"Herb-like",amharic:"ዕፅ"}]},{name:"Beany",children:[{name:"Beany",amharic:"ባቄላ"}]}]},
  {id:"other",name:"Other",amharic:"ሌላ",emoji:"🌫️",desc:"The mysterious notes that make you sound impossibly knowledgeable at any coffee ceremony.",children:[{name:"Papery/Musty",children:[{name:"Cardboard",amharic:"ካርቶን"},{name:"Woody",amharic:"እንጨት"},{name:"Musty/Earthy",amharic:"ምድራዊ"},{name:"Animalic",amharic:"እንስሳዊ"}]},{name:"Chemical",children:[{name:"Medicinal",amharic:"መድሃኒት"},{name:"Rubber",amharic:"ረቦር"},{name:"Skunky",amharic:"ስካንክ"},{name:"Petroleum",amharic:"ዘይት"}]}]},
  {id:"roasted",name:"Roasted",amharic:"ቡዳ ቡና",emoji:"🔥",desc:"Dark, smoky, unapologetic. The sound of a bunna bet at 6am. The smell of your grandmother's kitchen.",children:[{name:"Tobacco",children:[{name:"Pipe Tobacco",amharic:"ቱምቡ"},{name:"Tobacco",amharic:"ትምባሆ"}]},{name:"Burnt",children:[{name:"Acrid",amharic:"ወጋጋኝ"},{name:"Ashy",amharic:"አመድ"},{name:"Smoky",amharic:"ጢስ"},{name:"Brown Roast",amharic:"ቡናቡ"}]},{name:"Cereal",children:[{name:"Grain",amharic:"ጥራጥሬ"},{name:"Malt",amharic:"ማልት"}]}]},
  {id:"spices",name:"Spices",amharic:"ቅመም",emoji:"🌶️",desc:"Spice aromatics that remind you berbere has a long-lost coffee cousin. They were separated at birth.",children:[{name:"Pungent",children:[{name:"Pungent",amharic:"ጠንካራ"}]},{name:"Pepper",children:[{name:"Pepper",amharic:"በርበሬ"}]},{name:"Brown Spice",children:[{name:"Anise",amharic:"ጃኔ"},{name:"Nutmeg",amharic:"ናትሜግ"},{name:"Cinnamon",amharic:"ቀረፋ"},{name:"Clove",amharic:"ቅርናፍል"}]}]},
  {id:"nutty",name:"Nutty/Cocoa",amharic:"ለውዝ",emoji:"🍫",desc:"Rich and warming — like your aunty's coffee ceremony on a cold Addis Ababa morning. Non-negotiable.",children:[{name:"Nutty",children:[{name:"Peanuts",amharic:"ለውዝ"},{name:"Hazelnut",amharic:"ሄዘልናት"},{name:"Almond",amharic:"ባዲም"}]},{name:"Cocoa",children:[{name:"Chocolate",amharic:"ቸኮሌት"},{name:"Dark Chocolate",amharic:"ጥቁር ቸኮሌት"}]}]},
  {id:"sweet",name:"Sweet",amharic:"ጣፋጭ",emoji:"🍯",desc:"Natural sweetness — no sugar needed, ever. Ethiopian coffee performs alchemy on a daily basis.",children:[{name:"Brown Sugar",children:[{name:"Molasses",amharic:"ሞላሰስ"},{name:"Maple Syrup",amharic:"ሜፕል ሽሮፕ"},{name:"Caramelized",amharic:"ካራሜል"},{name:"Honey",amharic:"ማር"}]},{name:"Vanilla",children:[{name:"Vanilla",amharic:"ቫኒላ"}]},{name:"Overall Sweet",children:[{name:"Sweet Aromatics",amharic:"ጣፋጭ ሽታ"},{name:"Overall Sweet",amharic:"ጣፋጭ"}]}]}
];

const LORE: Record<string, string> = {
  "Jasmine":"The scent that makes guests ask 'what IS this?' You say: 'Just a small Yirgacheffe I had imported.' Casually.",
  "Rose":"As romantic as a traditional coffee ceremony. Your jebena will feel the love.",
  "Blueberry":"Sidama in a cup. If you don't taste this in your Ethiopian natural process, demand a refund.",
  "Cherry":"The ghost of the coffee cherry, still present in every sip. Show respect.",
  "Blackberry":"Bold, deep, unapologetic. Like your mother's opinion at family dinner.",
  "Lemon":"Bright acidity that made Addis Ababa café culture famous worldwide. Wear it with pride.",
  "Honey":"Natural sweetness from beans picked at peak ripeness. Sugar is not invited to this ceremony.",
  "Chocolate":"Keffa forest energy. Rich, ancient, deeply ancestral. The Keffa region has been doing this since before chocolate was cool.",
  "Cinnamon":"ቀረፋ in every sip. A spice road from Axum to your cup.",
  "Caramelized":"What happens when a roaster truly loves their craft. This is love made into flavor.",
  "Raspberry":"Electric fruit note from natural processing. Science? Or magic? The answer is yes.",
  "Molasses":"The depth of dark roast wisdom. Your grandmother approves from the beyond.",
  "Winey":"Natural fermentation creating something extraordinary. Ethiopia invented wine too (citation: vibes).",
  "Smoky":"Traditional roasting over open flame. Authenticity cannot be manufactured in a factory.",
  "Cardboard":"A noble defect note included in the wheel for completeness. ቡጠማ does not judge. We document.",
  "Peanuts":"The humble groundnut appearing in your cup. Unexpected. Respected.",
  "Strawberry":"A fruit note so present you'll check your cup for actual strawberries. Don't. Just trust.",
  "Orange":"Bright citrus pop from high altitude. The mountain air is speaking to you.",
  "Vanilla":"A soft sweetness that arrives like an unexpected blessing. Accept it.",
  "Clove":"Ancient spice note. Your cup is a time machine to the old spice routes.",
  "Raisin":"Concentrated dried fruit sweetness. The sun did this. Thank the sun.",
  "Grain":"Cereal notes from the roast itself. Honest. Simple. Ethiopian.",
  "Peach":"Soft stone fruit that makes everyone in the room stop talking and just sip.",
  "Black Tea":"The bridge between coffee and tea — Ethiopia has both, and both are sacred.",
  "Chamomile":"Floral and gentle. A note so delicate it demands you slow down.",
  "Pepper":"A quiet heat that lingers. Berbere's quiet cousin found its way in.",
  "Anise":"Licorice-adjacent aromatics from the soil itself. The terroir is speaking.",
  "Nutmeg":"Warm spice depth. Habesha kitchen energy in your morning cup.",
  "Hazelnut":"Subtle nuttiness from a well-developed roast. The roaster knew what they were doing.",
  "Almond":"Clean, gentle nut note. A roaster's quiet signature.",
  "Dark Chocolate":"Bittersweet depth. The kind of note you only get with good beans and patience.",
  "Tobacco":"A roasted complexity note. Not everyone can detect it. You can.",
  "Acrid":"The dark edge of an aggressive roast. Bold. Not for everyone. Possibly you.",
  "Ashy":"Roast character from the edge of the drum. Heritage note.",
  "Malt":"Sweet cereal warmth from the roast. Like the coffee is giving you a hug.",
  "Grape":"Stone fruit sweetness in natural-process beans. The vineyard visited the coffee farm.",
  "Coconut":"Tropical note found in some naturals. Unexpected. Delightful. Very ቡጠማ.",
  "Pomegranate":"Complex sweet-tart note. A Yirgacheffe specialty. Royalty.",
  "Grapefruit":"High citrus note from washed coffees. Sharp, clean, morning energy.",
  "Lime":"The brightest citrus note. Found in well-grown highland beans.",
  "Prune":"Dried fruit depth from natural processing. Concentrated sweetness.",
  "Sour Aromatics":"The volatile acids that give Ethiopian coffee its brightness. Handle with reverence.",
  "Acetic Acid":"Vinegar-adjacent brightness — at low levels it's complexity, not a flaw.",
  "Citric Acid":"The acid that makes your mouth water before the cup even reaches your lips.",
  "Malic Acid":"Apple-like acidity found in high-altitude coffees. The mountain is in the cup.",
  "Fermented":"Natural fermentation notes that tell the story of sun-drying on raised beds.",
  "Overripe":"When fermentation went just a little further. Complex. Debated. Delicious (to some).",
  "Whiskey":"A bold fermented note that makes coffee ceremony feel like a special occasion.",
  "Olive Oil":"Silky, smooth mouthfeel note. You didn't expect this. Neither did we.",
  "Raw":"The fresh, vegetal brightness of lightly roasted beans. Not for everyone's grandmother.",
  "Under-ripe":"Green, grassy note that tells you the beans were picked a touch early.",
  "Peapod":"Fresh legume note. The coffee farm is present in your cup.",
  "Fresh":"Clean, bright, alive. Every sip tastes like morning.",
  "Herb-like":"Dried herb aromatics from the terroir. The land itself is speaking.",
  "Beany":"The raw legume character. Present in lighter roasts. Debated by the committee.",
  "Woody":"Dry, warm wood note from the roast or aging. Your cup has character.",
  "Musty/Earthy":"Deep earth note from the soil of the coffee farms. It's literally the origin.",
  "Animalic":"Complex, wild fermentation note. Polarizing. The committee respects it.",
  "Medicinal":"A phenolic note. Clean in small doses. A note worth documenting.",
  "Rubber":"A processing note. Included because ቡጠማ documents everything, even the humbling ones.",
  "Skunky":"A rare and unfortunate defect note. We include it. We don't celebrate it.",
  "Petroleum":"A processing contamination note. ቡጠማ disapproves. We document it anyway.",
  "Pipe Tobacco":"Roasted complexity with warmth and depth. The elders nod at this note.",
  "Brown Roast":"The toasted, caramelized character of a perfectly pulled medium-dark roast.",
  "Maple Syrup":"Warm, sweet depth from caramelization. Unexpected in coffee. Unforgettable.",
  "Sweet Aromatics":"The overall sweet fragrance before you even sip. The preview of the main event.",
  "Overall Sweet":"Natural balance without sugar. This is what Ethiopian altitude and terroir does.",
  "Vanillin":"The pure aromatic compound of vanilla. Found in aged or barrel-processed beans.",
  "Pungent":"An intense aromatic hit. Not subtle. ቡጠማ respects intensity.",
};

const CAT_COLORS: Record<string, string[]> = {
  floral: ["#8B3D5C","#B86080","#D898B0"],
  fruity: ["#A83020","#CC4830","#E87058"],
  sour:   ["#907010","#B09020","#D0B848"],
  green:  ["#266035","#408050","#65A870"],
  other:  ["#483568","#686088","#9080A8"],
  roasted:["#381508","#582515","#8C4528"],
  spices: ["#8C5008","#B07018","#CC9030"],
  nutty:  ["#622808","#8C4020","#B06838"],
  sweet:  ["#AA4828","#C86840","#E89060"],
};

const CX=300,CY=300;
const RINGS: Record<string, [number, number]> = {cat:[68,150],sub:[155,220],flv:[225,285]};

interface FlavorChild {
  name: string;
  amharic?: string;
}

interface FlavorSubcat {
  name: string;
  children: FlavorChild[];
}

interface FlavorCategory {
  id: string;
  name: string;
  amharic: string;
  emoji: string;
  desc: string;
  children: FlavorSubcat[];
}

interface Segment {
  id: string;
  type: "cat" | "sub" | "flv";
  name: string;
  amharic?: string;
  emoji?: string;
  desc?: string;
  catId: string;
  catName?: string;
  catAmharic?: string;
  catEmoji?: string;
  subcatName?: string;
  catDesc?: string;
  a1: number;
  a2: number;
  children?: FlavorSubcat[];
}

function polar(r: number, deg: number): [number, number] {
  const rad = (deg - 90) * Math.PI / 180;
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
}

function arcPath(r1: number, r2: number, a1: number, a2: number, gap = 0.55): string {
  const [s, e] = [a1 + gap, a2 - gap];
  const lg = e - s > 180 ? 1 : 0;
  const [x1, y1] = polar(r2, s);
  const [x2, y2] = polar(r2, e);
  const [x3, y3] = polar(r1, e);
  const [x4, y4] = polar(r1, s);
  return `M${x1},${y1}A${r2},${r2},0,${lg},1,${x2},${y2}L${x3},${y3}A${r1},${r1},0,${lg},0,${x4},${y4}Z`;
}

function buildSegs(): Segment[] {
  const segs: Segment[] = [];
  const catSpan = 360 / FLAVOR_DATA.length;
  FLAVOR_DATA.forEach((cat: FlavorCategory, ci: number) => {
    const ca = ci * catSpan;
    segs.push({ id: cat.id, type: "cat", name: cat.name, amharic: cat.amharic, emoji: cat.emoji, desc: cat.desc, catId: cat.id, a1: ca, a2: ca + catSpan, children: cat.children });
    const subSpan = catSpan / cat.children.length;
    cat.children.forEach((sub: FlavorSubcat, si: number) => {
      const sa = ca + si * subSpan;
      segs.push({ id: `${cat.id}-${si}`, type: "sub", name: sub.name, catId: cat.id, a1: sa, a2: sa + subSpan });
      const flvSpan = subSpan / sub.children.length;
      sub.children.forEach((flv: FlavorChild, fi: number) => {
        segs.push({
          id: `${cat.id}-${si}-${fi}`, type: "flv", name: flv.name, amharic: flv.amharic,
          catId: cat.id, catName: cat.name, catAmharic: cat.amharic, catEmoji: cat.emoji,
          subcatName: sub.name, catDesc: cat.desc,
          a1: sa + fi * flvSpan, a2: sa + (fi + 1) * flvSpan,
        });
      });
    });
  });
  return segs;
}

const SEGS = buildSegs();

function hashRating(name: string): number {
  return (name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 3) + 3;
}

export default function CoffeeFlavorWheel() {
  const [sel, setSel] = useState<Segment | null>(null);
  const [hov, setHov] = useState<string | null>(null);

  return (
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Noto+Serif+Ethiopic:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#0D0500}::-webkit-scrollbar-thumb{background:#C8930A;border-radius:3px}
        path{transition:opacity 0.2s,filter 0.15s}
        .leg-item:hover{background:rgba(200,147,10,0.06)!important;border-color:rgba(200,147,10,0.2)!important}
      `}</style>
      <div style={S.grid} />
      <header style={S.header}>
        <div style={S.hTop}>
          <div style={S.hLeft}>
            <div style={S.crest}><span style={S.crestT}>ቡጠማ</span><span style={{ fontSize: 13 }}>☕</span></div>
            <div>
              <div style={S.orgN}>የቡና ጠጭዎች ማህበር</div>
              <div style={S.orgS}>Ethiopian Coffee Drinkers Association</div>
            </div>
          </div>
          <div style={S.badge}><div style={S.dot} /><span style={{ fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: 1.5, color: "#C8930A", textTransform: "uppercase" as const }}>TikTok Parody Movement</span></div>
        </div>
        <div style={S.tag}>🇪🇹&ensp;Click the wheel to discover what your bunna is telling you&ensp;🇪🇹</div>
      </header>
      <div style={S.main}>
        <div style={S.ww}>
          <svg viewBox="0 0 600 600" style={S.svg}>
            <defs>
              <radialGradient id="bg2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#1C0A02" /><stop offset="100%" stopColor="#0A0300" /></radialGradient>
              <radialGradient id="cg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(200,147,10,0.18)" /><stop offset="100%" stopColor="rgba(200,147,10,0)" /></radialGradient>
              <filter id="gl"><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              <filter id="sg"><feGaussianBlur stdDeviation="2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <circle cx={300} cy={300} r={300} fill="url(#bg2)" />
            {SEGS.map(seg => {
              const colors = CAT_COLORS[seg.catId];
              const ri = seg.type === "cat" ? 0 : seg.type === "sub" ? 1 : 2;
              const [r1, r2] = RINGS[seg.type === "cat" ? "cat" : seg.type === "sub" ? "sub" : "flv"];
              const base = colors[ri];
              const isSel = sel?.id === seg.id;
              const isCat = sel && seg.catId === sel.catId;
              const isHov = hov === seg.id;
              return (
                <path
                  key={seg.id}
                  d={arcPath(r1, r2, seg.a1, seg.a2)}
                  fill={isSel ? "#D4A820" : base}
                  stroke="#0A0300"
                  strokeWidth={isSel ? 1.5 : 0.5}
                  opacity={sel && !isCat ? 0.25 : 1}
                  style={{ cursor: "pointer", filter: isHov || isSel ? "brightness(1.5)" : "none" }}
                  onClick={() => setSel(p => p?.id === seg.id ? null : seg)}
                  onMouseEnter={() => setHov(seg.id)}
                  onMouseLeave={() => setHov(null)}
                />
              );
            })}
            {SEGS.filter(s => s.type === "cat").map(seg => {
              const mid = (seg.a1 + seg.a2) / 2;
              const [tx, ty] = polar((RINGS.cat[0] + RINGS.cat[1]) / 2, mid);
              let rot = mid - 90;
              if (mid > 90 && mid < 270) rot += 180;
              return (
                <g key={`cl-${seg.id}`} transform={`translate(${tx},${ty})rotate(${rot})`}>
                  <text textAnchor="middle" dominantBaseline="central" style={{ fontSize: 8.5, fill: "#F5E6C8", fontFamily: "'Cinzel',serif", fontWeight: 700, letterSpacing: 0.8, pointerEvents: "none" }}>{seg.name.toUpperCase()}</text>
                </g>
              );
            })}
            {SEGS.filter(s => s.type === "sub" && (s.a2 - s.a1) > 13).map(seg => {
              const mid = (seg.a1 + seg.a2) / 2;
              const [tx, ty] = polar((RINGS.sub[0] + RINGS.sub[1]) / 2, mid);
              let rot = mid - 90;
              if (mid > 90 && mid < 270) rot += 180;
              const lbl = seg.name.length > 11 ? seg.name.slice(0, 10) + "…" : seg.name;
              return (
                <g key={`sl-${seg.id}`} transform={`translate(${tx},${ty})rotate(${rot})`}>
                  <text textAnchor="middle" dominantBaseline="central" style={{ fontSize: 6, fill: "rgba(245,230,200,0.7)", fontFamily: "'Cinzel',serif", letterSpacing: 0.2, pointerEvents: "none" }}>{lbl}</text>
                </g>
              );
            })}
            <circle cx={CX} cy={CY} r={100} fill="url(#cg)" />
            <circle cx={CX} cy={CY} r={67} fill="#0A0300" />
            <circle cx={CX} cy={CY} r={67} fill="none" stroke="#C8930A" strokeWidth={1.5} filter="url(#gl)" />
            <circle cx={CX} cy={CY} r={60} fill="none" stroke="rgba(200,147,10,0.3)" strokeWidth={0.8} strokeDasharray="4,3" />
            <text x={CX} y={CY - 9} textAnchor="middle" style={{ fontSize: 30, fill: "#C8930A", fontFamily: "'Noto Serif Ethiopic',serif", fontWeight: 700, pointerEvents: "none" }} filter="url(#sg)">ቡጠማ</text>
            <text x={CX} y={CY + 12} textAnchor="middle" style={{ fontSize: 6.5, fill: "rgba(245,230,200,0.5)", fontFamily: "'Cinzel',serif", letterSpacing: 3, pointerEvents: "none" }}>BUTEMA</text>
            <text x={CX} y={CY + 26} textAnchor="middle" style={{ fontSize: 14, pointerEvents: "none" }}>☕</text>
          </svg>
        </div>
        <div style={S.side}>
          {sel ? <FlavorCard seg={sel} onClose={() => setSel(null)} /> : <WelcomeCard />}
        </div>
      </div>
      <div style={S.legend}>
        {FLAVOR_DATA.map(cat => (
          <div key={cat.id} className="leg-item" style={S.legItem} onClick={() => setSel(p => p?.id === cat.id ? null : { id: cat.id, type: "cat", name: cat.name, amharic: cat.amharic, emoji: cat.emoji, desc: cat.desc, catId: cat.id, a1: 0, a2: 0, children: cat.children })}>
            <div style={{ ...S.legDot, background: CAT_COLORS[cat.id][0] }} />
            <span style={S.legAm}>{cat.amharic}</span>
            <span style={S.legEn}>{cat.name}</span>
          </div>
        ))}
      </div>
      <footer style={S.footer}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
          <span style={{ fontFamily: "'Noto Serif Ethiopic',serif", fontSize: 15, color: "#C8930A", fontWeight: 600 }}>ቡጠማ</span>
          <span style={{ color: "rgba(200,147,10,0.4)", fontSize: 12 }}>›</span>
          <span style={{ fontFamily: "'EB Garamond',serif", fontSize: 14, color: "rgba(245,230,200,0.45)", fontStyle: "italic" }}>ወደ ቡናው ዓለም ይቀላቀሉ — Join the Coffee World</span>
        </div>
        <div style={{ fontFamily: "'EB Garamond',serif", fontSize: 11, color: "rgba(245,230,200,0.25)", lineHeight: 1.6 }}>
          Interactive flavor wheel based on SCAA Coffee Taster&apos;s Flavor Wheel (2016) &amp; WCR Sensory Lexicon. This is a parody site made with love for the TikTok ቡጠማ movement. ቡጠማ is not a real organization... yet.
        </div>
      </footer>
    </div>
  );
}

function FlavorCard({ seg, onClose }: { seg: Segment; onClose: () => void }) {
  const lore = LORE[seg.name] || (seg.type === "cat" ? seg.desc : `A distinguished ${seg.catName || ""} note, recognized by the ቡጠማ tasting committee. Handle with appropriate reverence.`);
  const rating = hashRating(seg.name);
  return (
    <div style={FC.wrap}>
      <button onClick={onClose} style={FC.close}>✕</button>
      {seg.type === "cat" ? (
        <>
          <div style={{ fontSize: 52, textAlign: "center" as const, marginBottom: 10 }}>{seg.emoji}</div>
          <div style={FC.catAm}>{seg.amharic}</div>
          <div style={FC.catEn}>{seg.name}</div>
          <div style={FC.div} />
          <p style={FC.body}>{lore}</p>
          <div style={FC.hint}>↑ Click any segment in this slice for specific flavor notes</div>
        </>
      ) : (
        <>
          <div style={FC.crumb}>{seg.catEmoji}&ensp;{seg.catName}&ensp;›&ensp;{seg.subcatName}</div>
          <div style={FC.bigAm}>{seg.amharic || seg.name}</div>
          <div style={FC.bigEn}>{seg.name}</div>
          <div style={FC.div} />
          <div style={{ marginBottom: 10 }}>
            <div style={FC.certL}>ቡጠማ ሰርተፊኬት™</div>
            <div style={{ fontSize: 18, letterSpacing: 3, marginBottom: 12 }}>{"☕".repeat(rating)}{"🫙".repeat(5 - rating)}</div>
          </div>
          <p style={FC.body}>{lore}</p>
          <div style={FC.stamp}>✓&ensp;ቡጠማ APPROVED</div>
        </>
      )}
    </div>
  );
}

function WelcomeCard() {
  return (
    <div style={WC.wrap}>
      <div style={{ fontSize: 52, textAlign: "center" as const, marginBottom: 12 }}>☕</div>
      <div style={WC.am}>የቡና ጣዕም ዓለም</div>
      <div style={WC.sub}>The World of Coffee Flavor</div>
      <div style={WC.div} />
      <p style={WC.body}>Click any segment of the wheel to reveal the sacred flavor notes of Ethiopian coffee. Start at the center and work outward — from general to specific, like a true ቡጠማ member would.</p>
      <p style={{ ...WC.body, color: "rgba(245,230,200,0.48)", fontStyle: "italic", marginBottom: 16 }}>The outer ring holds the specific notes your coffee has been trying to tell you about this entire time.</p>
      <div style={WC.tip}>💡 Pro tip: The darker the ring, the more sophisticated you sound when you say it out loud at a ceremony.</div>
      <div style={{ display: "flex", flexDirection: "column" as const, gap: 6, marginTop: 16 }}>
        {([["#5C3320", "Category"], ["#8C5030", "Sub-group"], ["#C07840", "Specific Flavor"]] as const).map(([c, l]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Cinzel',serif", fontSize: 9.5, letterSpacing: 1, color: "rgba(245,230,200,0.4)", textTransform: "uppercase" as const }}>
            <span style={{ display: "inline-block", width: 12, height: 12, borderRadius: "50%", background: c, flexShrink: 0 }} />
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  root: { minHeight: "100vh", background: "#0D0500", color: "#F5E6C8", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" },
  grid: { position: "fixed", inset: 0, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 47px,rgba(200,147,10,0.025) 47px,rgba(200,147,10,0.025) 48px),repeating-linear-gradient(90deg,transparent,transparent 47px,rgba(200,147,10,0.025) 47px,rgba(200,147,10,0.025) 48px)", pointerEvents: "none", zIndex: 0 },
  header: { position: "relative", zIndex: 2, borderBottom: "1px solid rgba(200,147,10,0.18)", background: "rgba(10,3,0,0.88)", backdropFilter: "blur(8px)" },
  hTop: { maxWidth: 1140, margin: "0 auto", padding: "18px 28px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" },
  hLeft: { display: "flex", alignItems: "center", gap: 18 },
  crest: { width: 64, height: 64, borderRadius: "50%", border: "2px solid rgba(200,147,10,0.65)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(200,147,10,0.07)", flexShrink: 0, boxShadow: "0 0 24px rgba(200,147,10,0.15)" },
  crestT: { fontFamily: "'Noto Serif Ethiopic',serif", fontSize: 22, color: "#C8930A", lineHeight: 1 },
  orgN: { fontFamily: "'Noto Serif Ethiopic',serif", fontSize: 17, color: "#F5E6C8", fontWeight: 600, lineHeight: 1.4 },
  orgS: { fontFamily: "'Cinzel',serif", fontSize: 10, color: "rgba(245,230,200,0.4)", letterSpacing: 2, textTransform: "uppercase", marginTop: 3 },
  badge: { border: "1px solid rgba(200,147,10,0.3)", borderRadius: 3, padding: "7px 14px", background: "rgba(200,147,10,0.05)", display: "flex", alignItems: "center", gap: 8 },
  dot: { width: 6, height: 6, borderRadius: "50%", background: "#C8930A", boxShadow: "0 0 8px #C8930A" },
  tag: { background: "rgba(200,147,10,0.06)", borderTop: "1px solid rgba(200,147,10,0.1)", padding: "8px 28px", textAlign: "center", fontFamily: "'EB Garamond',serif", fontSize: 14, color: "rgba(245,230,200,0.6)", letterSpacing: 0.5, fontStyle: "italic" },
  main: { flex: 1, position: "relative", zIndex: 1, maxWidth: 1140, margin: "0 auto", width: "100%", display: "flex", alignItems: "flex-start", gap: 36, padding: "36px 28px", flexWrap: "wrap" },
  ww: { flex: "0 0 auto", width: "min(560px,100%)" },
  svg: { width: "100%", height: "auto", display: "block" },
  side: { flex: "1 1 280px", minWidth: 260, position: "sticky", top: 24 },
  legend: { position: "relative", zIndex: 1, maxWidth: 1140, margin: "0 auto 8px", width: "100%", padding: "0 28px 20px", display: "flex", flexWrap: "wrap", gap: "6px 16px" },
  legItem: { display: "flex", alignItems: "center", gap: 7, cursor: "pointer", padding: "4px 10px", borderRadius: 2, border: "1px solid transparent", transition: "all 0.15s" },
  legDot: { width: 10, height: 10, borderRadius: "50%", flexShrink: 0 },
  legAm: { fontFamily: "'Noto Serif Ethiopic',serif", fontSize: 12, color: "rgba(245,230,200,0.75)" },
  legEn: { fontFamily: "'Cinzel',serif", fontSize: 9, color: "rgba(245,230,200,0.3)", letterSpacing: 1, textTransform: "uppercase" },
  footer: { position: "relative", zIndex: 1, borderTop: "1px solid rgba(200,147,10,0.1)", padding: "18px 28px", maxWidth: 1140, margin: "0 auto", width: "100%" },
};

const FC: Record<string, React.CSSProperties> = {
  wrap: { background: "rgba(18,6,0,0.9)", border: "1px solid rgba(200,147,10,0.28)", borderRadius: 2, padding: 28, position: "relative", backdropFilter: "blur(12px)" },
  close: { position: "absolute", top: 12, right: 14, background: "none", border: "none", color: "rgba(245,230,200,0.28)", cursor: "pointer", fontSize: 15, padding: "2px 6px", lineHeight: 1, transition: "color 0.15s" },
  catAm: { fontFamily: "'Noto Serif Ethiopic',serif", fontSize: 34, color: "#C8930A", fontWeight: 700, textAlign: "center", lineHeight: 1.4 },
  catEn: { fontFamily: "'Cinzel',serif", fontSize: 12, letterSpacing: 3, color: "rgba(245,230,200,0.45)", textAlign: "center", textTransform: "uppercase", margin: "6px 0 14px" },
  div: { height: 1, background: "linear-gradient(90deg,transparent,rgba(200,147,10,0.5),transparent)", margin: "14px 0" },
  body: { fontFamily: "'EB Garamond',serif", fontSize: 16, color: "rgba(245,230,200,0.78)", lineHeight: 1.7, fontStyle: "italic" },
  hint: { marginTop: 14, fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 1.5, color: "rgba(245,230,200,0.28)", textTransform: "uppercase" },
  crumb: { fontFamily: "'Cinzel',serif", fontSize: 9.5, letterSpacing: 1.5, color: "rgba(245,230,200,0.35)", textTransform: "uppercase", marginBottom: 14 },
  bigAm: { fontFamily: "'Noto Serif Ethiopic',serif", fontSize: 38, color: "#C8930A", fontWeight: 700, lineHeight: 1.3 },
  bigEn: { fontFamily: "'EB Garamond',serif", fontSize: 22, color: "rgba(245,230,200,0.72)", marginTop: 2, marginBottom: 12 },
  certL: { fontFamily: "'Noto Serif Ethiopic',serif", fontSize: 12, color: "rgba(245,230,200,0.38)", marginBottom: 4 },
  stamp: { marginTop: 18, display: "inline-block", border: "2px solid rgba(200,147,10,0.4)", padding: "6px 18px", fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 2.5, color: "#C8930A", textTransform: "uppercase", transform: "rotate(-2.5deg)", boxShadow: "inset 0 0 12px rgba(200,147,10,0.07)" },
};

const WC: Record<string, React.CSSProperties> = {
  wrap: { background: "rgba(18,6,0,0.72)", border: "1px solid rgba(200,147,10,0.16)", borderRadius: 2, padding: 28, textAlign: "center" },
  am: { fontFamily: "'Noto Serif Ethiopic',serif", fontSize: 20, color: "#C8930A", fontWeight: 600, marginBottom: 4 },
  sub: { fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(245,230,200,0.32)", marginBottom: 14 },
  div: { height: 1, background: "linear-gradient(90deg,transparent,rgba(200,147,10,0.3),transparent)", margin: "14px 0" },
  body: { fontFamily: "'EB Garamond',serif", fontSize: 15, color: "rgba(245,230,200,0.68)", lineHeight: 1.7, marginBottom: 12, textAlign: "left" },
  tip: { background: "rgba(200,147,10,0.06)", border: "1px solid rgba(200,147,10,0.15)", borderRadius: 2, padding: "10px 14px", fontFamily: "'EB Garamond',serif", fontSize: 13, color: "rgba(245,230,200,0.55)", lineHeight: 1.55, fontStyle: "italic", textAlign: "left" },
};
