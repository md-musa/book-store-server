import express from 'express';
const router = express.Router();
import * as ReadingListController from './readingList.controller';
import authenticateUser from '../../middlewares/authenticateUser';

router.post('/', authenticateUser, ReadingListController.addToReadingList);
router.get('/', authenticateUser, ReadingListController.getReadingList);
router.get('/:userId', authenticateUser, ReadingListController.removeFromReadingList);

export default router;
