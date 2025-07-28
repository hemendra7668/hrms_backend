// import user from "./models/user.js";
// const userRegister = async (req, res) => {
//   try {
//     const { name, email, password, role, age } = req.body;
//     // const haspass = await bcrypt.hash("admin123", 10);
//     const newuser = new user({
//       name,
//       email,
//       password,
//       role,
//     });
//     await newuser.save();
//     console.log("User registered successfully");
//   } catch (err) {
//     console.error("Error in user registration:", err);
//   }
// };
// export default userRegister;

import bcrypt from "bcrypt";
import User from "./models/user.js";

const userRegister = async (req, res) => {
  try {
    const { name, email, password, role, age } = req.body;

    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ success: false, error: "Invalid input types" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    // const hashedPassword = password.trim();
    const hashedPassword =await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role,
    
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        role: newUser.role,
        email: newUser.email
      }
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

export default userRegister;
