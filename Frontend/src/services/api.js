import axios from 'axios';

const API_URL = import.meta.env.BACKEND_URL;

const api = {   
  // Get all flashcards
    getAllFlashcards: async () => {
        const response = await axios.get(`${API_URL}/flashcards`);
        return response.data;
    },

    // Create a new flashcard
    createFlashcard: async (flashcardData) => {
        const response = await axios.post(`${API_URL}/flashcards`, flashcardData);
        return response.data;
    },
      
    // Answer a flashcard (update its box)
    answerFlashcard: async (id, isCorrect) => {
        const response = await axios.put(`${API_URL}/flashcards/${id}/answer`, { isCorrect });
        return response.data;
    },

    // Delete a flashcard
    deleteFlashcard: async (id) => {
        const response = await axios.delete(`${API_URL}/flashcards/${id}`);
        return response.data;
    },
  
//   // Get flashcards due for review
    getDueFlashcards: async () => {
        const response = await axios.get(`${API_URL}/flashcards/due`);
        return response.data;
    },
  
};

export default api;