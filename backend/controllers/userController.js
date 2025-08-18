import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const register = async (req,res) => {
    try {
        const {name, email, password, role} = req.body;

        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json({ msg: "User alredy exists!!"})
        
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password ,salt )

        const newUser = new User({
            name,
            email,
            password:hashpassword,
            role
        });

        await newUser.save();
        res.status(201).json({msg: "user registered successfully"})
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
const login =  async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({ email });
        if(!user) return res.status(404).json({ msg: "User not exist in database!!"})
        
        const isMatch = await bycrpt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({ msg: "Invalid Credentials!!"})

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.json({token,user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }})
        
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
export {login,register}