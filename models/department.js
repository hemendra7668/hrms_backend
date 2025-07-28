import mongoose, { Types } from "mongoose";
import Employee from "./Employee.js";
import Salary from "./Salary.js";
import Leave from "./Leave.js";
import User from "./user.js";
const departmentSchema  = new mongoose.Schema({
    dept_name: {type:String },
    description: {type:String}, 
    createdAt: {type: Date, default: Date.now},
    updatedAt:{type:Date, default:Date.now}
})


departmentSchema.pre("deleteOne",{document:true, query:false}, async function (next) {
    try{
     const employees = Employee.find({department:this._id})  ;
     const empids = (await employees).map(emp=> emp._id)
        await Employee.deleteMany({department: this._id})
        await Leave.deleteMany({employeeId:{$in:empids}})
        await User.deleteMany({employeeId:{$in:empids}})
        await Salary.deleteMany({employeeId:{$in:empids}})
        next()
    }

catch(error)
{
next(error);
}})
const Department= mongoose.model("Department", departmentSchema);
export default Department; 