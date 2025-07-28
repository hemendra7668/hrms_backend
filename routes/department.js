import express from 'express';
import { addDepartment , getDepartments, getDepartment, updateDepartment,deleteDepartment} from '../controller/departmentController.js';
import authmiddleware from '../middleware/authmiddleware.js';

const router = express.Router();
router.post('/add', authmiddleware, addDepartment)
router.get('/', authmiddleware, getDepartments)
router.get('/:id', authmiddleware, getDepartment)
router.put('/:id', authmiddleware, updateDepartment)
router.delete('/:id', authmiddleware, deleteDepartment)

export default router;