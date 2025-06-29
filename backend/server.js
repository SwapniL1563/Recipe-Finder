import express from 'express';
import cors from "cors"
import connectDB from './config/connectDB.js';
import recipeRoutes from "./routes/recipeRoutes.js"
import rateLimit from "express-rate-limiter";

const PORT = 5000;

const app = express();

// connect to DB
connectDB();

// rate limiter per user or Ip
const fetchRateLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max:10,
    message:{
    status: 429,
    message: "You have reached the daily recipe search limit. Please try again tomorrow.",

    }
})

// cors options - allow frontend
const corsOptions = {
  origin: "https://recipe-finder-frontend-rho.vercel.app",
  credentials: true, 
}

// middleware
app.use(cors(corsOptions));
app.use(express.json());

// rate limit
app.use("/api/recipe/fetch",fetchRateLimiter)

// routes
app.use("/api/recipe",recipeRoutes);

app.get("/", function(req,res){
    res.send("Server is Working!");
});

// server started
app.listen(PORT, function() {
    console.log(`Server started on ${PORT}`)
})