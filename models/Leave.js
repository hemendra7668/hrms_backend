import mongoose, { mongo } from "mongoose";
import { Schema } from "mongoose";
const leaveschema  = new Schema({
    employeeId: {type: Schema.Types.ObjectId, ref: "Employee", required:true},
    leaveType: { type: String, enum:["Sick Leave" , "Casual Leave", "Annual Leave"]},
    startDate: { type: Date, required: true},
    endDate: { type: Date, required: true},
    Reason: { type: String, required: true},
    status: { type: String, required: true,enum:["Pending" , "Approved", "Rejected"], default:"Pending"},
    appliedAt: { type: Date, default:Date.now},
    updatedAt: { type: Date, default:Date.now},
});

const Leave = mongoose.model("Leave",leaveschema);
export default Leave;