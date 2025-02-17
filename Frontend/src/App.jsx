import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Dashboard from './components/Dashboard';
import FlashcardCreator from './components/FlashcardCreator';
import ReviewFlashcards from './components/ReviewFlashcards';
import AllFlashcards from './components/AllFlashcards';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<FlashcardCreator />} />
            <Route path="/review" element={<ReviewFlashcards />} />
            <Route path="/all" element={<AllFlashcards />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;