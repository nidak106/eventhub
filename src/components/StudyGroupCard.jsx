import { useState } from "react";
import C from '../constants/theme.js';
import WhatsAppIcon from './WhatsAppIcon.jsx';

const StudyGroupCard = ({ group }) => {
  const [joined, setJoined] = useState(false);
  const spotsLeft = group.maxMembers - group.members;
  const pct = Math.round((group.members / group.maxMembers) * 100);
  return (
    <div style={{ background:"white", borderRadius:16, overflow:"hidden", boxShadow:"0 2px 14px rgba(0,0,0,0.07)" }}>
      <div style={{ height:6, background:group.color }} />
      <div style={{ padding:20 }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:12 }}>
          <div style={{ width:48, height:48, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0, background:`${group.color}15` }}>{group.emoji}</div>
          <div style={{ flex:1, minWidth:0 }}>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:15, fontWeight:700, color:C.emeraldDark, lineHeight:1.3, margin:0 }}>{group.subject}</h3>
            <p style={{ fontSize:11, color:"#999", margin:"3px 0 0" }}>🎓 {group.uni}</p>
          </div>
          <span style={{ fontSize:11, fontWeight:700, padding:"4px 8px", borderRadius:8, flexShrink:0, background: spotsLeft<=2?"#fef2f2":"#f0fdf4", border: spotsLeft<=2?"1px solid #fca5a5":"1px solid #86efac", color: spotsLeft<=2?"#ef4444":"#16a34a" }}>{spotsLeft} spots</span>
        </div>
        <p style={{ fontSize:12, color:"#666", lineHeight:1.6, marginBottom:12 }}>{group.description}</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:12 }}>
          {[["🕐",group.schedule],["📍",group.location],["👤",`Host: ${group.host}`],["📚",group.level]].map(([icon,val],i) => (
            <p key={i} style={{ fontSize:11, color: i===3?group.color:"#777", fontWeight: i===3?600:400, margin:0 }}>{icon} {val}</p>
          ))}
        </div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:12 }}>
          {group.tags.map(t => (
            <span key={t} style={{ fontSize:11, padding:"2px 8px", borderRadius:20, fontWeight:500, background:`${group.color}12`, color:group.color, border:`1px solid ${group.color}30` }}>{t}</span>
          ))}
        </div>
        <div style={{ marginBottom:14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#aaa", marginBottom:4 }}>
            <span>{group.members}/{group.maxMembers} members</span><span>{pct}% full</span>
          </div>
          <div style={{ height:6, background:"#f0f0f0", borderRadius:99, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${pct}%`, background: pct>80?"#ef4444":`linear-gradient(90deg,${group.color},${C.gold})`, borderRadius:99 }} />
          </div>
        </div>
        {!joined
          ? <button onClick={() => { setJoined(true); window.open(`https://wa.me/${group.contact}?text=Hi ${group.host}! I'd like to join your ${group.subject} study group.`,"_blank"); }} style={{ width:"100%", padding:"10px", borderRadius:10, fontSize:12, fontWeight:700, color:"white", background:"#25D366", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}><WhatsAppIcon size={13} /> Request to Join</button>
          : <div style={{ width:"100%", padding:"10px", borderRadius:10, fontSize:12, fontWeight:700, textAlign:"center", background:"rgba(10,92,68,0.08)", color:C.emeraldDark }}>✅ Request sent via WhatsApp!</div>
        }
      </div>
    </div>
  );
};

export default StudyGroupCard;