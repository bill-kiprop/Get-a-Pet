import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import route from './routes/route.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={route}/>
  </React.StrictMode>,
)
