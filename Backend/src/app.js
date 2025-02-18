import express from "express"
import cors from "cors";

const app = express();

// Middleware
app.use(
    cors({
        origin: [process.env.CORS_ORIGIN],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
);

  app.use(
    express.json({
        limit: "16kb",
    })
);


app.use(express.static("public"));

// routes Import
import flashcardRoutes from "../routes/flashcard.route.js"


// routes declaration
app.use('/api', flashcardRoutes);

export default app;

