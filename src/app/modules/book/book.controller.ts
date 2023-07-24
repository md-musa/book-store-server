import { Response, Request } from 'express';
import * as BookService from './book.service';
import sendResponse from '../../utils/sendResponse';
import { UnprocessableEntityError, NotfoundError } from '../../utils/errors';
import { BookFilters, BookQueryParams, IBook, IReview } from './book.interface';
import { validateBookData, validateReview, validateUpdatedBookData } from './book.validation';
import { JwtPayload } from 'jsonwebtoken';

/**
 * @description Create a new book with the provided data.
 * @route   POST /api/books
 * @access  USER
 * @return  {Objet} of created book
 */
export const createBook = async (req: Request, res: Response): Promise<void> => {
  const bookData: IBook = req.body;
  const { error } = validateBookData(bookData);
  if (error) throw new UnprocessableEntityError(error);

  bookData.user = req.user._id;
  const book = await BookService.insertBook(bookData);
  sendResponse(res, 201, 'book created successfully', book);
};

/**
 * @description Add book review
 * @route   POST /books/add-review/:bookId
 * @access  USER
 * @return {Object} of added review
 */
export const addBookReview = async (req: Request, res: Response): Promise<void> => {
  const bookId: string = req.params.bookId;
  const review: IReview = req.body;

  const { error } = validateReview(review);
  if (error) throw new UnprocessableEntityError(error);
  review.user = req.user._id;

  const book = await BookService.addBookReview(bookId, review);
  sendResponse(res, 201, 'Review added successfully', book);
};

/**
 * @description Retrieve books based on provided query parameters.
 * @route   GET /books/
 * @access  Public
 * @return {Array} of books
 */
export const getBooks = async (req: Request, res: Response): Promise<void> => {
  const queryParams: BookQueryParams = req.query;
  const { page = 1, limit = 10, searchTerm, genre, publicationYear } = queryParams;

  const filters: BookFilters = {};

  if (genre) {
    filters.genre = genre;
  }

  if (publicationYear) {
    filters.publicationYear = publicationYear;
  }

  if (searchTerm) {
    filters.searchTerm = searchTerm;
  }

  const { results, totalCount } = await BookService.getBooks(Number(page), Number(limit), filters);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'books retrieved successfully',
    meta: {
      page: Number(page),
      limit: Number(limit),
    },
    data: results.reverse(),
  });
};

/**
 * @description Retrieve a single book by book id
 * @route   GET /books/:bookId
 * @access  PUBLIC
 * @return {Object} of book
 */
export const getSingleBook = async (req: Request, res: Response): Promise<void> => {
  const { bookId } = req.params;

  const book = await BookService.getSingleBook(bookId);
  if (!book) throw new NotfoundError('Book does not exist with this id');

  sendResponse(res, 200, 'book retrieved successfully', book);
};

/**
 * @description Update a single book by book id with the provided data
 * @route   PATCH /api/books/:id
 * @access  USER
 * @returns {Object} of updated book
 */
export const updateSingleBook = async (req: Request, res: Response): Promise<void> => {
  const { bookId } = req.params;
  const user = req.user;
  const updatedData: IBook = req.body;

  const { error } = validateUpdatedBookData(updatedData);
  if (error) throw new UnprocessableEntityError(error);

  const updatedBook = await BookService.updateSingleBook(user, bookId, updatedData);

  sendResponse(res, 200, 'book data updated successfully', updatedBook);
};

/**
 * @description Delete a single book by its id
 * @route       DELETE /books/:bookId
 * @access      USER
 * @return      {Object} of deleted book
 */
export const deleteSingleBook = async (req: Request, res: Response): Promise<void> => {
  const { bookId } = req.params;
  const user = req.user;

  const book = await BookService.deleteSingleBook(user, bookId);
  sendResponse(res, 202, 'book is deleted successfully', book);
};
