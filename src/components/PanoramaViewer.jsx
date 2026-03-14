import { useState, useEffect, useRef } from "react";
import C from '../constants/theme.js';

const PanoramaViewer = ({ venue }) => {
  const [angle, setAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const timerRef = useRef(null);
  useEffect(() => {
    if (autoPlay) timerRef.current = setInterval(() => setAngle(a => (a+0.5)%360), 30);
    return () => clearInterval(timerRef.current);
  }, [autoPlay]);
  const faces = venue.panorama.walls;
  const faceConfigs = [
    { rot:"rotateY(0deg) translateZ(200px)", label:"North" },
    { rot:"rotateY(60deg) translateZ(200px)", label:"NE" },
    { rot:"rotateY(120deg) translateZ(200px)", label:"East" },
    { rot:"rotateY(180deg) translateZ(200px)", label:"South" },
    { rot:"rotateY(240deg) translateZ(200px)", label:"SW" },
    { rot:"rotateY(300deg) translateZ(200px)", label:"West" },
  ];
  return (
    <div style={{ borderRadius:16, overflow:"hidden", border:"1px solid rgba(201,168,76,0.3)" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 16px", background:C.emeraldDark }}>
        <span style={{ fontSize:14, fontWeight:700, color:"white" }}>🔭 360° Virtual Tour — {venue.panorama.label}</span>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <button onClick={() => setAutoPlay(p=>!p)} style={{ fontSize:11, fontWeight:600, padding:"4px 10px", borderRadius:8, background: autoPlay?C.gold:"rgba(255,255,255,0.1)", color: autoPlay?C.emeraldDark:"white", border:"none", cursor:"pointer" }}>
            {autoPlay ? "⏸ Pause" : "▶ Auto"}
          </button>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>Drag to rotate</span>
        </div>
      </div>
      <div style={{ position:"relative", height:320, background:`linear-gradient(135deg,${venue.color}dd,${venue.color}88)`, cursor: dragging?"grabbing":"grab", userSelect:"none" }}
        onMouseDown={e => { setDragging(true); setStartX(e.clientX); setAutoPlay(false); }}
        onMouseMove={e => { if(!dragging) return; setAngle(a => (a+(e.clientX-startX)*0.5)%360); setStartX(e.clientX); }}
        onMouseUp={() => setDragging(false)} onMouseLeave={() => setDragging(false)}
        onTouchStart={e => { setStartX(e.touches[0].clientX); setAutoPlay(false); }}
        onTouchMove={e => { setAngle(a => (a+(e.touches[0].clientX-startX)*0.4)%360); setStartX(e.touches[0].clientX); }}>
        <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", perspective:600 }}>
          <div style={{ width:400, height:280, position:"relative", transformStyle:"preserve-3d", transform:`rotateY(${angle}deg)`, transition: autoPlay?"none":"transform 0.05s linear" }}>
            {faceConfigs.map((fc,i) => (
              <div key={i} style={{ position:"absolute", width:400, height:280, transform:fc.rot, background:`rgba(0,0,0,${0.45+i*0.02})`, border:"1px solid rgba(255,255,255,0.1)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", backdropFilter:"blur(2px)" }}>
                <span style={{ fontSize:52 }}>{faces[i]}</span>
                <span style={{ fontSize:11, color:"rgba(255,255,255,0.5)", marginTop:8, fontWeight:500, letterSpacing:"0.1em" }}>{fc.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position:"absolute", bottom:12, left:"50%", transform:"translateX(-50%)", display:"flex", gap:4 }}>
          {["N","NE","E","SE","S","SW","W","NW"].map((d,i) => (
            <span key={d} style={{ fontSize:11, fontWeight:700, color:C.goldLight, opacity: Math.abs(((angle/45)%8)-i)<1.5 ? 1 : 0.25, transition:"opacity 0.3s" }}>{d}</span>
          ))}
        </div>
        <div style={{ position:"absolute", top:12, right:12, fontSize:11, fontWeight:700, padding:"4px 8px", borderRadius:8, background:"rgba(0,0,0,0.4)", color:C.goldLight }}>
          {Math.round(((angle%360)+360)%360)}°
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 16px", background:"rgba(7,61,46,0.95)", overflowX:"auto" }}>
        <span style={{ fontSize:11, color:"rgba(255,255,255,0.4)", whiteSpace:"nowrap" }}>Views:</span>
        {venue.gallery.map((g,i) => (
          <button key={i} style={{ fontSize:11, fontWeight:600, padding:"5px 12px", borderRadius:8, whiteSpace:"nowrap", background: i===0?C.gold:"rgba(255,255,255,0.1)", color: i===0?C.emeraldDark:"white", border:"none", cursor:"pointer" }}>{g}</button>
        ))}
      </div>
    </div>
  );
};

export default PanoramaViewer;