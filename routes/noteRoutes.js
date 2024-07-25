import express from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
} from '../controllers/noteController.js';
import authenticate from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate); // Apply authentication middleware to all routes

router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
