import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AllFlashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchAllFlashcards = async () => {
      try {
        setLoading(true);
        const cards = await api.getAllFlashcards();
        // console.log("Cards: ", cards);
        setFlashcards(cards);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch flashcards');
        setLoading(false);
        // console.error(err);
      }
    };
    
    fetchAllFlashcards();
  }, []);
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this flashcard?')) {
      try {
        await api.deleteFlashcard(id);
        setFlashcards(flashcards.filter(card => card._id !== id));
      } catch (err) {
        setError('Failed to delete flashcard');
        // console.error(err);
      }
    }
  };
  
  const getBoxColor = (box) => {
    const colors = [
      'bg-red-100 text-red-800',    // Box 1
      'bg-orange-100 text-orange-800', // Box 2
      'bg-yellow-100 text-yellow-800', // Box 3
      'bg-green-100 text-green-800',   // Box 4
      'bg-teal-100 text-teal-800',   // Box 5
      'bg-blue-100 text-blue-800',    // Box 6
      'bg-indigo-100 text-indigo-800', // Box 7
    ];
    return colors[Math.min(box - 1, colors.length - 1)];
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading flashcards...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    );
  }
  
  if (flashcards.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">All Flashcards</h1>
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-xl text-gray-600 mb-4">No flashcards found</p>
          <p className="text-gray-600 mb-6">Create your first flashcard to get started!</p>
          <a
            href="/create"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
          >
            Create Flashcard
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Flashcards</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {flashcards.map(card => (
          <div key={card._id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex-grow">{card.question}</h2>
                <span className={`ml-4 px-2 py-1 rounded-full text-xs font-medium ${getBoxColor(card.box)}`}>
                  Box {card.box}
                </span>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Answer:</h3>
                <p className="text-gray-800">{card.answer}</p>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Next review: {new Date(card.nextReviewDate).toLocaleDateString()}</span>
                <button
                  onClick={() => handleDelete(card._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFlashcards;

