import { Request, Response } from 'express';
import * as WishlistService from './readingList.service';
import sendResponse from '../../utils/sendResponse';

export const addToReadingList = async (req: Request, res: Response): Promise<void> => {
  const { book, status } = req.body;
  const userId = req.user._id;
  const list = await WishlistService.addToReadingList({ book, user: userId, status });

  sendResponse(res, 201, 'Added to wishlist successfully', list);
};

export const getReadingList = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user._id;
  const list = await WishlistService.getReadingList(userId);

  sendResponse(res, 200, 'Wishlist retrieve successfully', list);
};

export const removeFromReadingList = async (req: Request, res: Response): Promise<void> => {
  const { book } = req.params;
  const userId = req.user._id;

  const list = await WishlistService.removeFromReadingList(book, userId);

  sendResponse(res, 200, 'Successfully removed from wishlist', list);
};
