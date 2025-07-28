import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String, enum: ["admin", "employee"], default: "Employee" },
  profileImage: { type: String },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userschema);
export default User;
