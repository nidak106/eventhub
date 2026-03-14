import { useState } from "react";
import C from '../constants/theme.js';
import WhatsAppIcon from './WhatsAppIcon.jsx';

const JobCard = ({ job }) => {
  const [applied, setApplied] = useState(false);
  const typeColors = { "Internship":{bg:"#e0f2fe",text:"#0369a1"}, "Part-time":{bg:"#fef9c3",text:"#854d0e"}, "Campus Job":{bg:"#dcfce7",text:"#15803d"}, "Commission":{bg:"#fce7f3",text:"#9d174d"} };
  const tc = typeColors[job.type] || {bg:"#f3f4f6",text:"#374151"};
  return (
    <div style={{ background:"white", borderRadius:16, overflow:"hidden", boxShadow:"0 2px 14px rgba(0,0,0,0.07)" }}>
      <div style={{ height:6, background:job.color }} />
      <div style={{ padding:20 }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:12 }}>
          <div style={{ width:48, height:48, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0, background:`${job.color}15` }}>{job.emoji}</div>
          <div style={{ flex:1, minWidth:0 }}>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:15, fontWeight:700, color:C.emeraldDark, lineHeight:1.3, margin:0 }}>{job.title}</h3>
            <p style={{ fontSize:11, color:"#999", margin:"3px 0 0" }}>🏢 {job.company}</p>
          </div>
          <span style={{ fontSize:11, fontWeight:700, padding:"4px 8px", borderRadius:8, flexShrink:0, background:tc.bg, color:tc.text }}>{job.type}</span>
        </div>
        <p style={{ fontSize:12, color:"#666", lineHeight:1.6, marginBottom:12 }}>{job.description}</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:12 }}>
          {[["📍",job.location],["💰",job.stipend],["⏳",`Deadline: ${job.deadline}`],["📅",job.duration]].map(([icon,val],i) => (
            <p key={i} style={{ fontSize:11, color: i===1?C.emeraldDark:"#777", fontWeight: i===1?700:400, margin:0 }}>{icon} {val}</p>
          ))}
        </div>
        <div style={{ padding:"10px 12px", borderRadius:10, marginBottom:12, background:`${job.color}08`, border:`1px solid ${job.color}20` }}>
          <p style={{ fontSize:11, fontWeight:700, color:job.color, marginBottom:6 }}>Requirements</p>
          {job.requirements.map((r,i) => (
            <p key={i} style={{ fontSize:11, color:"#555", margin:"0 0 3px", display:"flex", alignItems:"flex-start", gap:6 }}><span style={{ color:C.gold, flexShrink:0 }}>✦</span>{r}</p>
          ))}
        </div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
          {job.tags.map(t => (
            <span key={t} style={{ fontSize:11, padding:"2px 8px", borderRadius:20, fontWeight:500, background:`${job.color}12`, color:job.color, border:`1px solid ${job.color}30` }}>{t}</span>
          ))}
        </div>
        {!applied
          ? <button onClick={() => { setApplied(true); window.open(`https://wa.me/${job.contact}?text=Hi! I'm a student interested in the ${job.title} position at ${job.company}.`,"_blank"); }} style={{ width:"100%", padding:"10px", borderRadius:10, fontSize:12, fontWeight:700, color:"white", background:"#25D366", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}><WhatsAppIcon size={13} /> Apply via WhatsApp</button>
          : <div style={{ width:"100%", padding:"10px", borderRadius:10, fontSize:12, fontWeight:700, textAlign:"center", background:"rgba(10,92,68,0.08)", color:C.emeraldDark }}>✅ Application sent! Expect a reply soon.</div>
        }
      </div>
    </div>
  );
};

export default JobCard;