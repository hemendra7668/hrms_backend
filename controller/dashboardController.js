import Department from "../models/department.js";
import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";


const  getsummary = async(req, res)=>{
try {
    const total_emp = await Employee.countDocuments();
    const total_dept = await Department.countDocuments();
    const total_sal = await Employee.aggregate([
        {$group : {_id:null, totalsalary: {$sum :  "$salary"}}}
    ]);
    const employeeAppliedforleave = await Leave.distinct('employeeId');
    const leavestatus = await Leave.aggregate([
        {$group: {
            _id: "$status",
            count: {$sum:1}
        }}
    ]);
    const leavesummary = {
        appliedfor: employeeAppliedforleave.length,
        approved: leavestatus.find(item => item._id==="Approved")?.count||0,
        rejected: leavestatus.find(item => item._id==="Rejected")?.count || 0,
        pending: leavestatus.find(item => item._id==="Pending")?.count || 0,
    }
    console.log(total_sal[0].totalsalary);
    

    return res.status(200).json({
        success: true,
        total_dept,
        total_emp,
        totalsalary: total_sal[0]?.totalsalary || 0,
        leavesummary, 
     
    })
} catch (error) {
    return res.status(500).json({success: false, message: "dashboard summary error , please make sure to look into it"})
}
};

export {getsummary};