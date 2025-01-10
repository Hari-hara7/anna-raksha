import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import DonorPage from './components/DonorPage';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/donor" element={<DonorPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
        <Footer /> {/* Add Footer here */}
      </Router>
    </AuthProvider>
  );
};

export default App;
