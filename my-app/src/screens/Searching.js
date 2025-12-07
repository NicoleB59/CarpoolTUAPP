// src/screens/Searching.jsx
import React, { useEffect, useRef, useState } from 'react';
import './Searching.css';

function Searching() {
  const [leavingFrom, setLeavingFrom] = useState('');
  const [goingTo, setGoingTo] = useState('');
  const [passenger, setPassenger] = useState('');
  const [time, setTime] = useState('');
  const mapRef = useRef(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      const existingScript = document.getElementById('googleMaps');

      if (!existingScript) {
        const script = document.createElement('script');
        script.src =
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyBkM5HN7q4XcnEhfe2COWBi4uhsagNr1OM';
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
          title: 'Current Location',
        });
      }
    };

    loadGoogleMaps();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    const data = { leavingFrom, goingTo, passenger, time };

    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    alert(result.message || 'Search submitted!');
  };

  return (
    <div className="searching-container">
      {/* Google Map background */}
      <div ref={mapRef} className="map-background"></div>

      {/* Overlay Content */}
      <div className="overlay">
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-left">
            <button className="menu-btn">☰</button>
          </div>
          <div className="navbar-center">
            <img src="/logo.png" alt="Logo" className="navbar-logo" />
          </div>
          <div className="navbar-right">
            <img src="/profile.png" alt="Profile" className="profile-icon" />
          </div>
        </nav>

        {/* Form */}
        <form className="search-form" onSubmit={handleSearch}>
          <label>Leaving From</label>
          <input
            type="text"
            value={leavingFrom}
            onChange={(e) => setLeavingFrom(e.target.value)}
            required
          />

          <label>Going To</label>
          <input
            type="text"
            value={goingTo}
            onChange={(e) => setGoingTo(e.target.value)}
            required
          />

          <label>Passenger</label>
          <input
            type="number"
            value={passenger}
            onChange={(e) => setPassenger(e.target.value)}
            required
          />

          <label>Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <button type="submit" className="search-btn">Search</button>
        </form>
      </div>
    </div>
  );
}

export default Searching;
