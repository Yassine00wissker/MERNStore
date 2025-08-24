import jwt from "jsonwebtoken";

const authMiddleware = (req,res,next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if(!token) return res.status(401).json({ msg: "Unauthorized" });

    try {
        const decoder = jwt.verify(token, process.env.Jwt_SECRET);
        req.user = decoder.user;
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
}
export {authMiddleware}