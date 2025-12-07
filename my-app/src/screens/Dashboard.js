import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loadGoogleMaps = () => {
      const existingScript = document.getElementById('googleMaps');

      if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
        script.id = 'googleMaps';
        script.async = true;
        script.defer = true;
        script.onload = initMap;
        document.body.appendChild(script);
      } else {
        initMap();
      }
    };

    const initMap = () => {
      if (window.google && mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 53.3498, lng: -6.2603 },
          zoom: 12,
        });

        new window.google.maps.Marker({
          position: { lat: 53.3498, lng: -6.2603 },
          map,
          title: 'You are here!',
        });
      }
    };

    loadGoogleMaps();
  }, []);

  const handleStartSearch = () => {
    navigate('/searching');
  };

  const handleProfile = () => {
    navigate('/Profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/Login');
  };

  return (
    <div className="dashboard-container">
      
      {/* ✅ NAVBAR */}
      <nav className="navbar">
        <div className="navbar-left">
          <button 
            className="menu-btn" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {menuOpen && (
            <div className="dropdown-menu">
              <button onClick={() => navigate('/Dashboard')}>Dashboard</button>
              <button onClick={() => navigate('/Profile')}>Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>

        <div className="navbar-center">
          <img src="/logo.png" alt="Logo" className="navbar-logo" />
        </div>

        <div className="navbar-right">
          <img 
            src="/profile.png" 
            alt="Profile" 
            className="profile-icon"
            onClick={handleProfile}
          />
        </div>
      </nav>

      {/* Map */}
      <div ref={mapRef} className="map-container"></div>

      {/* Button */}
      <button className="start-button" onClick={handleStartSearch}>
        Start Searching
      </button>
    </div>
  );
}

export default Dashboard;
