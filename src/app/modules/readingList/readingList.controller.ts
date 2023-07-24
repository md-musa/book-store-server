import { Request, Response } from 'express';
import * as WishlistService from './readingList.service';
import sendResponse from '../../utils/sendResponse';

/**
 * @description Add book to reading list
 * @route   POST /readingLists/:bookId
 * @access  USER
 * @return  {Objet} of added book
 */
export const addToReadingList = async (req: Request, res: Response): Promise<void> => {
  const { bookId } = req.params;
  const { status } = req.body;
  const userId = req.user._id;

  const payload = {
    book: bookId,
    status,
    user: userId,
  };
  const list = await WishlistService.addToReadingList(payload);

  sendResponse(res, 201, 'Added to wishlist successfully', list);
};

/**
 * @description Update book reading status
 * @route   PATCH /readingLists/:bookId
 * @access  USER
 * @return  {Objet} updated book
 */
export const updateStatus = async (req: Request, res: Response): Promise<void> => {
  const { bookId } = req.params;
  const { status } = req.body;
  const userId = req.user._id;

  const payload = {
    book: bookId,
    status,
    user: userId,
  };
  const list = await WishlistService.updateStatus(payload);

  sendResponse(res, 201, 'Added to wishlist successfully', list);
};

/**
 * @description Get reading list
 * @route   GET /readingLists
 * @access  USER
 * @return  {Array} of reading books
 */
export const getReadingList = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user._id;
  const list = await WishlistService.getReadingList(userId);

  sendResponse(res, 200, 'Wishlist retrieve successfully', list);
};
