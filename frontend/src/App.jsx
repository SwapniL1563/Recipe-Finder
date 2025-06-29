import { BrowserRouter , Routes , Route } from "react-router-dom"
import RecipeFinder from "./components/RecipeFinder"
import UserContextProvider from "./context/context"
import SavedRecipes from "./components/SavedRecipes"
  import { ToastContainer } from 'react-toastify';

function App() {

  return (
       <UserContextProvider>
        <BrowserRouter>
         <ToastContainer/>
         <Routes>
         <Route path="/"  element={<RecipeFinder/>}/>
         <Route path="/save"  element={<SavedRecipes/>}/>
        </Routes>
      </BrowserRouter>
       </UserContextProvider>
  )
}

export default App
