import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import Navbar from './components/Navbar';
import AppRoutes from './routes/routes';

import { AppStateProvider } from './contexts/AppStateContext';
const App: React.FC = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <AppStateProvider >
      <Router>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="max-w-[1080] max-h-[1920] w-full h-auto bg-white shadow-xl overflow-hidden">
            <div className={`fixed bottom-2 right-0 z-50 ${isNavbarOpen ? 'hidden' : 'block'}`}>
              <button
                className="mr-4 mt-4 text-2xl text-blue-600"
                onClick={() => setIsNavbarOpen(!isNavbarOpen)}
              >
                <FiMenu />
              </button>
            </div>
            <Navbar isOpen={isNavbarOpen} setIsOpen={setIsNavbarOpen} />
            <AppRoutes />
          </div>
        </div>
      </Router>
    </AppStateProvider >
  );
};

export default App;
