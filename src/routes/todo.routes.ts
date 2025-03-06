import express from 'express';
import {
    create,
    getByDate,
    update,
    remove,
    complete,
    uncomplete,
    setReminder
} from '../controllers/todo.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authMiddleware, create);
router.get('/:date', authMiddleware, getByDate);
router.put('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, remove);
router.patch('/:id/complete', authMiddleware, complete);
router.patch('/:id/uncomplete', authMiddleware, uncomplete);
router.post('/:id/reminder', authMiddleware, setReminder);

export default router;
