import express from 'express';
import authmiddleware from '../middleware/authmiddleware.js';
import { getsummary } from '../controller/dashboardController.js';
const router = express.Router();
router.get('/summary', authmiddleware, getsummary);
export default router;