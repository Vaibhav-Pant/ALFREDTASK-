import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };
  
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-semibold">Leitner Flashcards</span>
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/')}`}
            >
              Dashboard
            </Link>
            <Link
              to="/create"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/create')}`}
            >
              Create
            </Link>
            <Link
              to="/review"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/review')}`}
            >
              Review
            </Link>
            <Link
              to="/all"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/all')}`}
            >
              All Cards
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;