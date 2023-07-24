import express from 'express';
const router = express.Router();
import * as ReadingListController from './readingList.controller';
import authenticateUser from '../../middlewares/authenticateUser';

router.get('/', authenticateUser, ReadingListController.getReadingList);
router.post('/:bookId', authenticateUser, ReadingListController.addToReadingList);
router.patch('/:bookId', authenticateUser, ReadingListController.updateStatus);

export default router;
