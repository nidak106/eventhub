import { useState, useEffect } from "react";
import C from '../constants/theme.js';
import STUDY_GROUPS from '../data/studyGroups.js';
import JOBS from '../data/jobs.js';
import SectionLabel from '../components/SectionLabel.jsx';
import GoldDivider from '../components/GoldDivider.jsx';
import StudyGroupCard from '../components/StudyGroupCard.jsx';
import JobCard from '../components/JobCard.jsx';
import WhatsAppIcon from '../components/WhatsAppIcon.jsx';

const StudentsPage = ({ setPage }) => {
  const [tab, setTab] = useState("groups");
  const [groupFilter, setGroupFilter] = useState("All");
  const [jobFilter, setJobFilter] = useState("All");
  const [isMobile, setIsMobile] = useState(false);
  const groupSubjects = ["All","CS","Math","Chemistry","Finance","IELTS","Web Dev"];
  const jobTypes = ["All","Internship","Part-time","Campus Job","Commission"];
  const filteredGroups = STUDY_GROUPS.filter(g => groupFilter==="All" || g.tags.some(t => t.toLowerCase().includes(groupFilter.toLowerCase())));
  const filteredJobs = JOBS.filter(j => jobFilter==="All" || j.type===jobFilter);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 780);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="fade-in" style={{ minHeight:"100vh", backgroundColor:C.cream }}>
      {/* Hero */}
      <div style={{ position:"relative", overflow:"hidden", padding: isMobile?"48px 16px":"64px 32px", textAlign:"center", background:`linear-gradient(160deg,${C.emeraldDark} 0%,#0d4a34 60%,${C.emerald} 100%)` }}>
        <div style={{ position:"absolute", top:0, right:0, width:320, height:320, borderRadius:"50%", pointerEvents:"none", opacity:0.1, background:`radial-gradient(circle,${C.gold} 0%,transparent 70%)`, transform:"translate(30%,-30%)" }} />
        <div style={{ position:"relative", zIndex:1, maxWidth:640, margin:"0 auto" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px", borderRadius:50, marginBottom:16, fontSize:12, fontWeight:600, background:"rgba(255,255,255,0.1)", border:`1px solid rgba(201,168,76,0.4)`, color:C.goldLight }}>
            🎓 Made for Peshawar Students
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, color:"white", fontSize:"clamp(32px,5vw,52px)", lineHeight:1.15, marginBottom:12 }}>
            Study Smarter.<br /><span style={{ color:C.goldLight }}>Work Sooner.</span>
          </h1>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.65)", maxWidth:420, margin:"0 auto 32px" }}>
            Join peer study groups across Peshawar universities, or find part-time jobs and internships made for students.
          </p>
          <div style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap: isMobile?12:0 }}>
            {[{n:`${STUDY_GROUPS.length}`,l:"Study Groups"},{n:`${JOBS.length}`,l:"Open Positions"},{n:"6",l:"Universities"}].map((s,i) => (
              <div key={s.l} style={{ textAlign:"center", padding:isMobile?"12px 14px":"0 28px", borderLeft: i>0 && !isMobile?"1px solid rgba(255,255,255,0.15)":"none" }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700, color:C.goldLight }}>{s.n}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", marginTop:3 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ height:2, background:`linear-gradient(90deg,transparent,${C.gold},${C.goldLight},${C.gold},transparent)` }} />

      <div style={{ maxWidth:1100, margin:"0 auto", padding: isMobile?"32px 16px":"40px 32px" }}>
        {/* Tab switcher */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:36, padding:6, borderRadius:16, background:"rgba(10,92,68,0.06)" }}>
          {[{key:"groups",label:`📚 Study Groups (${STUDY_GROUPS.length})`},{key:"jobs",label:`💼 Jobs & Internships (${JOBS.length})`}].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ flex: isMobile?"1 1 auto":1, padding: isMobile?"10px 12px":"12px", fontSize:13, fontWeight:700, borderRadius:12, border:"none", cursor:"pointer", transition:"all 0.2s", background: tab===t.key?C.emerald:"white", color: tab===t.key?"white":C.emerald, boxShadow: tab===t.key?`0 4px 16px ${C.emerald}44`:"none", outline: tab===t.key?"none":`1.5px solid rgba(10,92,68,0.2)` }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Study Groups Tab */}
        {tab==="groups" && (
          <div className="fade-in">
            <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:12 }}>
              <div>
                <SectionLabel>Peer Learning</SectionLabel>
                <GoldDivider />
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(22px,3vw,32px)", fontWeight:900, color:C.emeraldDark, margin:0 }}>Find Your Study Group</h2>
                <p style={{ fontSize:12, color:"#888", marginTop:4 }}>Connect with peers at your university — or across all of Peshawar</p>
              </div>
              <button onClick={() => window.open("https://wa.me/92300000000?text=Hi! I'd like to post my study group.","_blank")} style={{ fontSize:13, fontWeight:700, padding:"10px 20px", borderRadius:12, border:`2px solid ${C.emerald}`, color:C.emerald, background:"white", cursor:"pointer" }}>+ Post Your Group</button>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:24 }}>
              {groupSubjects.map(s => (
                <button key={s} onClick={() => setGroupFilter(s)} style={{ fontSize:12, fontWeight:600, padding:"7px 16px", borderRadius:20, border:"none", cursor:"pointer", background: groupFilter===s?C.emerald:"white", color: groupFilter===s?"white":C.emerald, outline: groupFilter===s?"none":`1.5px solid ${C.emerald}` }}>{s}</button>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:20, marginBottom:32 }}>
              {filteredGroups.map(g => <StudyGroupCard key={g.id} group={g} />)}
            </div>
            <div style={{ borderRadius:16, padding:24, display:"flex", alignItems:"flex-start", gap:16, background:`linear-gradient(135deg,${C.emeraldDark},${C.emerald})`, border:`1px solid rgba(201,168,76,0.3)` }}>
              <span style={{ fontSize:32, flexShrink:0 }}>💡</span>
              <div>
                <p style={{ fontWeight:700, fontSize:14, color:C.goldLight, margin:"0 0 6px" }}>Can't find your subject?</p>
                <p style={{ fontSize:12, color:"rgba(255,255,255,0.72)", lineHeight:1.6, margin:"0 0 12px" }}>Start your own study group in 2 minutes — message us on WhatsApp with your subject, university and schedule. We'll list it here for free.</p>
                <button onClick={() => window.open("https://wa.me/92300000000?text=Hi! I want to start a study group.","_blank")} style={{ fontSize:12, fontWeight:700, padding:"8px 16px", borderRadius:10, background:`linear-gradient(135deg,${C.gold},${C.goldLight})`, color:C.emeraldDark, border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}><WhatsAppIcon size={13} /> Start a Group</button>
              </div>
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {tab==="jobs" && (
          <div className="fade-in">
            <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:12 }}>
              <div>
                <SectionLabel>Opportunities</SectionLabel>
                <GoldDivider />
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(22px,3vw,32px)", fontWeight:900, color:C.emeraldDark, margin:0 }}>Jobs & Internships</h2>
                <p style={{ fontSize:12, color:"#888", marginTop:4 }}>Part-time, campus jobs and internships built for students</p>
              </div>
              <button onClick={() => window.open("https://wa.me/92300000000?text=Hi! I'd like to post a student job.","_blank")} style={{ fontSize:13, fontWeight:700, padding:"10px 20px", borderRadius:12, border:`2px solid ${C.emerald}`, color:C.emerald, background:"white", cursor:"pointer" }}>+ Post a Job</button>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:24 }}>
              {jobTypes.map(t => (
                <button key={t} onClick={() => setJobFilter(t)} style={{ fontSize:12, fontWeight:600, padding:"7px 16px", borderRadius:20, border:"none", cursor:"pointer", background: jobFilter===t?C.emerald:"white", color: jobFilter===t?"white":C.emerald, outline: jobFilter===t?"none":`1.5px solid ${C.emerald}` }}>{t}</button>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:20, marginBottom:32 }}>
              {filteredJobs.map(j => <JobCard key={j.id} job={j} />)}
            </div>
            <div style={{ borderRadius:16, padding:24, display:"flex", alignItems:"flex-start", gap:16, background:`linear-gradient(135deg,${C.emeraldDark},${C.emerald})`, border:`1px solid rgba(201,168,76,0.3)` }}>
              <span style={{ fontSize:32, flexShrink:0 }}>🏢</span>
              <div>
                <p style={{ fontWeight:700, fontSize:14, color:C.goldLight, margin:"0 0 6px" }}>Hiring students?</p>
                <p style={{ fontSize:12, color:"rgba(255,255,255,0.72)", lineHeight:1.6, margin:"0 0 12px" }}>Reach hundreds of motivated students from UET, UoP, IMSciences, Cecos, Qurtaba and more. Post for free.</p>
                <button onClick={() => window.open("https://wa.me/92300000000?text=Hi! I want to post a student job.","_blank")} style={{ fontSize:12, fontWeight:700, padding:"8px 16px", borderRadius:10, background:`linear-gradient(135deg,${C.gold},${C.goldLight})`, color:C.emeraldDark, border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}><WhatsAppIcon size={13} /> Post a Job Free</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsPage;