

import { useContext, useState } from "react";
import Title from "../Components/Title";
import CartTotal from "../Components/CartTotal";
import razorpay from "../assets/razorpay.jpg";

import { shopDataContext } from "../context/ShopDataContext";
import { authDataContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  let [method, setMethod] = useState("cod");
  let navigate = useNavigate();
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } =
    useContext(shopDataContext);
  let { serverUrl } = useContext(authDataContext);

  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // const initPay=(order)=>{
  //   const options={
  //     key:import.meta.env.VITE_RAZORPAY_KEY_ID,
  //     amount:order.amount,
  //     currency:order.currency,
  //     name:"Order Payment",
  //     description:"order.id",
  //     receipt:"order.receipt",
  //     handler:async (response)=>{
  //       console.log(response)

  //       const rzp=new window.Razorpay(options)
  //       rzp.open()
  //     }

  //   }
  // }


  const initPay = (order) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name:"Order Payment",
    description:"order.id",
    receipt:"order.receipt",   // Razorpay se aaya hua order id
    handler: async (response) => {
      console.log("✅ Payment Success", response);
    const {data}=await axios.post(serverUrl+"/api/order/verifyrazorpay",response,{withCredentials:true})
    if(data){
      navigate("/order")
      setCartItem({})
    }
  }}
  const rzp = new window.Razorpay(options);
  rzp.open();
};

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const productId in cartItem) {
        for (const size in cartItem[productId]) {
          if (cartItem[productId][size] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === productId)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItem[productId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      // ✅ Payment methods check
      if (method === "cod") {
        const result = await axios.post(
          serverUrl + "/api/order/placeorder",
          orderData,
          { withCredentials: true }
        );

        if (result.data) {
          setCartItem({});
          navigate("/order");
        } else {
          console.log(result.data.message);
        }
      } else if (method === "razorpay") {
        const resultRazorpay = await axios.post(
          serverUrl + "/api/order/razorpay",
          orderData,
          { withCredentials: true }
        );

        if (resultRazorpay.data) {

          // setCartItem({});
          // navigate("/order");
          // console.log(resultRazorpay.data);
          initPay(resultRazorpay.data);

          // yaha Razorpay checkout open karna hoga (baad me JS SDK se)
        }
      }

      console.log("Order Data: ", orderData);
    } catch (error) {
      console.error("Error placing order: ", error);
    }
  };



  
  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col md:flex-row gap-[50px] items-start justify-center relative pt-[50px]">
      {/* Left Side Form */}
      <form
        onSubmit={onSubmitHandler}
        className="lg:w-[50%] w-[100%] flex flex-col items-center gap-[20px]"
      >
        <div className="lg:w-[70%] w-[90%]">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />

          {/* First + Last Name */}
          <div className="w-full h-[70px] flex items-center justify-between px-[10px]">
            <input
              type="text"
              placeholder="First Name"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]"
              required
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]"
              required
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
            />
          </div>

          {/* Email */}
          <input
            type="text"
            placeholder="Email Address"
            className="w-full h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] my-2"
            required
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
          />

          {/* Street */}
          <input
            type="text"
            placeholder="Street"
            className="w-full h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] my-2"
            required
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
          />

          {/* City + State */}
          <div className="w-full h-[70px] flex items-center justify-between px-[10px]">
            <input
              type="text"
              placeholder="City"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]"
              required
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
            />
            <input
              type="text"
              placeholder="State"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]"
              required
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
            />
          </div>

          {/* PinCode + Country */}
          <div className="w-full h-[70px] flex items-center justify-between px-[10px]">
            <input
              type="text"
              placeholder="Pincode"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]"
              required
              name="pinCode"
              value={formData.pinCode}
              onChange={onChangeHandler}
            />
            <input
              type="text"
              placeholder="Country"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]"
              required
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
            />
          </div>

          {/* Phone */}
          <input
            type="text"
            placeholder="Phone"
            className="w-full h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] my-2"
            required
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
          />

          {/* Submit Button inside form */}
          <div className="flex justify-center py-4">
            <button
              type="submit"
              className="h-[50px] px-6 bg-blue-600 text-white text-[18px] font-semibold 
                         rounded-md shadow-sm shadow-[#343434] 
                         hover:bg-blue-700 transition duration-200"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </form>

      {/* Right Side Payment & Cart Total */}
      <div className="lg:w-[50%] w-[100%] min-h-[100%] flex items-center justify-center gap-[30px] flex-col">
        <div className="lg:w-[70%] w-[90%] flex flex-col items-center gap-[20px]">
          <CartTotal subtotal={getCartAmount()} shippingFee={delivery_fee} />
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="w-[100%] h-[100px] flex items-center justify-center gap-[20px]">
            <button
              type="button"
              onClick={() => setMethod("razorpay")}
              className={`w-[150px] h-[50px]  rounded-sm ${
                method === "razorpay"
                  ? "border-[5px] border-blue-900 rounded-sm"
                  : ""
              }`}
            >
              <img
                src={razorpay}
                className="w-[100%] h-[100%] object-fill rounded-sm"
                alt=""
              />
            </button>

            <button
              type="button"
              onClick={() => setMethod("cod")}
              className={`w-[200px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-[white] text-[14px] px-[20px] rounded-sm text-[#332f6f] font-bold ${
                method === "cod"
                  ? "border-[5px] border-blue-900 rounded-sm"
                  : ""
              }`}
            >
              CASH ON DELIVERY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
