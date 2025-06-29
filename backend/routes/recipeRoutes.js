import express from "express";
import { getRecipes, recipeDetails, savedRecipes, toggleSaveRecipes } from "../controller/recipeController.js";
const router = express.Router();

router.post("/fetch",getRecipes);
router.post("/toggle-save",toggleSaveRecipes)
router.get("/saved",savedRecipes)
router.get("/details/:id",recipeDetails);

export default router;