import { useContext, useState, useEffect } from "react"
import { shopDataContext } from "../context/ShopDataContext"
import { useParams } from "react-router-dom"
import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import RelatedProduct from "../Components/RelatedProducr"

function ProductDetail() {
  const { productId } = useParams()
  const { products, currency,addtoCart } = useContext(shopDataContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState("")
  const [size, setSize] = useState("")

  useEffect(() => {
    const found = products.find((item) => item._id === productId)
    if (found) {
      setProductData(found)
      setImage(found.image1) // default image
    }
  }, [productId, products])

  if (!productData) return <div className="opacity-0"></div>

  const thumbnails = [productData.image1, productData.image2, productData.image3, productData.image4]

  return (
    <div>
      {/* Product Section */}
      <div className="w-full min-h-[130vh] md:min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col lg:flex-row items-start lg:items-center gap-[20px] px-4 lg:px-12 py-10">

        {/* Left - Images */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-6 w-full lg:w-1/2">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-4 flex-wrap justify-center">
            {thumbnails.map((img, idx) => (
              <div
                key={idx}
                className={`w-[60px] h-[60px] md:w-[100px] md:h-[120px] bg-slate-300 border border-gray-500 rounded-md overflow-hidden cursor-pointer 
                ${img === image ? "ring-2 ring-[#2f97f1]" : ""}`}
                onClick={() => setImage(img)}
              >
                <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="w-[80%] lg:w-[70%] h-[300px] md:h-[500px] border border-gray-600 rounded-md overflow-hidden">
            <img src={image} alt="main" className="w-full h-full object-contain bg-[#1a1a1a]" />
          </div>
        </div>

        {/* Right - Details */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 mt-6 lg:mt-0">
          {/* Name */}
          <h1 className="text-[32px] md:text-[40px] font-bold text-white">
            {productData.name.toUpperCase()}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(4)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-lg" />
            ))}
            <FaStarHalfAlt className="text-yellow-400 text-lg" />
            <p className="text-white font-medium ml-2">(124 reviews)</p>
          </div>

          {/* Price */}
          <p className="text-[28px] font-semibold text-white">
            {currency} {productData.price}
          </p>

          {/* Description */}
          <p className="text-gray-300 text-[16px] md:text-[18px] leading-relaxed max-w-[600px]">
            {productData.description} Breathable cotton shirt with a modern slim fit. Easy to wash, 
            super comfortable, and designed for effortless style.
          </p>

          {/* Sizes */}
          <div className="mt-4">
            <p className="text-white text-lg font-semibold mb-2">Select Size</p>
            <div className="flex gap-3 flex-wrap">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  className={`py-2 px-5 border rounded-md transition-all duration-200 
                    ${item === size ? "bg-black text-[#2f97f1] font-bold scale-105" : "bg-slate-200 text-black"}`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="mt-6 w-full sm:w-auto bg-[#2f97f1] hover:bg-[#1b6fb8] text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300" onClick={()=>addtoCart(productData._id,size)}>
            Add to Cart
          </button>

          {/* Extra Info */}
          <div className="mt-6 space-y-2 text-gray-300 text-sm">
            <p>✅ 100% Original Product</p>
            <p>🚚 Cash on Delivery available</p>
            <p>🔄 Easy return and exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description + Reviews */}
      <div className="w-full min-h-[70vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-center py-12">
        <div className="flex gap-6 border-b border-gray-600 mb-6">
          <button className="px-6 py-2 text-white border-b-2 border-[#2f97f1]">Description</button>
          <button className="px-6 py-2 text-gray-400 hover:text-white">Reviews (124)</button>
        </div>

        <div className="w-[90%] md:w-[70%] bg-[#3336397c] p-6 rounded-md text-white text-sm md:text-base leading-relaxed">
          Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneCart. 
          Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. 
          Easy to maintain and perfect for any setting, this shirt is a must-have essential for those 
          who value both fashion and function.
        </div>

        {/* Related Products */}
        <RelatedProduct 
          category={productData.category} 
          subCategory={productData.subCategory} 
          currentProductId={productData._id} 
        />
      </div>
    </div>
  )
}

export default ProductDetail
