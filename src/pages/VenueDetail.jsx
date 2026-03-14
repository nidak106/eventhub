import { useState } from "react";
import C from '../constants/theme.js';
import PanoramaViewer from '../components/PanoramaViewer.jsx';
import StarRating from '../components/StarRating.jsx';
import WhatsAppIcon from '../components/WhatsAppIcon.jsx';

const VenueDetailPage = ({ venue, setPage }) => {
  const [showBooking, setShowBooking] = useState(false);
  if (!venue) { setPage("Venues"); return null; }
  return (
    <div className="fade-in" style={{ minHeight:"100vh", backgroundColor:C.cream }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"20px 32px 0" }}>
        <button onClick={() => setPage("Venues")} style={{ fontSize:13, fontWeight:600, color:C.emerald, background:"none", border:"none", cursor:"pointer" }}>← Back to Venues</button>
      </div>
      <div style={{ position:"relative", height:220, display:"flex", alignItems:"flex-end", padding:"0 32px 24px", background:`linear-gradient(135deg,${venue.color},${venue.color}88)`, marginTop:16 }}>
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", opacity:0.15, pointerEvents:"none" }}>
          <span style={{ fontSize:200, lineHeight:1 }}>{venue.emoji}</span>
        </div>
        <div style={{ position:"relative", zIndex:1, maxWidth:1100, width:"100%", margin:"0 auto" }}>
          <div style={{ fontSize:10, fontWeight:800, padding:"4px 12px", borderRadius:20, display:"inline-block", marginBottom:10, background:`linear-gradient(135deg,${C.gold},${C.goldLight})`, color:C.emeraldDark }}>{venue.tag}</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(24px,3.5vw,40px)", fontWeight:900, color:"white", marginBottom:6 }}>{venue.name}</h1>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.75)" }}>📍 {venue.location}</p>
        </div>
      </div>
      <div className="venue-detail-grid" style={{ maxWidth:1100, margin:"0 auto", padding:"32px" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
          <PanoramaViewer venue={venue} />
          <div style={{ background:"white", borderRadius:16, padding:24, boxShadow:"0 2px 16px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, color:C.emeraldDark, marginBottom:10 }}>About This Venue</h2>
            <p style={{ fontSize:13, lineHeight:1.75, color:"#555" }}>{venue.description}</p>
          </div>
          <div style={{ background:"white", borderRadius:16, padding:24, boxShadow:"0 2px 16px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, color:C.emeraldDark, marginBottom:16 }}>Amenities & Features</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:10 }}>
              {venue.amenities.map((a,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#444", background:"#f8f8f8", borderRadius:10, padding:"10px 12px" }}>
                  <span style={{ color:C.gold, fontWeight:700 }}>✓</span> {a}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ position:"sticky", top:80 }}>
          <div style={{ background:"white", borderRadius:18, padding:24, boxShadow:"0 4px 28px rgba(0,0,0,0.1)" }}>
            <StarRating rating={venue.rating} />
            <div style={{ marginTop:14, marginBottom:4 }}>
              <span style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700, color:C.emeraldDark }}>PKR {venue.price}</span>
              <span style={{ fontSize:12, color:"#aaa", marginLeft:4 }}>/ head</span>
            </div>
            <p style={{ fontSize:12, color:"#aaa", marginBottom:20 }}>👥 Up to {venue.capacity} guests</p>
            <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>
              <div>
                <label style={{ fontSize:11, fontWeight:600, color:"#888", display:"block", marginBottom:5 }}>Event Date</label>
                <input type="date" style={{ width:"100%", borderRadius:10, border:`1.5px solid rgba(10,92,68,0.22)`, padding:"10px 12px", fontSize:13, outline:"none" }} />
              </div>
              <div>
                <label style={{ fontSize:11, fontWeight:600, color:"#888", display:"block", marginBottom:5 }}>Guests</label>
                <select style={{ width:"100%", borderRadius:10, border:`1.5px solid rgba(10,92,68,0.22)`, padding:"10px 12px", fontSize:13, outline:"none", background:"white" }}>
                  <option>50–100</option><option>100–200</option><option>200–350</option><option>350+</option>
                </select>
              </div>
            </div>
            <button onClick={() => setShowBooking(true)} style={{ width:"100%", padding:12, borderRadius:11, fontSize:13, fontWeight:700, color:"white", background:`linear-gradient(135deg,${C.emerald},${C.emeraldDark})`, border:"none", cursor:"pointer", marginBottom:10 }}>Check Availability</button>
            <button onClick={() => window.open("https://wa.me/92300000000","_blank")} style={{ width:"100%", padding:12, borderRadius:11, fontSize:13, fontWeight:700, color:"white", background:"#25D366", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              <WhatsAppIcon size={15} /> Quick Inquiry
            </button>
            {showBooking && <div style={{ marginTop:14, padding:12, borderRadius:10, fontSize:13, textAlign:"center", fontWeight:600, background:"rgba(10,92,68,0.08)", color:C.emeraldDark }}>✅ Request sent! The venue will contact you within 24 hours.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetailPage;