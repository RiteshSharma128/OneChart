import {BrowserRouter} from "react-router-dom"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContext from "./Context/authContext.jsx"
import AdminContext from "./Context/AdminContext.jsx"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthContext>
    <AdminContext>
  <App/>
  </AdminContext>
  </AuthContext>
  </BrowserRouter>
)
