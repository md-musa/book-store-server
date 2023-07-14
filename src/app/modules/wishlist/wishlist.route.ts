import express from 'express';
const router = express.Router();
import * as WishlistController from './wishlist.controller';
import auth from '../../middlewares/auth';

router.post('/', WishlistController.addToWishlistHandler);
router.get('/', WishlistController.getWishlistHandler);
router.get('/:userId', WishlistController.removeFromWishlistHandler);

export default router;
