# Leitner Flashcard Learning System

A web application implementing the Leitner System for efficient flashcard-based learning using the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- 📚 Implementation of the Leitner System with 7 boxes
- ⏰ Spaced repetition with increasing intervals
- 📝 Create and manage flashcards
- 📊 Track learning progress
- 🎯 Focus on cards that need review
- 💻 Clean, responsive UI using Tailwind CSS

## Tech Stack

- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Deployment**: Vercel

## Leitner System Implementation

The application implements the Leitner System, a flashcard-based learning technique that uses spaced repetition:

- Cards start in Box 1 (daily review)
- Correct answers move cards to the next box
- Incorrect answers move cards back to Box 1
- Higher boxes have longer review intervals:
  - Box 1: Review daily
  - Box 2: Every 3 days
  - Box 3: Every 7 days
  - Box 4: Every 14 days
  - Box 5: Every 30 days
  - Box 6: Every 60 days
  - Box 7: Every 90 days

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm start
```

## Project Structure

```
flashcard-app/
├── backend/
│   ├── models/
│   │   └── Flashcard.js
│   ├── routes/
│   │   └── flashcardRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard.js
    │   │   ├── FlashcardCreator.js
    │   │   ├── ReviewFlashcards.js
    │   │   └── AllFlashcards.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## API Endpoints

- `GET /api/flashcards` - Get all flashcards
- `GET /api/flashcards/due` - Get flashcards due for review
- `POST /api/flashcards` - Create a new flashcard
- `PUT /api/flashcards/:id/answer` - Update flashcard box based on answer
- `DELETE /api/flashcards/:id` - Delete a flashcard


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
