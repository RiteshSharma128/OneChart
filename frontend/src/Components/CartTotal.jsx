

function CartTotal({  subtotal, shippingFee }) {
  const total = subtotal + shippingFee

  return (
    <div className="w-full bg-[#111] border border-[#4a7c85] rounded-2xl p-6 shadow-md text-white flex flex-col gap-4">
      {/* Subtotal */}
      <div className="flex justify-between items-center text-lg">
        <span className="text-gray-200">Subtotal</span>
        <span className="font-medium">₹{(subtotal || 0).toFixed(2)}</span>
      </div>

      <hr className="border-[#2f4f52]" />

      {/* Shipping Fee */}
      <div className="flex justify-between items-center text-lg">
        <span className="text-gray-200">Shipping Fee</span>
        <span className="font-medium">₹{shippingFee || 0}</span>
      </div>

      <hr className="border-[#2f4f52]" />

      {/* Total */}
      <div className="flex justify-between items-center text-xl font-bold mt-2">
        <span>Total</span>
        <span>₹{(total || 0).toFixed(2)}</span>
      </div>
    </div>
  );
}

export default CartTotal;


