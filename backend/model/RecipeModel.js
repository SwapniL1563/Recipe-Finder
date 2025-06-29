import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    id: Number,
    title:String,
    image:String,
    sourceURL:String,
    ingredients:[String],
    saved:{
        type:Boolean,
        default:false
    },
}, {
    timestamps:true
});

const recipeModel = mongoose.model("Recipes",recipeSchema);

export default recipeModel;