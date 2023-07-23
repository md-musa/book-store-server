import express from 'express';
import * as WishlistController from './wishlist.controller';
import authenticateUser from '../../middlewares/authenticateUser';
const router = express.Router();

router.get('/', authenticateUser, WishlistController.getWishlistHandler);
router.post('/:bookId', authenticateUser, WishlistController.addToWishlistHandler);
router.delete('/:bookId', authenticateUser, WishlistController.removeFromWishlistHandler);

export default router;
