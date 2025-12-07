import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login'; // path to your Login page
import Register from './screens/Register'; // path to your Register page
import Dashboard from './screens/Dashboard'; // path to your Dashboard page
import Searching from './screens/Searching'; // path to your Searching page
import Profile from './screens/Profile'; // path to your Profile page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/searching" element={<Searching />} />
      </Routes>
    </Router>
  );
}

export default App;
