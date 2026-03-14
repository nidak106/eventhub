import { useState } from "react";
import C from '../constants/theme.js';
import VENUES from '../data/venues.js';
import StarRating from '../components/StarRating.jsx';
import SectionLabel from '../components/SectionLabel.jsx';
import GoldDivider from '../components/GoldDivider.jsx';

const HomePage = ({ setPage, setSelectedVenue }) => {
  const [search, setSearch] = useState("");

  const categories = [
    { label: "Weddings", count: "180+ Venues", img: "/wedding-bg.jpg", icon: "💍" },
    { label: "University Events", count: "40+ Events", img: "/uni-bg.jpg", icon: "🎓" },
    { label: "Workshops", count: "60+ Events", img: "/workshop-bg.jpg", icon: "💡" },
    { label: "Birthdays", count: "90+ Venues", img: "/birthday-bg.jpg", icon: "🎂" },
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

      {/* --- CATEGORIES SECTION: Full Rectangles with Reveal Effect --- */}
      <section style={{ padding: "80px 20px", backgroundColor: C.cream }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="text-center mb-12">
            <SectionLabel>Browse by Type</SectionLabel>
            <div className="flex justify-center my-4"><GoldDivider center /></div>
            <h2 style={{ fontFamily: "'Playfair Display',serif" }} className="text-4xl md:text-5xl font-black text-[#0a5c44]">
              What Are You Planning?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setPage("Venues")}
                className="group relative h-80 w-full overflow-hidden shadow-lg border-none cursor-pointer p-0 m-0 transition-transform duration-500 hover:-translate-y-2"
                style={{ borderRadius: 0 }} // Forced sharp rectangle
              >
                {/* Background Image with Zoom */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${cat.img})` }}
                />

                {/* The "Reveal" Green Overlay */}
                <div className="absolute inset-0 bg-[#0a5c44] opacity-70 transition-opacity duration-500 group-hover:opacity-0 z-10" />

                {/* Content */}
                <div className="relative z-20 h-full flex flex-col items-center justify-center text-white text-center">
                  <div className="text-6xl mb-4 transition-transform duration-500 group-hover:scale-75">
                    {cat.icon}
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif" }} className="text-3xl font-bold">
                    {cat.label}
                  </h3>
                  <div className="mt-4 px-5 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold border border-white/30 group-hover:bg-white group-hover:text-[#0a5c44] transition-colors">
                    {cat.count}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED VENUES SECTION --- */}
      <section style={{ padding: "80px 32px", backgroundColor: "#fdfbf8" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="flex flex-wrap items-end justify-between gap-5 mb-10">
            <div>
              <SectionLabel>Top Rated</SectionLabel>
              <GoldDivider />
              <h2 style={{ fontFamily: "'Playfair Display',serif" }} className="text-4xl font-black text-[#0a5c44]">Featured Venues</h2>
            </div>
            <button onClick={() => setPage("Venues")} className="text-sm font-bold px-5 py-2.5 rounded-xl border-2 border-[#0a5c44] text-[#0a5c44] bg-transparent cursor-pointer hover:bg-[#0a5c44] hover:text-white transition-all">
              View All Venues →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {VENUES.slice(0, 3).map(v => (
              <div key={v.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => { setSelectedVenue(v); setPage("VenueDetail"); }}>
                <div style={{ height: 180, background: `linear-gradient(135deg,${v.color},${v.color}cc)` }} className="relative flex items-center justify-center">
                  <div className="text-5xl">{v.emoji}</div>
                  <div className="absolute top-4 left-4 text-[10px] font-black px-3 py-1 rounded-full bg-[#c9a84c] text-[#0a5c44]">{v.tag}</div>
                </div>
                <div className="p-5">
                  <h3 style={{ fontFamily: "'Playfair Display',serif" }} className="text-lg font-bold text-[#0a5c44] mb-1">{v.name}</h3>
                  <p className="text-xs text-gray-500 mb-3">📍 {v.location}</p>
                  <StarRating rating={v.rating} />
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-extrabold text-[#0a5c44]">PKR {v.price}</span>
                    <span className="text-xs text-gray-400">👥 {v.capacity} guests</span>
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