import WhatsAppIcon from './WhatsAppIcon.jsx';

const FloatingWhatsApp = () => (
  <button onClick={() => window.open("https://wa.me/92300000000","_blank")}
    style={{ position:"fixed", bottom:28, right:28, width:56, height:56, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", zIndex:50, background:"#25D366", boxShadow:"0 6px 24px rgba(37,211,102,0.45)", color:"white", border:"none", cursor:"pointer" }}>
    <WhatsAppIcon size={26} />
  </button>
);

export default FloatingWhatsApp;