import { Response, Request } from 'express';
import * as BookService from './book.service';
import sendResponse from '../../utils/sendResponse';
import { UnprocessableEntityError, NotfoundError } from '../../utils/errors';
import { BookFilters, BookQueryParams, IBook } from './book.interface';
import { validateBookData, validateUpdatedBookData } from './book.validation';

/**
 * @description Create a new book with the provided data.
 * @route   POST /api/books
 * @access  Public
 */
export const createBook = async (req: Request, res: Response): Promise<void> => {
  const bookData: IBook = req.body;
  const { error } = validateBookData(bookData);
  if (error) throw new UnprocessableEntityError(error);

  const book = await BookService.insertBook(bookData);
  sendResponse(res, 201, 'book created successfully', book);
};

/**
 * @description Retrieve paginated and filtered book listings based on provided query parameters.
 * @route   GET /api/books/listings
 * @access  Public
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
    data: results,
  });
};

/**
 * @description Retrieve a single book by its ID.
 * @route   GET /api/books/:id
 * @access  Public
 */
export const getSingleBook = async (req: Request, res: Response): Promise<void> => {
  const { bookId } = req.params;

  const book = await BookService.getSingleBook(bookId);
  sendResponse(res, 200, 'book retrieved successfully', book);
};

/**
 * @description Update a single book by its ID with the provided data.
 * @route   PUT /api/books/:id
 * @access  Public
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
 * @description Delete a single book by its ID.
 * @route   DELETE /api/books/:id
 * @access  Public
 */
export const deleteSingleBook = async (req: Request, res: Response): Promise<void> => {
  const { bookId } = req.params;
  const user = req.user;

  const book = await BookService.deleteSingleBook(user, bookId);
  sendResponse(res, 202, 'book is deleted successfully', book);
};
