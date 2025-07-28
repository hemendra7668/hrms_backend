import User from "../models/user.js";
import bcrypt from 'bcrypt';

const changePass = async (req, res) => {
  try {
    const { userId, oldpassword, newpassword } = req.body;
    
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(oldpassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Old password does not match." });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    return res.status(200).json({ success: true, message: "Password changed successfully." });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error. Password not changed." });
  }
};

export { changePass };
