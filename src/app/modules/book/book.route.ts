import express from 'express';
const router = express.Router();
import * as BookController from './book.controller';
import auth from '../../middlewares/auth';

router.post('/', BookController.createBook);
router.get('/', BookController.getBooks);
router.get('/:id', BookController.getSingleBook);
router.patch('/:id', BookController.updateSingleBook);
router.delete('/:id', BookController.deleteSingleBook);

export default router;
