import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./component/Dashborad";
import AdminDashboard from "./component/AdminDashboard"; // Import the AdminDashboard component
import LoginPage from "./component/LoginPage"; // Import your LoginPage component

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/Loginpage" element={<LoginPage />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
