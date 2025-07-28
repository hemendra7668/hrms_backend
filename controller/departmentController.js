import Department from "../models/department.js";

const addDepartment = async(req, res)=>{
try {
    const {dept_name, description}=req.body;
    const newdepart = new Department(
        {
           dept_name,
           description 
        }
    )
    await newdepart.save();
    // console.log(res.body);
    
    return res.status(200).json({
        success:true,
        message:"the department is created",
        department: newdepart 
    })
} catch (error) {
    return res.status(500).json({success:false, err: "server department error"})
}
}


const getDepartments = async(req, res)=>{
    try {
      const departments = await Department.find();
      return res.status(200).json({success: true, departments})  
    } catch (error) {
      console.log(error);
      return res.status(500).json({success:false, err: "server department error"})
        
    }
}

const deleteDepartment = async(req, res)=>{
    try {
       const {id}= req.params;
      const departments = await Department.findById({_id:id});
      await departments.deleteOne();
      return res.status(200).json({success: true, departments})  
    } catch (error) {
      console.log(error);
      return res.status(500).json({success:false, err: "delete server department error"})
        
    }
}


const getDepartment = async(req, res)=>{
try {
     const {id}= req.params;
     const department= await Department.findById({_id:id});
       if (!department) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }
return res.status(200).json({success: true, department})  
    } catch (error) {
      console.log(error);
      return res.status(500).json({success:false, err: " get server department error"})
        
    }
}

const updateDepartment = async(req, res)=>{
try {
     const {id}= req.params;
     const {dept_name, description}=req.body;
     const updatedep =await Department.findByIdAndUpdate({_id:id},
      {
        dept_name,
        description
 } )
return res.status(200).json({success: true, updatedep})  
    } catch (error) {
      console.log(error);
      return res.status(500).json({success:false, err: " edit server department error"})
        
    }
}
export {addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment};