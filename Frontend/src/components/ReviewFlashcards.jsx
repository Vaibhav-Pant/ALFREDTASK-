import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const ReviewFlashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchDueFlashcards = async () => {
      try {
        setLoading(true);
        const dueCards = await api.getDueFlashcards();
        setFlashcards(dueCards);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch flashcards');
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchDueFlashcards();
  }, []);
  
  const handleShowAnswer = () => {
    setShowAnswer(true);
  };
  
  const handleAnswer = async (isCorrect) => {
    try {
      const currentCard = flashcards[currentIndex];
      await api.answerFlashcard(currentCard._id, isCorrect);
      
      // Move to next card or finish
      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowAnswer(false);
      } else {
        // Remove the current card from the list
        setFlashcards(flashcards.filter((_, index) => index !== currentIndex));
        setShowAnswer(false);
        
        // If there are no more cards, currentIndex will be 0
        // Otherwise, keep the same index (which now points to the next card)
        if (currentIndex >= flashcards.length - 1) {
          setCurrentIndex(0);
        }
      }
    } catch (err) {
      setError('Failed to update flashcard');
      // console.error(err);
    }
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
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Review Flashcards</h1>
        <div className="bg-white rounded-lg shadow p-8">
          <p className="text-xl text-gray-600 mb-6">No flashcards due for review!</p>
          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }
  
  const currentCard = flashcards[currentIndex];
  const progress = `${currentIndex + 1} of ${flashcards.length}`;
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Review Flashcards</h1>
      <p className="text-gray-600 mb-6">Cards due today: {flashcards.length}</p>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="bg-blue-50 px-6 py-4 border-b">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Card {progress}</span>
            <span className="text-sm text-gray-600">Box {currentCard.box}</span>
          </div>
        </div>
        
        <div className="px-6 py-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-8">
            {currentCard.question}
          </h2>
          
          {showAnswer ? (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Answer:</h3>
              <p className="text-gray-800 bg-gray-50 p-4 rounded">{currentCard.answer}</p>
            </div>
          ) : (
            <button
              onClick={handleShowAnswer}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded mb-8"
            >
              Show Answer
            </button>
          )}
          
          {showAnswer && (
            <div className="flex space-x-4">
              <button
                onClick={() => handleAnswer(false)}
                className="flex-1 bg-red-100 hover:bg-red-200 text-red-800 py-3 rounded"
              >
                I was wrong
              </button>
              <button
                onClick={() => handleAnswer(true)}
                className="flex-1 bg-green-100 hover:bg-green-200 text-green-800 py-3 rounded"
              >
                I got it right
              </button>
            </div>
          )}
        </div>
      </div>
      
      <Link
        to="/"
        className="inline-block bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default ReviewFlashcards;
