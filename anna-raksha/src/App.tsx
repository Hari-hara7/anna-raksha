import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import DonorPage from './components/DonorPage';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Footer from './components/Footer';
import MapDisplay from './components/MapDisplay';
import RequestPage from './components/RequestPage';
import RequestsHistoryPage from './components/RequestsHistoryPage';
import ChatBot from './components/ChatBot';
import FeedbackForm from './components/FeedbackForm';

import FoodRequestsFeed from './components/FoodRequestsFeed'; 
import NotificationsPage from './components/NotificationsPage';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Toaster position="top-right" reverseOrder={false} />

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/donor" element={<DonorPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/map" element={<MapDisplay />} />
            <Route path="/requestPage" element={<RequestPage />} />
            <Route path="/requestsHistory" element={<RequestsHistoryPage />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/foodfeed" element={<FoodRequestsFeed />} /> 
            <Route path="/feedbackform" element={<FeedbackForm />} /> 
           
            <Route path="/notifications" element={<NotificationsPage />} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
