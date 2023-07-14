import { Request, Response } from 'express';
import * as WishlistService from './wishlist.service';
import sendResponse from '../../utils/sendResponse';

export const addToWishlistHandler = async (req: Request, res: Response): Promise<void> => {
  const { book, user } = req.body;
  const wishlist = await WishlistService.addToWishlist({ book, user });

  sendResponse(res, 201, 'Added to wishlist successfully', wishlist);
};

export const removeFromWishlistHandler = async (req: Request, res: Response): Promise<void> => {
  const { book, user } = req.body;
  await WishlistService.removeFromWishlist(book, user);
  res.status(200).json({ message: 'Successfully removed from wishlist' });
};

export const getWishlistHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const wishlist = await WishlistService.getWishlist(userId);
    res.json(wishlist);
  } catch (error) {
    console.error('Error retrieving wishlist:', error);
    res.status(500).json({ error: 'Failed to retrieve wishlist' });
  }
};
