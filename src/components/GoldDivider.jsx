import C from '../constants/theme.js';

const GoldDivider = () => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, margin:"8px 0" }}>
    <div style={{ height:1, width:48, background:C.gold, opacity:0.4 }} />
    <span style={{ color:C.gold, fontSize:14 }}>✦</span>
    <div style={{ height:1, width:48, background:C.gold, opacity:0.4 }} />
  </div>
);

export default GoldDivider;