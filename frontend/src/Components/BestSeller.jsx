import { shopDataContext } from "../context/ShopDataContext"
import Cart from "./Cart"
import Title from "./Title"
import {useContext,useState,useEffect} from "react"
function BestSeller(){

  let {products}=useContext(shopDataContext)
  let [bestSeller,setBestSeller]=useState([])

  useEffect(()=>{
   let filterProduct=products.filter((item)=>item.bestseller)
  setBestSeller(filterProduct.slice(0,4))
  },[products])
  return(
    <div>
    <div className="h-[8%] w-[100%] text-center md:mt-[50px]">
      <Title text1={"BEST"} text2={"SELLER"}/>
      <p className="w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100">Tried Tested, Love DIscover Our All-Time Best Seller </p>
    </div>
    <div className="w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]">
      {
       bestSeller.map((item,index)=>(
        <Cart key={index} name={item.name} image={item.image1} id={item._id} price={item.price}/>
       ))
      }
    </div>
  </div> 
  )
}

export default BestSeller