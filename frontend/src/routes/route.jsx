import { createBrowserRouter } from "react-router-dom";
import Home from "./home";
import Petpage from "../models/petpage";
import Petdetails from "../models/petdetails";
import Donate from "../models/donate";
import UserForm from "../models/useradata";
import Users from "../models/users";
import Userpage from "../models/userpage";

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
    path:"/petdetails/:id",
    element: <Petdetails/>
},
{
    path:'/donate',
    element: <Donate/>
},
{
    path:'/users/create',
    element:<UserForm/>
},
{
    path: '/users',
    element:<Users/>
},
{
    path:'/users/:id',
    element:<Userpage/>
}


])
export default route