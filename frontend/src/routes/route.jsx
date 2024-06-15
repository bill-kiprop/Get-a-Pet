import { createBrowserRouter } from "react-router-dom";
import Home from "../models/home";
import Petpage from "../models/petpage";
import Petdetails from "../models/petdetails";

const route = createBrowserRouter([
{
    path:"/",
    element: <Home/>
},
{
    path:"/pets",
    element: <Petpage/>
},
{
    path:"/petdetails",
    element: <Petdetails/>
},

])
export default route