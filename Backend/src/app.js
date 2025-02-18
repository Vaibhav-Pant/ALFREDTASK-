import express from "express"
// import cors from "cors";

const app = express();

// Middleware
// app.use(
//     cors({
//         origin: [process.env.CORS_ORIGIN],
//         credentials: true,
//         methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//         allowedHeaders: ['Content-Type', 'Authorization']    
//     })
// );
const allowedOrigins = [process.env.CORS_ORIGIN];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }else {
        // Respond with 403 Forbidden if the origin is not allowed
        return res.status(403).json({ message: 'Forbidden' });
      }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    
    next();
  });


app.use(express.json());



// routes Import
import flashcardRoutes from "../routes/flashcard.route.js"


// routes declaration
app.use('/api', flashcardRoutes);

export default app;

