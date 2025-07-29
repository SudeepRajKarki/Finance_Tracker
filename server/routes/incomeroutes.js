import express from 'express';
import { addIncome, getIncome,deleteIncome } from '../controllers/incomeController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addIncome);
router.get('/', protect, getIncome);
router.delete('/:id', protect, deleteIncome);


export default router;
