import { Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import Nav from "./Components/Nav"
import { useContext } from "react"
import { userDataContext } from "./context/UserContext"
import About from "./pages/About"
import Collection from "./pages/Collections"
import Contact from "./pages/Contact"
import Product from "./pages/Product"
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ProductDetail from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import PlaceOrder from "./pages/PlaceOrder"
import Order from "./pages/order"
import Notfound from "./pages/NotFount"
import Ai from "./Components/Ai"



function App(){

  let {userData}=useContext(userDataContext)
  let location=useLocation()
  return(
    <>
    {userData && <Nav/>}
    <Routes>
          
        <Route path="/login"
         element={userData ? (<Navigate to={location.state?.from || "/"}/>)
        :(<Login/>)}/>

        <Route path="/signup"
        element={userData ? (<Navigate to={location.state?.from || "/"}/>)
        :(<Registration/>)}/>

      <Route path="/"
       element={ userData ? <Home/>:<Navigate to="/login" state={{from:location.pathname}}/>}/>
      <Route path="/about" 
      element={ userData ? <About/>:<Navigate to="/login" state={{from:location.pathname}}/>}/>
      <Route path="/collection" 
      element={ userData ? <Collection/>:<Navigate to="/login" state={{from:location.pathname}}/>}/>
      <Route path="/contact"
       element={ userData ? <Contact/>:<Navigate to="/login" state={{from:location.pathname}}/>}/>
      <Route path="/product"
       element={ userData ? <Product/>:<Navigate to="/login" state={{from:location.pathname}}/>}/>

       <Route path="/productDetail/:productId"
       element={ userData ? <ProductDetail/>:<Navigate to="/login" state={{from:location.pathname}}/>}/>

       <Route path="/cart"
       element={ userData ? <Cart/>:<Navigate to="/login" state={{from:location.pathname}}/>}/>

       <Route path="/placeOrder"
       element={ userData ? <PlaceOrder/>:<Navigate to="/login" state={{from:location.pathname}}/>}/>

       <Route path="/order"
       element={ userData ? <Order/>:<Navigate to="/login" state={{from:location.pathname}}/>}/>
       
       <Route path="*" element={<Notfound/>}/>
    </Routes>
    <Ai/>
   </>
  )
}

export default App