import express from "express";
import mongoose, { Schema } from "mongoose";

const salaryschema = mongoose.Schema({
employeeId : { type: Schema.Types.ObjectId, ref: "Employee",require:true},
basicSalary : { type: Number, require:true},
allowances : { type: Number},
deductions : { type: Number},
netSalary : {type:Number},
payDate : {type: Date, require: true},
createdAt :{type: Date, default:Date.now},
updatedAt :{type: Date, default:Date.now}
})
const Salary = mongoose.model("Salary", salaryschema);
export default Salary;