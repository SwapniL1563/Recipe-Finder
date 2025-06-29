import express from 'express';
import cors from "cors"
import connectDB from './config/connectDB.js';
import recipeRoutes from "./routes/recipeRoutes.js"

const PORT = 5000;

const app = express();

// connect to DB
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/recipe",recipeRoutes);

app.get("/", function(req,res){
    res.send("Server is Working!");
});

// server started
app.listen(PORT, function() {
    console.log(`Server started on ${PORT}`)
})