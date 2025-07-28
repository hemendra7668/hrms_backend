import Employee from "../models/Employee.js";
import User from "../models/user.js";
import bcrypt from 'bcrypt';
import { error } from "console";
import multer from "multer";
import path from 'path';
const storage = multer.diskStorage({
    destination:(req,file, cb)=>{
cb(null, "public/uploads")
    }, 
    filename: (req, file, cb)=>{
        cb(null, Date.now()+ path.extname(file.originalname))
    }
});
 const upload = multer({storage:storage})
const AddEmployee = async(req, res)=>{
try {
    const {   
         name,
    email,
    employeeId,
    dob,
    gender,
    maritalStatus,
    designation,
    department,
    salary,
    role,
    password}=req.body;
    const user = await User.findOne({email})
    if(user)
    {
        return res.status(404).json({success:false, error:"the  user already exist in employees"});

    }
    const haspassword = await bcrypt.hash(password, 10);
    const newuser = new User(
        {
           name,
           email ,
           password:haspassword,
           role,
           profileImage: req.file ? req.file.filename :" "

        }
    )
    const saveduser = await newuser.save();
   
    const newEmployee = new Employee({
        userId:saveduser._id,
        employeeId,
        dob,
    gender,
    maritalStatus,
    designation,
    department,
    salary
    })
    await newEmployee.save();

    return res.status(200).json({
        success:true,
        message:"the employee is created"
    })
} catch (error) {
    console.log(error.message)
    return res.status(500).json({success:false, err: " employee server error"})
}
}

const getEmployees = async(req, res)=>{
    try {
      const employees = await Employee.find().populate('userId',{password:0}).populate('department');
      return res.status(200).json({success: true, employees})  
    } catch (error) {
      console.log(error);
      return res.status(500).json({success:false, err: " employee server  error"})
        
    }
}
const getEmployee = async(req, res)=>{
    const {id} = req.params;
    try {
      let employee;
      employee = await Employee.findById({_id : id}).populate('userId',{password:0}).populate('department');
      if(!employee)
      {
        employee = await Employee.findOne({userId : id}).populate('userId',{password:0}).populate('department');
      }
      return res.status(200).json({success: true, employee})  
    } catch (error) {
      console.log(error);
      return res.status(500).json({success:false, err: " employee server  error"})
        
    }
}

const updateEmployee = async(req, res)=>{
    const {id} = req.params;
    const {name, department,designation, salary,maritalStatus,gender  }=req.body;
    try {
      const employee = await Employee.findById({_id : id});
      if(!employee)
      {
        return res.status(404).json({status:false, error:"no employee found"})
      }
      const user =await User.findById({_id:employee.userId});
      if(!user)
      {
        return res.status(404).json({status:false, error: "no user found"})
      }
      const updateduser = await User.findByIdAndUpdate({_id:employee.userId},{name});
      const updatedemployee = await Employee.findByIdAndUpdate({_id:id},{maritalStatus, salary, designation,department,  gender});
      if(!updatedemployee || updateduser)
        {
            return res.status(404).json({status:false,error:"no docs  found"})
        }
        return res.status(200).json({success: true, message:"employee updated"})  
    } catch (error) {
      console.log(error);
      return res.status(500).json({success:false, err: " employee server  error"})
        
    }
}

const fetchEmpbyId = async(req, res)=>{
    const {id} = req.params;
    try {
      const employees = await Employee.find({department : id});
      return res.status(200).json({success: true, employees})  
    } catch (error) {
      console.log(error);
      return res.status(500).json({success:false, err: " employee by dep id server  error"})
        
    }
}
export {AddEmployee , upload, getEmployees, getEmployee, updateEmployee,fetchEmpbyId};