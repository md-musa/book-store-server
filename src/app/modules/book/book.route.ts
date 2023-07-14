import express from 'express';
const router = express.Router();
import * as BookController from './book.controller';
import authenticateUser from '../../middlewares/authenticateUser';

router.post('/', authenticateUser, BookController.createBook);
router.get('/', BookController.getBooks);
router.get('/:id', BookController.getSingleBook);
router.patch('/:id', authenticateUser, BookController.updateSingleBook);
router.delete('/:id', authenticateUser, BookController.deleteSingleBook);

export default router;
