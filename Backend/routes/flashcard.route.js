import {Router} from "express"
import {
    getAllFlashcards,
    addNewFlashCard,
    updateFlashCard,
    deleteFlashCard,
    flashCardDue
 } from "../controllers/flashcard.controller.js"



const router = Router();

// GET all flashcards
router.get('/flashcards', getAllFlashcards);

// POST new flashcard
router.post('/flashcards', addNewFlashCard);

// PUT update flashcard (for answering correctly/incorrectly)
router.put('/flashcards/:id/answer', updateFlashCard);

// DELETE flashcard
router.delete('/flashcards/:id', deleteFlashCard);

// GET flashcards due for review
router.get('/flashcards/due', flashCardDue);

export default router;