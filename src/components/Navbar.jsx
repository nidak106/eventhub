import { useEffect, useState } from "react";
import C from '../constants/theme.js';

const Navbar = ({ page, setPage }) => {
  const links = ["Home","Venues","Events","Students"];
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 800);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleNav = (target) => {
    setPage(target);
    setMenuOpen(false);
  };

  return (
    <nav style={{ position:"sticky", top:0, zIndex:60, backgroundColor:C.emeraldDark, borderBottom:"1px solid rgba(201,168,76,0.25)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 20px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <button onClick={() => handleNav("Home")} style={{ display:"flex", alignItems:"center", gap:10, background:"none", border:"none", cursor:"pointer" }}>
          <div style={{ width:36, height:36, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:17, background:`linear-gradient(135deg,${C.gold},${C.goldLight})`, color:C.emeraldDark, fontFamily:"'Playfair Display',serif" }}>E</div>
          <div style={{ display:isMobile?"none":"block" }}>
            <div style={{ fontSize:19, fontWeight:700, color:"white", lineHeight:1, fontFamily:"'Playfair Display',serif" }}>EventSync</div>
            <div style={{ fontSize:8, color:"rgba(255,255,255,0.45)", letterSpacing:"0.18em" }}>PESHAWAR</div>
          </div>
        </button>

        {!isMobile && (
          <div style={{ display:"flex", alignItems:"center", gap:30 }}>
            <div style={{ display:"flex", alignItems:"center", gap:28 }}>
              {links.map(l => (
                <button key={l} onClick={() => handleNav(l)} style={{ fontSize:13, fontWeight:500, color: page===l ? C.goldLight : "rgba(255,255,255,0.68)", background:"none", border:"none", cursor:"pointer", padding:"6px 0" }}>{l}</button>
              ))}
            </div>
            <button style={{ fontSize:13, fontWeight:700, padding:"9px 18px", borderRadius:10, background:`linear-gradient(135deg,${C.gold},${C.goldLight})`, color:C.emeraldDark, border:"none", cursor:"pointer" }}>
              List Your Venue
            </button>
          </div>
        )}

        {isMobile && (
          <button onClick={() => setMenuOpen(p => !p)}
            style={{ width:42, height:42, borderRadius:12, border:"1px solid rgba(255,255,255,0.25)", background:"rgba(255,255,255,0.08)", color:"white", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
            <span style={{ fontSize:22, lineHeight:1 }}>{menuOpen ? "✕" : "☰"}</span>
          </button>
        )}
      </div>

      {isMobile && menuOpen && (
        <div style={{ position:"fixed", inset:0, backgroundColor:"rgba(0,0,0,0.55)", zIndex:55, display:"flex", justifyContent:"flex-end" }}>
          <div style={{ width:260, background:C.emeraldDark, padding:24, display:"flex", flexDirection:"column", gap:18 }}>
            {links.map(l => (
              <button key={l} onClick={() => handleNav(l)} style={{ textAlign:"left", fontSize:16, fontWeight:700, color: page===l ? C.goldLight : "rgba(255,255,255,0.85)", background:"none", border:"none", padding:"12px 0", cursor:"pointer" }}>{l}</button>
            ))}
            <button onClick={() => setMenuOpen(false)} style={{ marginTop:12, fontSize:14, fontWeight:600, padding:"10px 12px", borderRadius:10, border:"1px solid rgba(255,255,255,0.35)", background:"rgba(255,255,255,0.08)", color:"white", cursor:"pointer" }}>Close</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
