import { createBrowserRouter } from 'react-router'
import Login from './components/Login'
import Register from './components/Register'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login/>,
    },
            {path: 'login', element: <Login/>},
            {path: 'register', element: <Register/>}
        
        // children: [
        //   { path: '', element: <Home/> },
        //     { path: 'home', element: <Home/> },
        //     { 
        //         path: 'ShowRecipe', 
        //         element: <ShowRecipe/>,
        //         children: [
        //             { path: '', element: <NoRecipe/> },
        //             { path: 'recipes/:id', element: <RecipeInstruction/> },
        //             { path: 'Add/:id', element: <AddRecipe/> },
        //             { path: 'successedAdding', element: <SuccessedAdding/> },
        //             { path: 'deleteS', element: <DeleteS/> }
        //         ]
        //     },
        //     { path: 'about', element: <About/> }
        // ]
    
])