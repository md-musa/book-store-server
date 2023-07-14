import { Request, Response } from 'express';
import * as WishlistService from './readingList.service';
import sendResponse from '../../utils/sendResponse';

export const addToReadingList = async (req: Request, res: Response): Promise<void> => {
  const { book, user, status } = req.body;
  const list = await WishlistService.addToReadingList({ book, user, status });

  sendResponse(res, 201, 'Added to wishlist successfully', list);
};

export const getReadingList = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const list = await WishlistService.getReadingList(userId);

  sendResponse(res, 200, 'Wishlist retrieve successfully', list);
};

export const removeFromReadingList = async (req: Request, res: Response): Promise<void> => {
  const { bookId, user } = req.body;
  // const user = req.user;
  const list = await WishlistService.removeFromReadingList(bookId, user);

  sendResponse(res, 200, 'Successfully removed from wishlist', list);
};
