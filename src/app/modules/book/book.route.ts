import express from 'express';
const router = express.Router();
import * as BookController from './book.controller';
import authenticateUser from '../../middlewares/authenticateUser';

router.post('/', authenticateUser, BookController.createBook);
router.get('/', BookController.getBooks);
router.get('/:bookId', BookController.getSingleBook);
router.patch('/:bookId', authenticateUser, BookController.updateSingleBook);
router.delete('/:bookId', authenticateUser, BookController.deleteSingleBook);

export default router;
