import User from "../model/userModel.js";



export const addTocart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userData = await User.findById(req.userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};  // agar itemId pehle se nahi hai to object banao
    }

    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;  // agar size already hai to +1 karo
    } else {
      cartData[itemId][size] = 1;   // agar size nahi hai to 1 se start karo
    }

    await User.findByIdAndUpdate(req.userId, { cartData });

    return res
      .status(200)
      .json({ message: "Item added to cart successfully", cartData });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


  export const UpdateCart =async(req,res)=>{
  try{
   
  const {itemId,size,quantity}=req.body;
  const userData=await User.findById(req.userId); 
  let cartData=await userData.cartData;
  cartData[itemId][size]=quantity;
  await User.findByIdAndUpdate(req.userId,{cartData});
  return res.status(200).json({message:"Cart Updated",cartData});
  }catch(error){
  console.log(error);
  return res.status(500).json({message:"Internal server error"});
  }
 }


  export const getUsercart=async(req,res)=>{
  try{
  const userData=await User.findById(req.userId);
  let cartData= await userData.cartData;
  return res.status(200).json(cartData) 
  }catch(error){
 console.log(error);
 return res.status(500).json({message:"Internal server error"});
  }
 }

