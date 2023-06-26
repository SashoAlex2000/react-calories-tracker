import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import TodayPage from "./pages/Today";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import FoodsPage from "./pages/Foods";


const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <HomePage/>,
            },
            {
                path: '/today',
                element: <TodayPage/>,
            },
            {
                path: '/foods',
                element: <FoodsPage/>,
            },
        ]
    },
    
]);


function App() {
    return <RouterProvider router={router}>

    </RouterProvider>
}

export default App;
