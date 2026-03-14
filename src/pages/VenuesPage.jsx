import { useState } from "react";
import C from '../constants/theme.js';
import VENUES from '../data/venues.js';
import StarRating from '../components/StarRating.jsx';
import SectionLabel from '../components/SectionLabel.jsx';
import GoldDivider from '../components/GoldDivider.jsx';

const VenuesPage = ({ setPage, setSelectedVenue }) => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const tags = ["All","Most Booked","Premium","Best Value","Outdoor"];
  const filtered = VENUES.filter(v => (filter==="All"||v.tag===filter) && (v.name.toLowerCase().includes(search.toLowerCase())||v.location.toLowerCase().includes(search.toLowerCase())));
  return (
    <div className="fade-in" style={{ minHeight:"100vh", backgroundColor:C.cream }}>
      <div style={{ padding:"56px 32px", textAlign:"center", background:`linear-gradient(135deg,${C.emeraldDark},${C.emerald})` }}>
        <SectionLabel>Discover</SectionLabel>
        <GoldDivider />
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,4vw,46px)", fontWeight:900, color:"white", marginBottom:10 }}>All Venues in Peshawar</h1>
        <p style={{ fontSize:13, color:"rgba(255,255,255,0.6)", maxWidth:400, margin:"0 auto" }}>340+ verified venues — with 360° virtual tours so you can explore before you book</p>
      </div>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"36px 32px" }}>
        <div style={{ display:"flex", gap:12, marginBottom:28, flexWrap:"wrap", alignItems:"center" }}>
          <input style={{ flex:1, minWidth:200, borderRadius:10, padding:"11px 16px", fontSize:13, border:`1.5px solid rgba(10,92,68,0.2)`, outline:"none", color:"#333", background:"white" }} placeholder="🔍  Search venues..." value={search} onChange={e => setSearch(e.target.value)} />
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {tags.map(t => (
              <button key={t} onClick={() => setFilter(t)} style={{ fontSize:12, fontWeight:600, padding:"8px 16px", borderRadius:20, border:"none", cursor:"pointer", background: filter===t?C.emerald:"white", color: filter===t?"white":C.emerald, outline: filter===t?"none":`1.5px solid ${C.emerald}` }}>{t}</button>
            ))}
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:20 }}>
          {filtered.map(v => (
            <div key={v.id} className="card-hover" style={{ background:"white", borderRadius:16, overflow:"hidden", cursor:"pointer", boxShadow:"0 2px 16px rgba(0,0,0,0.07)", display:"flex" }}
              onClick={() => { setSelectedVenue(v); setPage("VenueDetail"); }}>
              <div style={{ width:140, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", background:`linear-gradient(135deg,${v.color},${v.color}99)` }}>
                <div style={{ fontSize:46 }}>{v.emoji}</div>
                <div style={{ position:"absolute", top:8, left:8, fontSize:9, fontWeight:800, padding:"3px 8px", borderRadius:20, background:`linear-gradient(135deg,${C.gold},${C.goldLight})`, color:C.emeraldDark }}>{v.tag}</div>
              </div>
              <div style={{ padding:"18px 20px", flex:1 }}>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:700, color:C.emeraldDark, marginBottom:4 }}>{v.name}</h3>
                <p style={{ fontSize:12, color:"#888", marginBottom:8 }}>📍 {v.location}</p>
                <StarRating rating={v.rating} />
                <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:10 }}>
                  <span style={{ fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20, background:"rgba(10,92,68,0.08)", color:C.emeraldDark }}>PKR {v.price}/head</span>
                  <span style={{ fontSize:11, color:"#aaa" }}>👥 Up to {v.capacity}</span>
                </div>
                <button style={{ marginTop:12, width:"100%", padding:9, borderRadius:9, fontSize:12, fontWeight:700, color:"white", background:`linear-gradient(135deg,${C.emerald},${C.emeraldDark})`, border:"none", cursor:"pointer" }}>View Details + 360° Tour</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenuesPage;