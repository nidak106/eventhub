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
    ::-webkit-scrollbar-thumb { background: #c9a84c; border-radius: 4px; }
  `}</style>
);

export default FontLoader;