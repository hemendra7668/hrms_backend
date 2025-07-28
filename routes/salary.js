import express from 'express';
import authmiddleware from '../middleware/authmiddleware.js';
import { AddSalary, getSalary } from '../controller/SalaryController.js';
const router = express.Router();
// router.get('/', authmiddleware, getEmployees)
router.post('/add', authmiddleware,  AddSalary)

router.get('/:id/:role', authmiddleware, getSalary)
// router.put('/:id', authmiddleware, updateEmployee)
// router.get('/department/:id', authmiddleware, fetchEmpbyId)

export default router;