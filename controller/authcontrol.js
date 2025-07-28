import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from '../models/user.js';
const login = async (req, res) => {
  try {
    // console.log("the login calll");
    
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    
    if (!user) {
      return res.status(404).json({ success: "false", message: "no user found" });
    }
    
    console.log("the user passw-", user.password);
    // console.log(match);
    const match = await bcrypt.compare(password, user.password);
    // const match = (user.password === password);
    console.log(match)
    if (!match) {
     return res.status(401).json({ success: "false", message: "wrong password" });
    }
    const token = jwt.sign(
      { _id: user._id, role: user.role, name: user.name },
      process.env.TOKEN_JWT,
      { expiresIn: "10d" }
    );

    return res.status(200).json({success:"true",token,user:{_id: user._id, name: user.name, role: user.role} })
  } catch (error) {
    console.log("error in login", { error });
    return res.status(500).json({success: false, error: error.message});
    
  }
};

const verify = (req, res)=>{
  return res.status(200).json({success:true, user:req.user})
}
export { login, verify };