import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req,res,next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token) return res.status(401).json({ msg: "Unauthorized" });

    try {
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoder || !decoder.id) {
            return res.status(401).json({ msg: "Invalid token" });
        }
        req.user = await User.findById(decoder.id).select("-password");
        if (!req.user) {
            return res.status(401).json({ msg: "User not found" });
        }
        next();
    } catch (error) {
        console.error("Auth middleware error:", error.message);
        return res.status(401).json({ msg: "Unauthorized" });
    }
}

const roleMiddleware = (...roles) => {
    return(req, res, next) => {
        if(!req.user || !roles.includes(req.user.role) ) {
            return res.status(403).json({ msg: "Forbidden: Access denied"  });
        }
        next();
    }
}
export {authMiddleware , roleMiddleware}