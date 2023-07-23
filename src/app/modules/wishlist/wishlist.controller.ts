import { Request, Response } from 'express';
import * as WishlistService from './wishlist.service';
import sendResponse from '../../utils/sendResponse';
import { ObjectId } from 'mongoose';

export const addToWishlistHandler = async (req: Request, res: Response): Promise<void> => {
  const { bookId } = req.params;
  const userId = req.user._id;

  const payload = { book: bookId, user: userId as ObjectId };
  const wishlist = await WishlistService.addToWishlist(payload);

  sendResponse(res, 201, 'Added to wishlist successfully', wishlist);
};

export const removeFromWishlistHandler = async (req: Request, res: Response): Promise<void> => {
  const { bookId } = req.params;
  const userId = req.user._id;
  const wishlist = await WishlistService.removeFromWishlist({ book: bookId, user: userId });

  sendResponse(res, 200, 'Successfully removed from wishlist', wishlist);
};

export const getWishlistHandler = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user._id;
  const wishlist = await WishlistService.getWishlist(userId);

  sendResponse(res, 200, 'Wishlist retrieve successfully', wishlist);
};
