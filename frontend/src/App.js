import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import RegisterDonor from './pages/RegisterDonor.jsx';
import DonorDashboard from './pages/DonorDashboard.jsx';
import DonationHistory from './pages/DonationHistory.jsx';
import NgoDashboard from './pages/NgoDashboard.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return React.createElement('div', { className: 'app-shell' },
    React.createElement(Navbar),
    React.createElement('main', null,
      React.createElement(Routes, null,
        React.createElement(Route, { path: '/', element: React.createElement(Home) }),
        React.createElement(Route, { path: '/register', element: React.createElement(RegisterDonor) }),
        React.createElement(Route, { path: '/donor-dashboard', element: React.createElement(DonorDashboard) }),
        React.createElement(Route, { path: '/donation-history', element: React.createElement(DonationHistory) }),
        React.createElement(Route, { path: '/ngo-dashboard', element: React.createElement(NgoDashboard) }),
        React.createElement(Route, { path: '*', element: React.createElement(NotFound) }),
      ),
    ),
  );
}

export default App;
