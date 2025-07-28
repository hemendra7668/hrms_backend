import express from 'express';
import { addLeave, getleave , getAllLeaves, getLeaveDetail, updateLeave} from '../controller/leaveController.js';
import authmiddleware from '../middleware/authmiddleware.js';

const router = express.Router();
router.post('/add', authmiddleware, addLeave)
router.get('/detail/:id', authmiddleware, getLeaveDetail)
router.get('/', authmiddleware, getAllLeaves)
router.get('/:id/:role', authmiddleware, getleave)
router.put('/:id', authmiddleware, updateLeave)

export default router; 