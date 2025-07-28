import express from 'express';
import { AddEmployee, upload, getEmployees,getEmployee ,updateEmployee, fetchEmpbyId} from '../controller/employeeController.js';
import authmiddleware from '../middleware/authmiddleware.js';

const router = express.Router();
router.get('/', authmiddleware, getEmployees)
router.post('/add', authmiddleware, upload.single('profileImage'), AddEmployee)

router.get('/:id', authmiddleware, getEmployee)
router.put('/:id', authmiddleware, updateEmployee)
router.get('/department/:id', authmiddleware, fetchEmpbyId)

export default router;