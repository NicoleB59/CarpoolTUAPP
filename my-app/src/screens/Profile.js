import React, { useEffect, useState } from 'react';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);

  // TEMP: replace this later with real logged-in user data
  useEffect(() => {
    // Mock user data (for now)
    setUser({
      name: 'John',
      surname: 'Doe',
      email: 'john@example.com',
      phone: '0871234567',
    });
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="profile-card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Surname:</strong> {user.surname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>
    </div>
  );
}

export default Profile;
