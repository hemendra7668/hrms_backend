import cors from "cors";
import express from "express";
import Connectdb from "./db/db.js";
import authRouter from "./routes/auth.js";
import departmentrouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js" 
import salaryRouter from "./routes/salary.js" 
import leaveRouter from "./routes/leave.js" 
import settingRouter from "./routes/setting.js";
import DashboardRouter from "./routes/dashboard.js";
const app = express();
Connectdb();
// app.use(cors());
app.use(
  cors({
        // origin: "http://localhost:5173", // your frontend URL
    origin: "hrms-neon.vercel.app", // your frontend URL
    credentials: true,
  })
);

app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(express.static('public/uploads'))
app.use("/auth", authRouter);
app.use("/department", departmentrouter);
app.use("/employee", employeeRouter);
app.use("/salary", salaryRouter);
app.use("/leave", leaveRouter);
app.use("/setting", settingRouter);
app.use("/dashboard", DashboardRouter);
// app.post("/register", userRegister);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
