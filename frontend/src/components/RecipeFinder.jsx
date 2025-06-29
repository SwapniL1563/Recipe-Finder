import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar';
import { UserContext } from '../context/context';
import Footer from './Footer';
import SkeletonCard from './SkeletonCard';
import { toast } from 'react-toastify';

const RecipeFinder = () => {
    const [ingredients,setIngredients] = useState("");
    const [cuisine,setCuisine] = useState("");
    const [loading,setLoading] = useState(false);
    const { recipe , setRecipe , selected ,setSelected, toggleSaveRecipes} = useContext(UserContext);

    const fetchRecipes = async () => {
        if(!ingredients) return;
        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/recipe/fetch`,{
                ingredients,cuisine,
            });
            if (Array.isArray(res.data)) {
            setRecipe(res.data);
            toast("fetch recipe successfully!")
            } else if (res.data.recipes && Array.isArray(res.data.recipes)) {
            setRecipe(res.data.recipes);
            toast("fetch recipe successfully!")
            } else {
            setRecipe([]); // fallback to empty array
            toast("fetch recipe successfully!")
            console.error("Unexpected data format:", res.data)
            }
            // setRecipe(res.data);
        } catch (error) {
            if (error.response?.status === 429) {
            toast.error("Daily recipe search limit reached. Please try again tomorrow!");
            }
            console.error("Error fetching recipes: ",error.message);
        }

        setLoading(false);
    }

    const fetchRecipesDetails = async(id) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/recipe/details/${id}`);
            setSelected(response.data)
        } catch (error) {
            console.error("Error fetching recipe details: ",error.message);
        }
    }


    useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "auto";}, [selected]);

  return (
    <div className='min-h-screen w-full text-black bg-gray-200 flex flex-col items-center relative '>
     <img src="/bg-img.webp" className='z-0 absolute left-0 top-0 opacity-[3.5%] h-full w-full object-cover ' alt="" />
     <div className='p-6 w-full md:w-2/3 flex flex-col gap-3 z-20 bg-gray-200 bg-opacity-70'>
     <Navbar/>
        {/* <h1 className='text-xl md:text-3xl font-semibold mb-2'>What's in my Fridge?</h1>   */}

       {/* Recipes Input */}
       <div className='flex flex-col w-full mb-4 relative'>
        <div>
            <label className='flex flex-col w-full mb-2 text-lg font-medium'> Enter ingredients
            <input className='md:w-[55%] p-2 outline-none rounded font-normal bg-white' type="text" value={ingredients}  onChange={(e) => setIngredients(e.target.value)} placeholder='Enter ingredients (eg.egg, tomato, onion)'/>
        </label>
        <label className='flex flex-col w-full mb-2 text-lg font-medium'> Select cuisine
            <select className='md:w-[55%] p-2 rounded outline-none font-normal bg-white' value={cuisine} onChange={(e )=> setCuisine(e.target.value)}>
            <option value="">Any</option>
            <option value="Indian">Indian</option>
            <option value="Mexican">Mexican</option>
            <option value="American">American</option>
            <option value="Italian">Italian</option>
            <option value="Chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
            <option value="British">British</option>
        </select>
        </label>
        <button className='md:w-[55%] bg-orange-400 mt-3 p-2 rounded font-medium' onClick={fetchRecipes}>Get Recipes</button>
        </div>
       </div>

       <h2 className='text-lg md:text-2xl font-semibold'>All Recipes:</h2>

       {/* Show recipes */}
       { loading ? ( <div className='grid grid-cols-2 md:grid-cols-3 gap-5 w-full'>
        {Array.from({ length: 6 }).map((item,index) => (
         <SkeletonCard key={index} />
        ))} </div> ):(
        <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
            { recipe.length === 0 ? ( 
                <div className='min-h-screen'><h2 className='text-lg'>No Recipe</h2>
                </div>) : ( recipe.map((item,index) => (
                <div className='flex flex-col gap-2' key={index} onClick={() => fetchRecipesDetails(item.id)}>
                    <img className='rounded' src={item.image} alt={item.title} loading='lazy' />
                    <div className='flex justify-between items-start'>
                      <h2 className='text-[.9rem] md:text-[1.1rem] font-semibold text-center'>{item.title}</h2>
                      <button className='text-[1.05rem] md:text-xl' onClick={(e) => { e.stopPropagation(); toggleSaveRecipes(item.id)}}>{item.saved ? "🧡":"🩶"}</button>
                    </div>
                </div>
            )))}
        </div>
       )}

       {/* show Modal */}
       {selected && (
        <div className='fixed inset-0 bg-black bg-opacity-80 flex justify-center   items-center z-50 transition ease-in'>
         <div className='bg-white rounded shadow-md px-6 py-12 md:px-8 md:py-12 max-w-md overflow-y-auto max-h-[90vh] w-full relative'>
          <button className='absolute top-3 right-3 font-semibold hover:text-black md:text-[1.05rem]' onClick={() => setSelected(null)}>Close</button>
          <h2 className='text-lg md:text-xl font-bold mb-4 text-center'>{selected.title}</h2>
          <img className='w-full h-54 object-cover rounded mb-4' src={selected.image} alt={selected.title}  />
          <h4 className='text-lg md:text-xl font-bold mb-2'>Ingredients:</h4>
          <ul className='text-sm font-medium text-gray-700 mb-4'>
          {selected.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li> ))}
          </ul>
          <h4 className='text-lg md:text-xl font-bold mb-1'>Instructions:</h4>
          <div className="text-sm font-medium text-gray-700 mb-2"
          dangerouslySetInnerHTML={{ __html: selected.instructions }}></div>
         </div>
        </div>
        )}

        </div>
     
       <Footer/>

    </div>
  )
}

export default RecipeFinder