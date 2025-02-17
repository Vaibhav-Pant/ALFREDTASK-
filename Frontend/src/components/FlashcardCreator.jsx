import React, { useState } from 'react';
import api from '../services/api';

const FlashcardCreator = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!question.trim() || !answer.trim()) {
      setError('Question and answer are required');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      await api.createFlashcard({ question, answer });
      
      setQuestion('');
      setAnswer('');
      setSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
      setLoading(false);
    } catch (err) {
      setError('Failed to create flashcard');
      setLoading(false);
      console.error(err);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Flashcard</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p>Flashcard created successfully!</p>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="question" className="block text-gray-700 font-medium mb-2">
              Question
            </label>
            <textarea
              id="question"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter the question"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="answer" className="block text-gray-700 font-medium mb-2">
              Answer
            </label>
            <textarea
              id="answer"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the answer"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <span>Creating...</span>
            ) : (
              <span>Create Flashcard</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FlashcardCreator;