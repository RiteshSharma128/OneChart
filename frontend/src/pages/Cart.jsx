


import { useContext, useEffect, useMemo, useState } from "react";
import { shopDataContext } from "../context/ShopDataContext";
import { useNavigate } from "react-router-dom";
import Title from "../Components/Title";
import { RiDeleteBin5Fill } from "react-icons/ri";
import CartTotal from "../Components/CartTotal";

function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  // build flat array from cart map
  useEffect(() => {
    const temp = [];
    for (const productId in cartItem) {
      const sizes = cartItem[productId] || {};
      for (const size in sizes) {
        const qty = sizes[size];
        if (qty > 0) {
          temp.push({ _id: productId, size, quantity: qty });
        }
      }
    }
    setCartData(temp);
  }, [cartItem]);

  const isEmpty = cartData.length === 0;

  // memo map for product lookup
  const productMap = useMemo(() => {
    const map = new Map();
    (products || []).forEach((p) => map.set(p._id, p));
    return map;
  }, [products]);

  // calculate subtotal dynamically
  const subtotal = useMemo(() => {
    return cartData.reduce((sum, item) => {
      const productData = productMap.get(item._id);
      if (!productData) return sum;
      return sum + productData.price * item.quantity;
    }, 0);
  }, [cartData, productMap]);

  const shippingFee = isEmpty ? 0 : 49;

  return (
    <div className="w-[100%] min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[80px] px-3 sm:px-5 md:px-8">
      {/* Header */}
      <div className="text-center mb-5">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-5 items-start">
        {/* Cart Items */}
        <div className="w-full">
          {isEmpty ? (
            <div className="w-full rounded-xl border border-[#2d4a4f] bg-[#1a2a2d] p-5 text-center">
              <p className="text-[#cfeff2] text-base sm:text-lg">Your cart is empty.</p>
              <button
                onClick={() => navigate("/collection")}
                className="mt-4 px-4 py-2 rounded-xl border border-[#4d8890] bg-[#2a4246] text-white hover:bg-[#37585e] transition text-sm sm:text-base"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:gap-4">
              {cartData.map((item) => {
                const productData = productMap.get(item._id);
                if (!productData) return null;

                return (
                  <div
                    key={`${item._id}-${item.size}`}
                    className="w-full border border-[#2d4a4f] py-3 px-3 sm:px-4 flex items-start sm:items-center gap-3 sm:gap-5 bg-[#1a2a2d] rounded-xl"
                  >
                    {/* Image */}
                    <img
                      className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] rounded-md object-cover shadow-md"
                      src={productData.image1}
                      alt={productData.name}
                    />

                    {/* Details */}
                    <div className="flex flex-col gap-2 flex-1">
                      <p className="text-[15px] sm:text-[18px] md:text-[20px] text-[#f3f9fc] font-semibold line-clamp-2">
                        {productData.name}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                        <p className="text-[14px] sm:text-[16px] text-[#aaf4e7] font-medium">
                          {currency} {productData.price}
                        </p>

                        {/* Size */}
                        <p className="w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] text-[13px] sm:text-[15px] text-white bg-[#518080b4] rounded-md flex items-center justify-center border border-[#9ff9f9] shadow-md">
                          {item.size}
                        </p>

                        {/* Qty + Delete */}
                        <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-0">
                          <input
                            type="number"
                            min={1}
                            value={item.quantity ?? 1}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              if (Number.isFinite(val) && val >= 1) {
                                updateQuantity(item._id, item.size, val);
                              }
                            }}
                            className="w-[55px] sm:w-[70px] px-2 py-1 text-white text-[13px] sm:text-[15px] font-semibold bg-[#518080b4] border border-[#9ff9f9] rounded-md text-center outline-none"
                          />

                          <RiDeleteBin5Fill
                            className="text-[#9ff9f9] w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] cursor-pointer hover:opacity-80"
                            onClick={() => updateQuantity(item._id, item.size, 0)}
                            title="Remove"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
             
            </div>
          )}
        </div>
            <aside className="w-full">
          <CartTotal subtotal={subtotal} shippingFee={shippingFee} />
          <button
            className="hidden lg:flex text-[15px] md:text-[17px] text-white bg-[#51808048] hover:bg-slate-500 py-2 px-6 md:px-10 rounded-2xl items-center justify-center gap-3 md:gap-5 border border-[#80808049] cursor-pointer mt-4 w-full"
            onClick={() => {
              if (!isEmpty) navigate("/placeOrder");
            }}
            disabled={isEmpty}
          >
            Checkout
          </button>
        </aside>
      </div>
    </div>
  );
}

export default Cart;


