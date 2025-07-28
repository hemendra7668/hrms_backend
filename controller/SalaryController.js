import Employee from "../models/Employee.js";
import Salary from "../models/Salary.js";
const AddSalary = async(req, res)=>{
try {
    const {employeeId, basicSalary, allowances, deductions, payDate}= req.body;
    const totalSalary = parseInt(basicSalary)+parseInt(allowances)- parseInt(deductions);
const newsalary = new Salary({
    employeeId, basicSalary,
    allowances, deductions,
     netSalary:totalSalary,
     payDate
    
});
await newsalary.save();
return res.status(200).json({
    success: true,
    message: "salary added",
    newsalary
})
} catch (error) {
         return res.status(500).json({success:false, err: " salary server  error"})
 
}
}

const getSalary = async(req, res)=>{
try {
    const {id, role} = req.params;
    let salary 
  if(role=="admin")
  {

      salary= await Salary.find({employeeId: id}).populate('employeeId', 'employeeId')
  }
   else
   {
    const employee = await Employee.findOne({userId: id});
    salary = await Salary.find({employeeId: employee._id}).populate('employeeId', 'employeeId')
   }

return res.status(200).json({
    success: true,
    salary
})
} catch (error) {
         return res.status(500).json({success:false, err: " get salary server  error"})

}
}

export {AddSalary, getSalary};