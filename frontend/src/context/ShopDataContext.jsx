


import { createContext, useState, useContext, useEffect } from "react"
import { authDataContext } from "./authContext"
import axios from "axios"
import { userDataContext } from "./UserContext"

export const shopDataContext = createContext()

function ShopContext({ children }) {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const { serverUrl } = useContext(authDataContext)
  const { userData } = useContext(userDataContext)
  const [cartItem, setCartItem] = useState({})
  const currency = "₹"
  const delivery_fee = 49

  const getProducts = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list")
      setProducts(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const addtoCart = async (itemId, size) => {
    if (!size) {
      console.log("Select Product Size")
      return
    }

    let cardata = structuredClone(cartItem)

    if (cardata[itemId]) {
      if (cardata[itemId][size]) {
        cardata[itemId][size] += 1
      } else {
        cardata[itemId][size] = 1
      }
    } else {
      cardata[itemId] = {}
      cardata[itemId][size] = 1
    }

    setCartItem(cardata)

    if (userData) {
      try {
        await axios.post(
          serverUrl + "/api/cart/add",
          { itemId, size },
          { withCredentials: true }
        )
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getUserCart = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/cart/get",
        {},
        { withCredentials: true }
      )
      setCartItem(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const updateQuantity = async (itemId, size, quantity) => {
    let cardata = structuredClone(cartItem)
    cardata[itemId][size] = quantity
    setCartItem(cardata)

    if (userData) {
      try {
        await axios.post(
          serverUrl + "/api/cart/update",
          { itemId, size, quantity },
          { withCredentials: true }
        )
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getCartCount = () => {
    let totalCount = 0
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item]
          }
        } catch (error) {}
      }
    }
    return totalCount
  }

  const getCartAmount = () => {
    let totalAmount = 0
    for (const items in cartItem) {
      const itemInfo = products.find((product) => product._id === items)
      if (!itemInfo) continue
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item]
          }
        } catch (error) {}
      }
    }
    return totalAmount
  }

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    getUserCart()
  }, [])

  let value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    addtoCart,
    getCartCount,
    setCartItem,
    updateQuantity,
    getCartAmount,
  }

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  )
}

export default ShopContext
