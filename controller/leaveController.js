
import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";
const addLeave = async (req, res)=>{
    try {
        console.log("Received from frontend:", req.body);

    const {userId, leaveType, startDate, endDate, Reason}= req.body;
   const employee = await Employee.findOne({ userId })
const newleave = new Leave({
    employeeId: employee._id, leaveType,
    startDate, endDate,
     Reason 
});
console.log(newleave);

await newleave.save();
return res.status(200).json({
    success: true,
    message: "leave added"
})
} catch (error) {
         return res.status(500).json({success:false, err: " leave server  error"})
 
}
}

const updateLeave = async (req, res)=>{
    try {
        // const status = req.body;
        console.log("Received from frontend:" ,req.body );

    const {id}= req.params;
    console.log("reciebedid: ", id);
    
   const leave = await Leave.findByIdAndUpdate({ _id: id }, {status: req.body.status })
   if(!leave)
   {
return res.status(404).json({success: false, message: "leave not found error"})
   }

console.log(leave);
return res.status(200).json({
    success: true,
    message: "leave updated"
})
} catch (error) {
         return res.status(500).json({success:false, err: " leave updation  error"})
 
}
}

const getleave = async(req, res)=>{
try {
     const {id, role}= req.params;
     let leaves
     if(role==='admin')
     {

          leaves = await Leave.find({employeeId:id})
     }
    else
     {
 const employee= await Employee.findOne({userId:id});
      leaves= await Leave.find({employeeId:employee._id});
     }
    
     
return res.status(200).json({success: true, leaves})  
    } catch (error) {
      console.log(error);
      return res.status(500).json({success:false, err: " leave get server  error"})
        
    }
}
const getLeaveDetail = async(req, res)=>{
try {
    const {id}= req.params;
    // console.log(id);
    
     const leave= await Leave.findById({_id:id}).populate({
        path:"employeeId", populate:[
           { path: "department",
            select : "dept_name"
        },
            {
                path: "userId",
                select:"name  profileImage"
            }
        ]
     });
    
     
return res.status(200).json({success: true, leave})  
    } catch (error) {
      console.log(error);
      return res.status(500).json({success:false, err: " leave get server  error"})
        
    }
}

const getAllLeaves = async(req, res)=>{
try {
   
    //  const employee= await Employee.find();
     const leaves= await Leave.find().populate({
        path:"employeeId", populate:[
           { path: "department",
            select : "dept_name"
        },
            {
                path: "userId",
                select:"name"
            }
        ]
     });
     
return res.status(200).json({success: true, leaves})  
    } catch (error) {
      console.log(error);
      return res.status(500).json({success:false, err: " leave get server  error"})
        
    }
}

export { addLeave , getleave, getAllLeaves, getLeaveDetail, updateLeave};


