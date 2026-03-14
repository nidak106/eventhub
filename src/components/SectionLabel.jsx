import C from '../constants/theme.js';

const SectionLabel = ({ children }) => (
  <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.gold, marginBottom:4 }}>{children}</p>
);

export default SectionLabel;