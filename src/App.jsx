import { useState, useEffect } from "react";
import FontLoader from './components/FontLoader.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import HomePage from './pages/HomePage.jsx';
import VenuesPage from './pages/VenuesPage.jsx';
import VenueDetail from './pages/VenueDetail.jsx';
import EventsPage from './pages/EventsPage.jsx';
import StudentsPage from './pages/StudentsPage.jsx';
import C from './constants/theme.js';

function App() {
  const [page, setPage] = useState("Home");
  const [selectedVenue, setSelectedVenue] = useState(null);
  useEffect(() => { window.scrollTo({ top:0, behavior:"smooth" }); }, [page]);
  const renderPage = () => {
    switch(page) {
      case "Home":        return <HomePage setPage={setPage} setSelectedVenue={setSelectedVenue} />;
      case "Venues":      return <VenuesPage setPage={setPage} setSelectedVenue={setSelectedVenue} />;
      case "VenueDetail": return <VenueDetail venue={selectedVenue} setPage={setPage} />;
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

export default App;
