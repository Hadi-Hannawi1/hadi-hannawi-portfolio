import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
            </>
          } />
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;