import { useState } from "react";
import C from '../constants/theme.js';
import VENUES from '../data/venues.js';
import StarRating from '../components/StarRating.jsx';
import SectionLabel from '../components/SectionLabel.jsx';
import GoldDivider from '../components/GoldDivider.jsx';

const HomePage = ({ setPage, setSelectedVenue }) => {
  const [search, setSearch] = useState("");

  const categories = [
    { label: "Weddings", count: "180+ Venues", img: "/wedding-bg.jpg" },
    { label: "University Events", count: "40+ Events", img: "/uni-bg.jpg"},
    { label: "Workshops", count: "60+ Events", img: "/workshop-bg.jpg"},
    { label: "Birthdays", count: "90+ Venues", img: "/birthday-bg.jpg"},
  ];

  return (
    <div className="fade-in">
      {/* --- HERO SECTION --- */}
      <section style={{
        position: "relative",
        minHeight: "680px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 20px",
        backgroundImage: `linear-gradient(rgba(10, 92, 68, 0.45), rgba(10, 92, 68, 0.55)), url('/bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "left"
      }}>
        <div style={{ maxWidth: 1100, width: "100%", color: "white", padding: "0 40px" }}>
          <h1 style={{
            fontSize: "clamp(48px, 8vw, 72px)",
            fontWeight: 800,
            margin: 0,
            lineHeight: 1,
            letterSpacing: "-1px"
          }}>
            EventSync
          </h1>

          <p style={{
            fontSize: "clamp(22px, 4vw, 30px)",
            fontWeight: 400,
            margin: "15px 0 45px",
            lineHeight: 1.2,
            opacity: 0.9
          }}>
            Seamless Events.<br />Unforgettable Experiences.
          </p>
<div className="w-full max-w-[650px] mt-8">
  <div className="flex flex-col md:flex-row gap-3 w-full items-stretch">
    
    {/* Input Wrapper - Controlled height for Desktop */}
    <div className="relative flex-[3] bg-white rounded-full flex items-center shadow-lg border border-gray-100 h-[90px] md:h-[50px]">
      <span className="pl-6 text-xl text-gray-400">🔍</span>
      <input
        className="w-full border-none outline-none px-4 text-base md:text-lg text-gray-800 bg-transparent rounded-full"
        placeholder="Search venues & locations..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {/* Button - Exactly matches the input height */}
    <button
      onClick={() => setPage("Venues")}
      style={{ 
        backgroundColor: '#177f5f',
        borderColor: '#0a5c44',
        color: 'white' 
      }}
      className="flex-1 px-8 rounded-full font-bold text-sm md:text-base cursor-pointer transition-all duration-300 hover:bg-white hover:text-[#0a5c44] hover:border-[#0a5c44] active:scale-95 whitespace-nowrap shadow-lg border-2 h-[60px] md:h-[50px]"
    >
      Search
    </button>
  </div> 
</div>
          <div style={{ marginTop: "25px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ color: "#FFD700", fontSize: "18px" }}>★★★★☆</span>
            <span style={{ fontSize: "14px", opacity: 0.8, fontWeight: 500 }}>based on 500+ reviews</span>
          </div>
        </div>
      </section>

      <div style={{ height: 3, background: `linear-gradient(90deg,transparent,${C.gold},${C.goldLight},${C.gold},transparent)` }} />

{/* --- CATEGORIES SECTION --- */}
<section style={{ padding: "80px 20px", backgroundColor: C.cream }}>
  <div style={{ maxWidth: 1200, margin: "0 auto" }}>
    <div style={{ textAlign: "center", marginBottom: 60 }}>
      <SectionLabel>Browse by Type</SectionLabel>
      <GoldDivider center />
      <h2 style={{ 
        fontFamily: "'Playfair Display',serif", 
        fontSize: "clamp(32px, 5vw, 48px)", 
        fontWeight: 900, 
        color: C.emeraldDark, 
        marginTop: 15 
      }}>
        What Are You Planning?
      </h2>
    </div>

    <div style={{ 
      display: "grid", 
      // This creates 2 columns on desktop and 1 column on mobile
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 500px), 1fr))", 
      gap: "30px" 
    }}>
      {categories.map((cat, index) => {
        // Local state for hover effect on each card
        const [isHovered, setIsHovered] = useState(false);

        return (
          <button 
            key={cat.label} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setPage("Venues")} 
            style={{
              position: "relative",
              height: "320px", // Increased height for a substantial rectangle feel
              borderRadius: "24px",
              overflow: "hidden",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              transform: isHovered ? "translateY(-8px)" : "translateY(0)",
              boxShadow: isHovered 
                ? "0 20px 40px rgba(0,0,0,0.2)" 
                : "0 10px 20px rgba(0,0,0,0.08)"
            }}
          >
            {/* Background Image with Zoom Effect */}
            <div style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${cat.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "transform 0.6s ease",
              transform: isHovered ? "scale(1.1)" : "scale(1)"
            }} />
            
            {/* The "Reveal" Overlay */}
            <div style={{
              position: "absolute",
              inset: 0,
              backgroundColor: C.emeraldDark,
              // Opacity drops from 0.7 to 0 on hover to reveal true colors
              opacity: isHovered ? 0 : 0.7, 
              transition: "opacity 0.4s ease",
              zIndex: 1
            }} />

            {/* Content Container */}
            <div style={{ 
              position: "relative", 
              zIndex: 2, 
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              textShadow: isHovered ? "0 2px 10px rgba(0,0,0,0.5)" : "none",
              transition: "all 0.3s ease"
            }}>
              {/* Icon shrinks slightly or disappears on hover to show the image better */}
              <div style={{ 
                fontSize: "56px", 
                marginBottom: "12px",
                transform: isHovered ? "scale(0.8)" : "scale(1)",
                opacity: isHovered ? 0.8 : 1,
                transition: "all 0.4s ease"
              }}>
                {cat.icon}
              </div>

              <div style={{ 
                fontFamily: "'Playfair Display',serif", 
                fontWeight: 800, 
                fontSize: "28px", 
                letterSpacing: "0.5px"
              }}>
                {cat.label}
              </div>

              <div style={{ 
                fontSize: "14px", 
                fontWeight: 600, 
                marginTop: "8px",
                padding: "6px 16px",
                borderRadius: "50px",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(4px)"
              }}>
                {cat.count}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  </div>
</section>

   {/* --- FEATURED VENUES SECTION --- */}
      <section style={{ padding: "80px 32px", backgroundColor: "#fdfbf8" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 20 }}>
            <div>
              <SectionLabel>Top Rated</SectionLabel>
              <GoldDivider />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900, color: C.emeraldDark }}>Featured Venues</h2>
            </div>
            <button onClick={() => setPage("Venues")} style={{ fontSize: 13, fontWeight: 700, padding: "10px 20px", borderRadius: 12, border: `2px solid ${C.emerald}`, color: C.emerald, background: "transparent", cursor: "pointer" }}>View All Venues →</button>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 25 }}>
            {VENUES.slice(0, 3).map(v => (
              <div key={v.id} className="card-hover" style={{ background: "white", borderRadius: 20, overflow: "hidden", cursor: "pointer", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}
                onClick={() => { setSelectedVenue(v); setPage("VenueDetail"); }}>
                <div style={{ height: 180, background: `linear-gradient(135deg,${v.color},${v.color}cc)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <div style={{ fontSize: 50 }}>{v.emoji}</div>
                  <div style={{ position: "absolute", top: 15, left: 15, fontSize: 10, fontWeight: 900, padding: "4px 12px", borderRadius: 20, background: C.gold, color: C.emeraldDark }}>{v.tag}</div>
                </div>
                <div style={{ padding: 20 }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: C.emeraldDark, marginBottom: 5 }}>{v.name}</h3>
                  <p style={{ fontSize: 12, color: "#777", marginBottom: 10 }}>📍 {v.location}</p>
                  <StarRating rating={v.rating} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 15, alignItems: "center" }}>
                    <span style={{ fontWeight: 800, color: C.emeraldDark }}>PKR {v.price}</span>
                    <span style={{ fontSize: 12, color: "#999" }}>👥 {v.capacity} guests</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;