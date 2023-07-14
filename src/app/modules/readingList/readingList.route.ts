import express from 'express';
const router = express.Router();
import * as ReadingListController from './readingList.controller';
import auth from '../../middlewares/auth';

router.post('/', ReadingListController.addToReadingList);
router.get('/', ReadingListController.getReadingList);
router.get('/:userId', ReadingListController.removeFromReadingList);

export default router;
