import C from '../constants/theme.js';

const StarRating = ({ rating }) => (
  <div style={{ display:"flex", alignItems:"center", gap:4 }}>
    {[1,2,3,4,5].map(s => <span key={s} style={{ color: s<=rating ? C.gold : "#ddd", fontSize:14 }}>★</span>)}
    <span style={{ fontSize:11, color:"#888", marginLeft:4, fontWeight:500 }}>({rating}.0)</span>
  </div>
);

export default StarRating;