import express from 'express';
import * as WishlistController from './wishlist.controller';
import authenticateUser from '../../middlewares/authenticateUser';
const router = express.Router();

router.post('/', authenticateUser, WishlistController.addToWishlistHandler);
router.get('/', authenticateUser, WishlistController.getWishlistHandler);
router.delete('/:bookId', authenticateUser, WishlistController.removeFromWishlistHandler);

export default router;
