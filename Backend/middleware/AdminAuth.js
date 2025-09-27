import jwt from "jsonwebtoken"

const adminAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    if (!token) {
      return res.status(400).json({ message: "Not Authorized, Login Again" });
    }

    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(400).json({ message: "Invalid token, Login Again" });
    }

    // yaha tum direct ADMIN_EMAIL check karna chahte ho
    if (verifyToken.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Access Denied, not an admin" });
    }

    req.adminEmail = verifyToken.email;
    next();

  } catch (error) {
    console.log("adminAuth error", error);
    return res.status(500).json({ message: `adminAuth error ${error}` });
  }
}

export default adminAuth;
