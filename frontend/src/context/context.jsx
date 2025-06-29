import axios from "axios";
import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({children}) => {
    const [recipe,setRecipe] = useState([]);
    const [selected,setSelected] = useState(null);
    const [saved,setSaved] = useState([]);

    const toggleSaveRecipes = async(id) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/recipe/toggle-save`,{id});
            // Update main recipe list
            setRecipe((prev) => prev.map((item) =>
            item.id === id ? { ...item, saved: res.data.saved } : item ));
    
            // Also update saved list if you're on saved page
            setSaved((prev) =>
            res.data.saved ? [...prev, recipe.find((item) => item.id === id)]: prev.filter((item) => item.id !== id) );
        } catch (error) {
                alert("Error saving/unsave recipe", error.message);
        }
    }


    return (<UserContext.Provider value={{recipe,setRecipe,selected,setSelected,saved,setSaved, toggleSaveRecipes}}>
        {children}
    </UserContext.Provider>)
}

export default UserContextProvider;