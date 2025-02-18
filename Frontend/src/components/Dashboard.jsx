import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const [dueCount, setDueCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const dueFlashcards = await api.getDueFlashcards();
        const allFlashcards = await api.getAllFlashcards();

        setDueCount(dueFlashcards.length);
        setTotalCount(allFlashcards.length);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch flashcards');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
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
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Flashcard Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Cards Due Today</h2>
          <p className="text-4xl font-bold text-blue-600">{dueCount}</p>
          {dueCount > 0 ? (
            <Link
              to="/review"
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Start Review
            </Link>
          ) : (
            <p className="mt-4 text-green-600">All caught up! No cards to review.</p>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Cards</h2>
          <p className="text-4xl font-bold text-purple-600">{totalCount}</p>
          <Link
            to="/create"
            className="mt-4 inline-block bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded mr-2"
          >
            Add New
          </Link>
          <Link
            to="/all"
            className="mt-4 inline-block bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
          >
            View All
          </Link>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">About the Leitner System</h2>
        <p className="text-gray-600 mb-3">
          The Leitner System is a method of spaced repetition where flashcards are sorted into boxes based on how well you know each card.
        </p>
        <p className="text-gray-600 mb-3">
          In this app:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-3">
          <li>Cards start in Box 1 (daily review)</li>
          <li>When answered correctly, they move to the next box</li>
          <li>When answered incorrectly, they move back to Box 1</li>
          <li>Higher boxes have longer review intervals (1, 3, 7, 14, 30 days)</li>
        </ul>
        <p className="text-gray-600">
          This system helps you focus on difficult cards while reviewing well-known cards less frequently.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;