import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { UserContext } from '../context/context';
import axios from 'axios';
import Footer from './Footer';
import SkeletonCard from './SkeletonCard';

const SavedRecipes = () => {
    const { selected ,setSelected , saved , setSaved , toggleSaveRecipes} = useContext(UserContext);
    const [loading,setLoading] = useState(false);

    const fetchRecipesDetails = async(id) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/recipe/details/${id}`);
            setSelected(response.data)
        } catch (error) {
            console.error("Error fetching recipe details: ",error.message);
        }
    }

    // fetch saved recipes
    useEffect(()=> {
        const loadSaved = async () => {
          setLoading(true);
          try {
          const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/recipe/saved`);
          setTimeout(()=> {
             setSaved(res.data);
             setLoading(false);
          },1000);
          } catch (error) {
          console.error("Error fetching saved recipes" , error.message)
          }
        }

        loadSaved();
    },[])


    return (
     <div className='min-h-screen w-full text-black bg-gray-200 flex flex-col items-center relative '>
     <img src="/bg-img.webp" className='z-0 absolute left-0 top-0 opacity-[3.5%] h-full w-full object-cover ' alt="" />
      <div className='p-6 w-full md:w-2/3 flex flex-col gap-3 z-20 bg-gray-200 bg-opacity-70'>
      <Navbar/>

      <h2 className='text-lg md:text-2xl font-semibold'>Saved Recipes:</h2>

      <div>
         {/* Show recipes */}
       { loading ? ( <div className='grid grid-cols-2 md:grid-cols-3 gap-5 w-full'>
        {Array.from({ length: 6 }).map((item,index) => (
         <SkeletonCard key={index} />
        ))} </div> ):(
        <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
            { saved.length === 0 ? ( 
                <div><h2 className='text-lg'>No Recipe Saved</h2>
                </div>) : ( saved.map((item,index) => (
                <div className='flex flex-col gap-2' key={index} onClick={() => {console.log("Item clicked:", item); fetchRecipesDetails(item.id)}}>
                    <img className='rounded' src={item.image} alt={item.title} loading='lazy' />
                    <div className='flex justify-between items-start gap-2'>
                    <h2 className='text-[0.8rem] md:text-[1.1rem] font-semibold text-center'>{item.title}</h2>
                    <button className='text-[1.05rem] md:text-xl' onClick={(e) => { e.stopPropagation(); toggleSaveRecipes(item.id)}}>{item.saved ? "🧡":"🩶"}</button>
                     </div>
                </div>
                )))}
        </div>
       )}

         {/* Modal */}
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
      </div>
      <Footer/>
     </div>
  )
}

export default SavedRecipes