import express from "express"
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// routes Import
import flashcardRoutes from "../routes/flashcard.route.js"


// routes declaration
app.use('/api', flashcardRoutes);

export default app;

