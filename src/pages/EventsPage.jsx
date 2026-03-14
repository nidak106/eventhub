import { useState } from "react";
import C from '../constants/theme.js';
import EVENTS from '../data/events.js';
import SectionLabel from '../components/SectionLabel.jsx';
import GoldDivider from '../components/GoldDivider.jsx';
import WhatsAppIcon from '../components/WhatsAppIcon.jsx';

const EventsPage = () => {
  const [filter, setFilter] = useState("All");
  const cats = ["All","Tech","Academic","Cultural","Business","Arts"];
  const filtered = EVENTS.filter(e => filter==="All" || e.category===filter);
  return (
    <div className="fade-in" style={{ minHeight:"100vh", backgroundColor:C.cream }}>
      <div style={{ padding:"56px 32px", textAlign:"center", background:`linear-gradient(135deg,${C.emeraldDark},${C.emerald})` }}>
        <SectionLabel>Upcoming</SectionLabel>
        <GoldDivider />
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,4vw,46px)", fontWeight:900, color:"white", marginBottom:10 }}>Events in Peshawar</h1>
        <p style={{ fontSize:13, color:"rgba(255,255,255,0.6)", maxWidth:400, margin:"0 auto" }}>Workshops, conferences, cultural nights — RSVP via WhatsApp instantly.</p>
      </div>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"36px 32px" }}>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:28 }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{ fontSize:12, fontWeight:600, padding:"7px 16px", borderRadius:20, border:"none", cursor:"pointer", background: filter===c?C.emerald:"white", color: filter===c?"white":C.emerald, outline: filter===c?"none":`1.5px solid ${C.emerald}` }}>{c}</button>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:18 }}>
          {filtered.map(ev => (
            <div key={ev.id} className="card-hover" style={{ background:"white", borderRadius:16, overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.07)" }}>
              <div style={{ height:4, background:ev.color }} />
              <div style={{ padding:"18px 18px 20px" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:10 }}>
                  <span style={{ fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20, background:ev.color, color:"white" }}>{ev.category}</span>
                  <span style={{ fontSize:10, fontWeight:700, padding:"3px 9px", borderRadius:8, marginLeft:6, flexShrink:0, background: ev.seats<10?"#fef2f2":"#f0fdf4", border: ev.seats<10?"1px solid #fca5a5":"1px solid #86efac", color: ev.seats<10?"#ef4444":"#16a34a" }}>{ev.seats} left</span>
                </div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:15, fontWeight:700, color:C.emeraldDark, marginBottom:6, lineHeight:1.35 }}>{ev.title}</h3>
                <p style={{ fontSize:11, color:"#888", marginBottom:3 }}>📅 {ev.date}</p>
                <p style={{ fontSize:11, color:"#888", marginBottom:14 }}>📍 {ev.venue}</p>
                <div style={{ marginBottom:14 }}><span style={{ fontSize:14, fontWeight:800, color:C.emeraldDark }}>{ev.price}</span></div>
                <button onClick={() => window.open("https://wa.me/92300000000","_blank")} style={{ width:"100%", padding:10, borderRadius:10, fontSize:12, fontWeight:700, color:"white", background:"#25D366", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                  <WhatsAppIcon size={13} /> RSVP via WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;