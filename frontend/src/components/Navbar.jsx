import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/register', label: 'Register Donor' },
  { to: '/donor-dashboard', label: 'Donor Dashboard' },
  { to: '/donation-history', label: 'Donation History' },
  { to: '/ngo-dashboard', label: 'NGO Dashboard' },
];

function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <NavLink className="brand" to="/">Kindred</NavLink>
        <div className="nav-links">
          {links.map(({ to, label, end }) => (
            <NavLink key={to} className="nav-link" to={to} end={end}>{label}</NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
