import express from 'express';
import authmiddleware from '../middleware/authmiddleware.js';
import { changePass } from '../controller/settingController.js';

const router = express.Router();

router.put('/change-password', authmiddleware,  changePass)

// router.get('/:id', authmiddleware, getSalary)

export default router;