import express from "express"
import cors from "cors";

const app = express();

// Middleware
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
    })
);
app.use(express.json());



// routes Import
import flashcardRoutes from "../routes/flashcard.route.js"


// routes declaration
app.use('/api', flashcardRoutes);

export default app;

