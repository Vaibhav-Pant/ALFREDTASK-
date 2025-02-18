import express from "express"
import cors from "cors";

const app = express();

// Middleware
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || 'https://alfredtaskfrontend.vercel.app/',
        credentials: true,
        methods: 'GET,POST,PUT,DELETE',
        allowedHeaders: 'Content-Type, Authorization'
    })
);
app.use(express.json());



// routes Import
import flashcardRoutes from "../routes/flashcard.route.js"


// routes declaration
app.use('/api', flashcardRoutes);

export default app;

