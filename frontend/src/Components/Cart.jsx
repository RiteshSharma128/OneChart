

import { useContext } from "react";
import { shopDataContext } from "../context/ShopDataContext";
import { useNavigate } from "react-router-dom";

function Cart({ name, image, id, price }) {
  const { currency } = useContext(shopDataContext);
  const navigate = useNavigate();

  return (
    <div
      className="w-[300px] max-w-[90%] sm:w-[250px] md:w-[280px] h-[400px] bg-[#ffffff0a] backdrop-blur-lg rounded-lg hover:scale-[102%] transition-transform duration-300 flex flex-col p-[10px] cursor-pointer border border-[#80808049] shadow-md"
      onClick={() => navigate(`/productdetail/${id}`)}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-[75%] rounded-md object-cover"
      />
      <div className="text-[#c3f6fa] text-[18px] py-2 truncate">{name}</div>
      <div className="text-[#f3fafa] text-[14px] font-semibold">
        {currency}{price}
      </div>
    </div>
  );
}

export default Cart;
