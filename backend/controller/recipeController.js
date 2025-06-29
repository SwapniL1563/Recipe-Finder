import axios from "axios";
import dotenv from "dotenv";
import Recipe from "../model/RecipeModel.js";

dotenv.config();

// get recipes from ingredient
export const getRecipes = async(req,res) => {
    const { ingredients , cuisine = "" } = req.body;

    try {
        const response = await axios.get("https://api.spoonacular.com/recipes/complexSearch",
      {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
          cuisine: cuisine || "",
          includeIngredients: ingredients,
          number: 12,
          instructionsRequired: true,
          addRecipeInformation: true,
        },
      });
        
        const formattedRecipes = response.data.results.map((recipe) => ({
            id:recipe.id,
            title:recipe.title,
            image:recipe.image,
            sourceURL:`https://spoonacular.com/recipes/${recipe.title.toLowerCase().replace(/ /g, "-")}-${recipe.id}`,
            ingredients:ingredients.split(",").map((item) => item.trim())
        }));

        // save recipes to DB
        await Recipe.insertMany(formattedRecipes);

        res.status(200).json(formattedRecipes);


    } catch (error) {
         res.json({
            error:"Unable to get recipe's from ingredient", details:error.message
         })
    }
}

// get recipe details
export const recipeDetails = async(req,res) => {
    const { id } = req.params;

    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`,{
        params:{
            apiKey: process.env.SPOONACULAR_API_KEY
        }
        });

        const { title, image , instructions , extendedIngredients } = response.data;

        res.json({
            title,image,instructions,ingredients:extendedIngredients.map((item) => item.original)
        })
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch recipe details", details: error.message });
    }
}


// save/unsave the recipes
export const toggleSaveRecipes = async(req,res) => {
    const {id} = req.body;

    try {
        let recipe = await Recipe.findOne({id});
        if (!recipe) {
        // Optionally fetch it from Spoonacular to allow saving directly
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
        },
        });

        const { title, image, extendedIngredients } = response.data;

        // Save it in DB first
        recipe = new Recipe({
         id,
          title,
        image,
         saved: true, // first time save
         ingredients: extendedIngredients.map((item) => item.original),
         });

        await recipe.save();

        return res.status(200).json({
        message: "Recipe saved",
        saved: true,
        });
        }

       // If recipe exists, toggle its saved state
       recipe.saved = !recipe.saved;
       await recipe.save();

        return res.status(200).json({
        message: recipe.saved ? "Recipe saved" : "Recipe unsaved",
        saved: recipe.saved,
        })

    } catch (error) {
          res.status(500).json({ error: "Error saving recipe", details: error.message });
    }
}

// get all the saved recipes
export const savedRecipes = async(req,res) => {
    try {
        const save = await Recipe.find({saved:true}).sort({ updatedAt:-1 });
        res.send(save);
    } catch (error) {
         res.json({
            error:"Unable to get saved recipe's", details:error.message
         })
    }
}
