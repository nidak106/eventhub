import C from '../constants/theme.js';

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

export default Footer;