import { useContext, useEffect, useState } from "react"
import { shopDataContext } from "../context/ShopDataContext"
import Title from "../Components/Title";
import Cart from "./Cart";
function RelatedProduct ({category,subCategory,currentProductId}){
  let {products}=useContext(shopDataContext)
  let [related ,setRelated]=useState([])

  useEffect(() => {
  if (products.length > 0) {
    const relatedProducts = products
      .filter(
        (item) =>
          item.category === category &&
          item.subCategory === subCategory &&
          item._id !== currentProductId
      )
      .slice(0, 4);

    setRelated(relatedProducts);
  }
}, [products, category, subCategory, currentProductId]);

  return (
    <div className="my-[130px] md:my-[40px] md:px-[50px]">
      <div className="ml-[20px] lg:ml-[80px]">
      <Title text1={"RELATED"} text2={"PRODUCTS"}/>
      <div className="w-[100%] mt-[30px] flex items-center justify-center flex-wrap gap-[150px]">
        {
          related.map((item,index)=>(
            <Cart key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
          ))
        }
      </div>
      </div>

    </div>
  )
}

export default RelatedProduct