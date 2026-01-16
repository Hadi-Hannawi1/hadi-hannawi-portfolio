import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin';

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
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;