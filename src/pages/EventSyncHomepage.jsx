import { useState, useEffect, useRef } from "react";

// ─── Brand Colors ────────────────────────────────────────────────────────────
const C = {
  emerald:     "#0a5c44",
  emeraldDark: "#073d2e",
  emeraldLight:"#0d7a5c",
  gold:        "#c9a84c",
  goldLight:   "#e5c97a",
  cream:       "#fdf8f0",
};

const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; }
    html, body { width: 100%; overflow-x: hidden; margin: 0; padding: 0; }
    body { font-family: 'DM Sans', sans-serif; background: #fdf8f0; }
    .playfair { font-family: 'Playfair Display', serif !important; }
    @keyframes fadeIn { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
    .fade-in { animation: fadeIn 0.4s ease both; }
    .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .card-hover:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(0,0,0,0.13) !important; }
    input, select { font-family: 'DM Sans', sans-serif; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: #f0ebe3; }
    ::-webkit-scrollbar-thumb { background: ${C.gold}; border-radius: 4px; }
  `}</style>
);

const VENUES = [
  { id:1, name:"Shiraz Gathering Hall", location:"University Road, Peshawar", price:"1,500 – 2,500", rating:5, capacity:500, tag:"Most Booked", emoji:"🏛️", color:"#0d5e45", description:"One of Peshawar's most iconic gathering halls, Shiraz offers a blend of classic Pashtun architecture and modern amenities. Lush gardens, air-conditioned halls, and a dedicated events team make every occasion memorable.", amenities:["Air Conditioning","Parking (200 cars)","In-house Catering","Stage & Sound","Bridal Suite","Valet Service"], panorama:{bg:"from-green-900 to-green-700",label:"Grand Banquet Hall",walls:["🏛️","🌿","🕌","✨","🌸","🏺"]}, gallery:["Main Hall","Garden Area","Bridal Suite","Entrance Lobby"] },
  { id:2, name:"Pearl Continental Banquet", location:"Khyber Road, Peshawar", price:"3,000 – 5,000", rating:5, capacity:800, tag:"Premium", emoji:"✨", color:"#1a4a6b", description:"The crown jewel of Peshawar's hospitality scene. Pearl Continental's banquet facilities are unrivaled — marble floors, crystal chandeliers, and world-class culinary offerings make it the preferred choice for elite events.", amenities:["Crystal Chandeliers","5-Star Catering","VIP Lounges","Live Kitchen","Valet Parking","Floral Design"], panorama:{bg:"from-blue-900 to-blue-700",label:"Crystal Ballroom",walls:["💎","🎼","🕯️","🌹","👑","🏆"]}, gallery:["Crystal Ballroom","VIP Lounge","Rooftop Terrace","Dining Hall"] },
  { id:3, name:"Hayatabad Convention", location:"Phase 5, Hayatabad", price:"1,200 – 2,000", rating:4, capacity:350, tag:"Best Value", emoji:"🌿", color:"#5c3a1e", description:"Nestled in the heart of Hayatabad, this convention center offers excellent value without compromising quality. Modern interiors, flexible hall configurations, and proximity to major hotels make it a smart choice.", amenities:["Flexible Layout","AV Equipment","Outdoor Lawn","Catering Kitchen","Prayer Room","Free Parking"], panorama:{bg:"from-amber-900 to-amber-700",label:"Convention Center",walls:["🌿","🏗️","🌄","🎋","🪴","🌾"]}, gallery:["Main Hall","Outdoor Lawn","Conference Room","Foyer"] },
  { id:4, name:"Nishtar Hall Garden", location:"GT Road, Peshawar", price:"800 – 1,500", rating:4, capacity:250, tag:"Outdoor", emoji:"🌸", color:"#3d1a5c", description:"A charming garden venue that transforms any event into a magical outdoor experience. Fairy lights, lush greenery, and a warm community atmosphere make Nishtar Hall Garden a beloved choice for intimate celebrations.", amenities:["Open Garden","Fairy Light Setup","Tent Options","BBQ Catering","Outdoor Stage","Photography Spots"], panorama:{bg:"from-purple-900 to-purple-700",label:"Garden Terrace",walls:["🌸","🌳","🎪","🌺","🦋","🌙"]}, gallery:["Main Garden","Decorated Tent","Stage Area","Night View"] },
];

const EVENTS = [
  { id:1, title:"UET Tech Fest 2025", date:"March 22, 2025", time:"9:00 AM – 6:00 PM", venue:"UET Peshawar Main Campus", seats:12, totalSeats:300, category:"Tech", price:"Free", color:C.emerald, emoji:"💻", organizer:"UET Peshawar — CS & IT Society", deadline:"March 18, 2025", description:"The biggest tech festival in KP — featuring robotics competitions, hackathons, app showcases, and talks by industry leaders. Over 40 teams compete across 8 categories. Open to all university students across Peshawar.", highlights:["Hackathon (24hr)","Robotics Arena","Industry Speaker Panels","App Showcase","Networking Lunch","Prize Pool PKR 500K"], contact:"92300111000", tags:["Open to All","Prizes","Networking"] },
  { id:2, title:"Qurtaba MUN Conference", date:"April 5, 2025", time:"8:30 AM – 5:00 PM", venue:"Qurtaba University, Phase 7, Peshawar", seats:28, totalSeats:120, category:"Academic", price:"PKR 500", color:"#1a4a6b", emoji:"🌐", organizer:"Qurtaba University Diplomatic Society", deadline:"March 30, 2025", description:"A two-day Model United Nations simulation bringing together 120 delegates from 15 universities across KPK. Committees include UNSC, UNHRC, and a special crisis committee focused on South Asian policy.", highlights:["6 UN Committees","Best Delegate Awards","Crisis Committee","Opening Ceremony","Diplomatic Networking","Certificate of Participation"], contact:"92300222000", tags:["Certificates","Inter-Uni","Award"] },
  { id:3, title:"Peshawar Uni Cultural Night", date:"April 18, 2025", time:"6:00 PM – 11:00 PM", venue:"University of Peshawar, Main Auditorium", seats:5, totalSeats:400, category:"Cultural", price:"PKR 200", color:"#5c1a1a", emoji:"🎭", organizer:"UoP Cultural & Arts Committee", deadline:"April 14, 2025", description:"An evening celebrating the rich cultural heritage of Khyber Pakhtunkhwa. Expect traditional Khattak dance performances, Pashto poetry nights, qawwali, live band performances, and an art exhibition by student artists.", highlights:["Khattak Dance","Pashto Poetry Mushaira","Live Qawwali","Student Art Exhibition","Traditional Food Stalls","Photography Contest"], contact:"92300333000", tags:["⚠️ Almost Full","Cultural","Evening"] },
  { id:4, title:"Startup Weekend Peshawar", date:"May 3, 2025", time:"Friday 6 PM – Sunday 8 PM", venue:"Cecos University, Hayatabad", seats:40, totalSeats:80, category:"Business", price:"PKR 1,000", color:"#4a3a1a", emoji:"🚀", organizer:"Startup Peshawar & Cecos University", deadline:"April 28, 2025", description:"54 hours of non-stop entrepreneurship. Pitch your idea, form a team, and build a real startup from scratch under the mentorship of Peshawar's top entrepreneurs and investors. The best team wins seed funding.", highlights:["54-Hour Sprint","Seed Funding Prize","Mentor Sessions","Investor Demo Day","Team Formation Night","Free Meals Included"], contact:"92300444000", tags:["Seed Funding","54 Hours","Mentorship"] },
  { id:5, title:"Photography Walk KP", date:"May 10, 2025", time:"7:00 AM – 1:00 PM", venue:"Gor Khatri Heritage Site, Old City Peshawar", seats:18, totalSeats:50, category:"Arts", price:"PKR 300", color:"#1a3a4a", emoji:"📸", organizer:"Lens KP — Photography Collective", deadline:"May 7, 2025", description:"A guided photography walk through the historic streets and monuments of Old Peshawar — from Qissa Khwani Bazaar to the Mahabat Khan Mosque. Led by professional photographers, participants learn street and architectural photography.", highlights:["Professional Photo Guide","Historic Locations","Post-processing Workshop","Photo Competition","Printed Certificate","Exhibition Opportunity"], contact:"92300555000", tags:["Heritage","Limited Slots","Workshop"] },
  { id:6, title:"AI & ML Workshop", date:"May 20, 2025", time:"10:00 AM – 4:00 PM", venue:"IMSciences, Phase 7, Hayatabad", seats:22, totalSeats:60, category:"Tech", price:"PKR 800", color:"#2d1a5c", emoji:"🤖", organizer:"IMSciences — Tech & Innovation Club", deadline:"May 15, 2025", description:"A hands-on full-day workshop covering the fundamentals of Artificial Intelligence and Machine Learning with Python. Participants build their own image classifier and NLP model. Laptop required. Certificate provided on completion.", highlights:["Hands-on Python Coding","Build Real ML Models","Industry Trainer","Completion Certificate","Study Materials Included","LinkedIn Recommendation"], contact:"92300666000", tags:["Certificate","Hands-on","Laptop Required"] },
];

const STUDY_GROUPS = [
  { id:1, subject:"Data Structures & Algorithms", uni:"UET Peshawar", emoji:"🌲", color:"#0a5c44", members:8, maxMembers:10, schedule:"Mon & Wed, 5:00 PM", location:"CS Lab, Block B", level:"Intermediate", tags:["CS","Coding","Competitive"], host:"Hamza K.", contact:"92300111001", description:"Weekly problem-solving sessions focused on LeetCode and competitive programming. We cover trees, graphs, DP and more." },
  { id:2, subject:"Organic Chemistry", uni:"University of Peshawar", emoji:"⚗️", color:"#1a4a6b", members:5, maxMembers:8, schedule:"Tue & Thu, 4:00 PM", location:"Science Block, Room 12", level:"Beginner-friendly", tags:["Chemistry","Pre-med","Sciences"], host:"Sana M.", contact:"92300222002", description:"Collaborative study sessions for organic chemistry. We make notes together, solve past papers, and quiz each other." },
  { id:3, subject:"Business Finance & Accounting", uni:"IMSciences", emoji:"📊", color:"#3a3a1a", members:6, maxMembers:8, schedule:"Sat, 10:00 AM", location:"Library, Study Room 3", level:"All levels", tags:["Finance","BBA","ACCA"], host:"Bilal A.", contact:"92300333003", description:"Finance, accounting and ACCA exam prep. We share resources, do mock tests and discuss real financial case studies." },
  { id:4, subject:"IELTS / English Prep", uni:"All Universities", emoji:"📝", color:"#5c1a3a", members:12, maxMembers:15, schedule:"Sun, 11:00 AM", location:"Qurtaba University, Seminar Hall", level:"All levels", tags:["IELTS","English","Open to All"], host:"Nadia R.", contact:"92300444004", description:"Free weekly sessions for IELTS speaking and writing practice. Open to students from all universities across Peshawar." },
  { id:5, subject:"Web Development (React & Node)", uni:"Cecos University", emoji:"💻", color:"#1a3a4a", members:7, maxMembers:10, schedule:"Fri, 3:00 PM", location:"IT Lab 2", level:"Intermediate", tags:["Web Dev","React","JavaScript"], host:"Usman T.", contact:"92300555005", description:"Hands-on full-stack development group. We build mini-projects together, review each other's code, and share job-ready skills." },
  { id:6, subject:"Mathematics (Calculus & Linear Algebra)", uni:"UET Peshawar", emoji:"📐", color:"#3d1a5c", members:9, maxMembers:12, schedule:"Mon, Wed & Fri, 6:00 PM", location:"Main Block, Room 7", level:"All levels", tags:["Math","Engineering","Science"], host:"Zara N.", contact:"92300666006", description:"Engineering math made simple. We work through past papers, solve problems together and clarify tricky concepts." },
];

const JOBS = [
  { id:1, title:"Frontend Developer Intern", company:"TechKP Studio", emoji:"🖥️", color:"#0a5c44", type:"Internship", stipend:"PKR 15,000/mo", location:"Hayatabad Phase 5", duration:"3 months", deadline:"April 10, 2025", tags:["React","CSS","Remote-friendly"], description:"Join a growing Peshawar-based tech startup as a frontend intern. Work on real client projects in React. Flexible hours for students.", requirements:["2nd year CS/IT student","Basic HTML/CSS/JS","Portfolio preferred"], contact:"92300101010" },
  { id:2, title:"Event Coordinator Assistant", company:"EventSync Peshawar", emoji:"🎪", color:"#c9a84c", type:"Part-time", stipend:"PKR 8,000/mo", location:"University Road", duration:"Ongoing", deadline:"April 5, 2025", tags:["Events","Communication","Flexible Hours"], description:"Help coordinate venue bookings and client follow-ups. Great for students who want real event management experience.", requirements:["Any degree","Good communication","Available weekends"], contact:"92300202020" },
  { id:3, title:"Research Assistant — Social Sciences", company:"University of Peshawar", emoji:"🔬", color:"#1a4a6b", type:"Campus Job", stipend:"PKR 5,000/mo", location:"UoP Campus", duration:"6 months", deadline:"March 30, 2025", tags:["Research","Data","Academic Credit"], description:"Assist faculty with qualitative research, data collection and report writing. Academic credit available alongside stipend.", requirements:["Social sciences student","Strong writing skills","3rd or 4th year"], contact:"92300303030" },
  { id:4, title:"Graphic Design Intern", company:"Noor Media Agency", emoji:"🎨", color:"#5c1a1a", type:"Internship", stipend:"PKR 10,000/mo", location:"Saddar, Peshawar (Hybrid)", duration:"2 months", deadline:"April 15, 2025", tags:["Figma","Adobe","Creative"], description:"Design social media content, branding materials and event visuals for Peshawar clients. Portfolio building opportunity.", requirements:["Design background","Figma or Adobe skills","Portfolio required"], contact:"92300404040" },
  { id:5, title:"Campus Brand Ambassador", company:"Daraz Pakistan", emoji:"📦", color:"#f57224", type:"Commission", stipend:"Commission-based", location:"Your University", duration:"Ongoing", deadline:"Open", tags:["Marketing","Flexible","All Unis"], description:"Represent Daraz on your campus. Promote campaigns, onboard sellers and earn per referral. Set your own schedule.", requirements:["Any university student","Social & outgoing","Smartphone required"], contact:"92300505050" },
  { id:6, title:"IT Support Technician", company:"Cecos University", emoji:"🛠️", color:"#1a3a4a", type:"Campus Job", stipend:"PKR 6,000/mo", location:"Cecos University, Hayatabad", duration:"Semester-long", deadline:"April 1, 2025", tags:["IT","Hardware","Networking"], description:"Maintain campus IT infrastructure, assist in labs and support faculty with tech. Ideal for CS/IT students wanting hands-on experience.", requirements:["CS/IT/EE student","Basic networking knowledge","Available 4 hrs/day"], contact:"92300606060" },
];

// ─── Shared Components ────────────────────────────────────────────────────────
const StarRating = ({ rating }) => (
  <div style={{ display:"flex", alignItems:"center", gap:4 }}>
    {[1,2,3,4,5].map(s => <span key={s} style={{ color: s<=rating ? C.gold : "#ddd", fontSize:14 }}>★</span>)}
    <span style={{ fontSize:11, color:"#888", marginLeft:4, fontWeight:500 }}>({rating}.0)</span>
  </div>
);

const WhatsAppIcon = ({ size=18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const GoldDivider = () => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, margin:"8px 0" }}>
    <div style={{ height:1, width:48, background:C.gold, opacity:0.4 }} />
    <span style={{ color:C.gold, fontSize:14 }}>✦</span>
    <div style={{ height:1, width:48, background:C.gold, opacity:0.4 }} />
  </div>
);

const SectionLabel = ({ children }) => (
  <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.gold, marginBottom:4 }}>{children}</p>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = ({ page, setPage }) => {
  const links = ["Home","Venues","Events","Students"];
  return (
    <nav style={{ position:"sticky", top:0, zIndex:50, backgroundColor:C.emeraldDark, borderBottom:"1px solid rgba(201,168,76,0.2)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 32px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <button onClick={() => setPage("Home")} style={{ display:"flex", alignItems:"center", gap:10, background:"none", border:"none", cursor:"pointer" }}>
          <div style={{ width:36, height:36, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:17, background:`linear-gradient(135deg,${C.gold},${C.goldLight})`, color:C.emeraldDark, fontFamily:"'Playfair Display',serif" }}>E</div>
          <div>
            <div style={{ fontSize:19, fontWeight:700, color:"white", lineHeight:1, fontFamily:"'Playfair Display',serif" }}>EventSync</div>
            <div style={{ fontSize:8, color:"rgba(255,255,255,0.45)", letterSpacing:"0.18em" }}>PESHAWAR</div>
          </div>
        </button>
        <div style={{ display:"flex", alignItems:"center", gap:32 }}>
          {links.map(l => (
            <button key={l} onClick={() => setPage(l)} style={{ fontSize:13, fontWeight:500, color: page===l ? C.goldLight : "rgba(255,255,255,0.68)", background:"none", border:"none", cursor:"pointer", padding:"4px 0" }}>{l}</button>
          ))}
        </div>
        <button style={{ fontSize:13, fontWeight:700, padding:"9px 18px", borderRadius:10, background:`linear-gradient(135deg,${C.gold},${C.goldLight})`, color:C.emeraldDark, border:"none", cursor:"pointer" }}>
          List Your Venue
        </button>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer style={{ textAlign:"center", padding:"44px 32px", backgroundColor:C.emeraldDark, borderTop:"1px solid rgba(201,168,76,0.2)" }}>
    <div style={{ fontSize:22, fontWeight:700, color:"white", marginBottom:8, fontFamily:"'Playfair Display',serif" }}>
      EventSync <span style={{ color:C.gold }}>Peshawar</span>
    </div>
    <p style={{ fontSize:13, color:"rgba(255,255,255,0.45)", marginBottom:16 }}>Connecting Peshawar's finest venues with the people who matter most.</p>
    <div style={{ height:2, maxWidth:200, margin:"0 auto 16px", background:`linear-gradient(90deg,transparent,${C.gold},${C.goldLight},${C.gold},transparent)` }} />
    <p style={{ fontSize:11, color:"rgba(255,255,255,0.28)" }}>© 2025 EventSync. Built with ❤️ for Peshawar.</p>
  </footer>
);

const FloatingWhatsApp = () => (
  <button onClick={() => window.open("https://wa.me/92300000000","_blank")}
    style={{ position:"fixed", bottom:28, right:28, width:56, height:56, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", zIndex:50, background:"#25D366", boxShadow:"0 6px 24px rgba(37,211,102,0.45)", color:"white", border:"none", cursor:"pointer" }}>
    <WhatsAppIcon size={26} />
  </button>
);

// ─── Panorama ─────────────────────────────────────────────────────────────────
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

// ═══════════════════════════════════════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════════════════════════════════════
const HomePage = ({ setPage, setSelectedVenue }) => {
  const [search, setSearch] = useState("");
  const categories = [
    { icon:"💍", label:"Weddings", count:"180+ Venues" },
    { icon:"🎓", label:"University Events", count:"40+ Events" },
    { icon:"💡", label:"Workshops", count:"60+ Events" },
    { icon:"🎂", label:"Birthdays", count:"90+ Venues" },
  ];
  return (
    <div className="fade-in">
      <section style={{ background:`linear-gradient(155deg,${C.emeraldDark} 0%,${C.emerald} 55%,${C.emeraldLight} 100%)`, position:"relative", overflow:"hidden", padding:"72px 32px 80px" }}>
        <svg style={{ position:"absolute", top:-20, right:-20, opacity:0.08, pointerEvents:"none" }} width="320" height="320" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="190" stroke="white" strokeWidth="1.5"/>
          <circle cx="200" cy="200" r="140" stroke="#c9a84c" strokeWidth="0.8"/>
          <polygon points="200,20 380,200 200,380 20,200" stroke="white" strokeWidth="0.8" fill="none"/>
        </svg>
        <div style={{ maxWidth:720, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, borderRadius:50, padding:"7px 16px", marginBottom:24, fontSize:13, fontWeight:500, background:"rgba(255,255,255,0.1)", border:`1px solid rgba(201,168,76,0.4)`, color:C.goldLight }}>
            <span>✦</span> AI-Powered Planning — Coming Soon
            <span style={{ background:C.gold, color:C.emeraldDark, fontSize:10, fontWeight:800, padding:"2px 8px", borderRadius:20, marginLeft:4 }}>NEW</span>
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(34px,5vw,58px)", fontWeight:900, color:"white", lineHeight:1.18, marginBottom:16 }}>
            Plan Your Perfect<br /><span style={{ color:C.goldLight }}>Event in Peshawar</span>
          </h1>
          <p style={{ fontSize:15, lineHeight:1.75, color:"rgba(255,255,255,0.7)", maxWidth:480, margin:"0 auto 36px" }}>
            From grand weddings to intimate gatherings — discover and book the finest event spaces across KP with complete transparency.
          </p>
          <div style={{ display:"flex", background:"white", borderRadius:14, overflow:"hidden", boxShadow:"0 8px 40px rgba(0,0,0,0.2)", maxWidth:640, margin:"0 auto" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, padding:"0 16px", borderRight:"1px solid #f0f0f0", flex:1, minWidth:0 }}>
              <span style={{ fontSize:18, opacity:0.4, flexShrink:0 }}>🔍</span>
              <input style={{ width:"100%", border:"none", outline:"none", fontSize:13, color:"#333", background:"transparent", padding:"14px 0" }} placeholder="Search halls, venues or locations..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"0 16px", borderRight:"1px solid #f0f0f0", flexShrink:0 }}>
              <span style={{ fontSize:16, opacity:0.4 }}>📍</span>
              <input style={{ width:110, border:"none", outline:"none", fontSize:13, color:"#555", background:"transparent", padding:"14px 0" }} placeholder="Peshawar, KP" />
            </div>
            <button style={{ padding:"14px 22px", fontSize:13, fontWeight:700, color:"white", background:`linear-gradient(135deg,${C.emerald},${C.emeraldDark})`, border:"none", cursor:"pointer", flexShrink:0 }} onClick={() => setPage("Venues")}>Search</button>
          </div>
          <div style={{ display:"flex", justifyContent:"center", marginTop:36 }}>
            {[{n:"340+",l:"Verified Venues"},{n:"12K+",l:"Events Planned"},{n:"4.9★",l:"Avg Rating"}].map((s,i) => (
              <div key={s.l} style={{ textAlign:"center", padding:"0 28px", borderLeft: i>0?"1px solid rgba(255,255,255,0.15)":"none" }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:C.goldLight }}>{s.n}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", marginTop:3 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div style={{ height:3, background:`linear-gradient(90deg,transparent,${C.gold},${C.goldLight},${C.gold},transparent)` }} />
      <section style={{ padding:"64px 32px", backgroundColor:C.cream }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:44 }}>
            <SectionLabel>Browse by Type</SectionLabel>
            <GoldDivider />
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(26px,3.5vw,38px)", fontWeight:900, color:C.emeraldDark }}>What Are You Planning?</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:18 }}>
            {categories.map(cat => (
              <button key={cat.label} onClick={() => setPage("Venues")} className="card-hover"
                style={{ background:"white", borderRadius:18, padding:"28px 16px", textAlign:"center", border:"1.5px solid transparent", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", cursor:"pointer" }}>
                <div style={{ fontSize:36, marginBottom:12 }}>{cat.icon}</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:16, color:C.emeraldDark, marginBottom:4 }}>{cat.label}</div>
                <div style={{ fontSize:12, fontWeight:500, color:"#888" }}>{cat.count}</div>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding:"64px 32px", backgroundColor:"#f5f0e8" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:36, flexWrap:"wrap", gap:12 }}>
            <div>
              <SectionLabel>Top Rated</SectionLabel>
              <GoldDivider />
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(26px,3.5vw,38px)", fontWeight:900, color:C.emeraldDark }}>Featured Venues</h2>
            </div>
            <button onClick={() => setPage("Venues")} style={{ fontSize:13, fontWeight:600, padding:"8px 18px", borderRadius:10, border:`2px solid ${C.emerald}`, color:C.emerald, background:"transparent", cursor:"pointer" }}>View All Venues →</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
            {VENUES.map(v => (
              <div key={v.id} className="card-hover" style={{ background:"white", borderRadius:18, overflow:"hidden", cursor:"pointer", boxShadow:"0 2px 16px rgba(0,0,0,0.07)", display:"flex", flexDirection:"column" }}
                onClick={() => { setSelectedVenue(v); setPage("VenueDetail"); }}>
                <div style={{ height:148, position:"relative", display:"flex", alignItems:"center", justifyContent:"center", background:`linear-gradient(135deg,${v.color},${v.color}99)` }}>
                  <div style={{ textAlign:"center", position:"relative", zIndex:1 }}>
                    <div style={{ fontSize:38 }}>{v.emoji}</div>
                    <div style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.6)", marginTop:4 }}>🔭 360° Tour</div>
                  </div>
                  <div style={{ position:"absolute", top:10, left:10, fontSize:10, fontWeight:800, padding:"3px 9px", borderRadius:20, background:`linear-gradient(135deg,${C.gold},${C.goldLight})`, color:C.emeraldDark }}>{v.tag}</div>
                </div>
                <div style={{ padding:"14px 16px 16px", flex:1, display:"flex", flexDirection:"column" }}>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:15, fontWeight:700, color:C.emeraldDark, marginBottom:4, lineHeight:1.3 }}>{v.name}</h3>
                  <p style={{ fontSize:11, color:"#888", marginBottom:8 }}>📍 {v.location}</p>
                  <StarRating rating={v.rating} />
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:10 }}>
                    <span style={{ fontSize:11, fontWeight:700, padding:"3px 9px", borderRadius:20, background:"rgba(10,92,68,0.08)", color:C.emeraldDark }}>PKR {v.price}</span>
                    <span style={{ fontSize:11, color:"#999" }}>👥 {v.capacity}</span>
                  </div>
                  <button style={{ marginTop:12, width:"100%", padding:10, borderRadius:10, fontSize:12, fontWeight:700, color:"white", background:`linear-gradient(135deg,${C.emerald},${C.emeraldDark})`, border:"none", cursor:"pointer" }}>View & Tour</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// VENUES LIST
// ═══════════════════════════════════════════════════════════════════════════════
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
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20 }}>
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

// ═══════════════════════════════════════════════════════════════════════════════
// VENUE DETAIL
// ═══════════════════════════════════════════════════════════════════════════════
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
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px", display:"grid", gridTemplateColumns:"1fr 320px", gap:28, alignItems:"start" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
          <PanoramaViewer venue={venue} />
          <div style={{ background:"white", borderRadius:16, padding:24, boxShadow:"0 2px 16px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, color:C.emeraldDark, marginBottom:10 }}>About This Venue</h2>
            <p style={{ fontSize:13, lineHeight:1.75, color:"#555" }}>{venue.description}</p>
          </div>
          <div style={{ background:"white", borderRadius:16, padding:24, boxShadow:"0 2px 16px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, color:C.emeraldDark, marginBottom:16 }}>Amenities & Features</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
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

// ═══════════════════════════════════════════════════════════════════════════════
// EVENTS
// ═══════════════════════════════════════════════════════════════════════════════
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
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
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

// ═══════════════════════════════════════════════════════════════════════════════
// STUDENTS — Study Groups & Jobs
// ═══════════════════════════════════════════════════════════════════════════════
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

const StudentsPage = ({ setPage }) => {
  const [tab, setTab] = useState("groups");
  const [groupFilter, setGroupFilter] = useState("All");
  const [jobFilter, setJobFilter] = useState("All");
  const groupSubjects = ["All","CS","Math","Chemistry","Finance","IELTS","Web Dev"];
  const jobTypes = ["All","Internship","Part-time","Campus Job","Commission"];
  const filteredGroups = STUDY_GROUPS.filter(g => groupFilter==="All" || g.tags.some(t => t.toLowerCase().includes(groupFilter.toLowerCase())));
  const filteredJobs = JOBS.filter(j => jobFilter==="All" || j.type===jobFilter);

  return (
    <div className="fade-in" style={{ minHeight:"100vh", backgroundColor:C.cream }}>
      {/* Hero */}
      <div style={{ position:"relative", overflow:"hidden", padding:"64px 32px", textAlign:"center", background:`linear-gradient(160deg,${C.emeraldDark} 0%,#0d4a34 60%,${C.emerald} 100%)` }}>
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
          <div style={{ display:"flex", justifyContent:"center" }}>
            {[{n:`${STUDY_GROUPS.length}`,l:"Study Groups"},{n:`${JOBS.length}`,l:"Open Positions"},{n:"6",l:"Universities"}].map((s,i) => (
              <div key={s.l} style={{ textAlign:"center", padding:"0 28px", borderLeft: i>0?"1px solid rgba(255,255,255,0.15)":"none" }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700, color:C.goldLight }}>{s.n}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", marginTop:3 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ height:2, background:`linear-gradient(90deg,transparent,${C.gold},${C.goldLight},${C.gold},transparent)` }} />

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"40px 32px" }}>
        {/* Tab switcher */}
        <div style={{ display:"flex", gap:12, marginBottom:36, padding:6, borderRadius:16, background:"rgba(10,92,68,0.06)" }}>
          {[{key:"groups",label:`📚 Study Groups (${STUDY_GROUPS.length})`},{key:"jobs",label:`💼 Jobs & Internships (${JOBS.length})`}].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ flex:1, padding:"12px", fontSize:13, fontWeight:700, borderRadius:12, border:"none", cursor:"pointer", transition:"all 0.2s", background: tab===t.key?C.emerald:"white", color: tab===t.key?"white":C.emerald, boxShadow: tab===t.key?`0 4px 16px ${C.emerald}44`:"none", outline: tab===t.key?"none":`1.5px solid rgba(10,92,68,0.2)` }}>
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
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20, marginBottom:32 }}>
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
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20, marginBottom:32 }}>
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

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("Home");
  const [selectedVenue, setSelectedVenue] = useState(null);
  useEffect(() => { window.scrollTo({ top:0, behavior:"smooth" }); }, [page]);
  const renderPage = () => {
    switch(page) {
      case "Home":        return <HomePage setPage={setPage} setSelectedVenue={setSelectedVenue} />;
      case "Venues":      return <VenuesPage setPage={setPage} setSelectedVenue={setSelectedVenue} />;
      case "VenueDetail": return <VenueDetailPage venue={selectedVenue} setPage={setPage} />;
      case "Events":      return <EventsPage />;
      case "Students":    return <StudentsPage setPage={setPage} />;
      default:            return <HomePage setPage={setPage} setSelectedVenue={setSelectedVenue} />;
    }
  };
  return (
    <>
      <FontLoader />
      <div style={{ minHeight:"100vh", backgroundColor:C.cream }}>
        <Navbar page={page} setPage={setPage} />
        {renderPage()}
        <Footer />
        <FloatingWhatsApp />
      </div>
    </>
  );
} 