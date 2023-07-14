import { Response, Request } from 'express';
import * as BookService from './book.service';
import sendResponse from '../../utils/sendResponse';
import { UnprocessableEntityError, NotfoundError } from '../../utils/errors';
import { BookFilters, BookQueryParams, IBook } from './book.interface';
import { validateBookData } from './book.validation';

/**
 * @description Create a new book with the provided data.
 * @route   POST /api/cows
 * @access  Public
 */
export const createBook = async (req: Request, res: Response): Promise<void> => {
  const bookData: IBook = req.body;
  const { error } = validateBookData(bookData);
  if (error) throw new UnprocessableEntityError(error);

  const book = await BookService.insertBook(bookData);
  sendResponse(res, 201, 'Cow created successfully', book);
};

/**
 * @description Retrieve paginated and filtered cow listings based on provided query parameters.
 * @route   GET /api/cows/listings
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
    message: 'Cows retrieved successfully',
    meta: {
      page: Number(page),
      limit: Number(limit),
    },
    data: results,
  });
};

/**
 * @description Retrieve a single cow by its ID.
 * @route   GET /api/cows/:id
 * @access  Public
 */
export const getSingleBook = async (req: Request, res: Response): Promise<void> => {
  const { bookId } = req.params;

  const cow = await BookService.getSingleBook(bookId);
  sendResponse(res, 200, 'Cow retrieved successfully', cow);
};

/**
 * @description Update a single cow by its ID with the provided data.
 * @route   PUT /api/cows/:id
 * @access  Public
 */
export const updateSingleBook = async (req: Request, res: Response): Promise<void> => {
  const { bookId } = req.params;
  const updatedData: IBook = req.body;
  // const { error } = updatedCowValidate(updatedData);

  // if (error) throw new UnprocessableEntityError(error);

  const updatedCow = await BookService.updateSingleBook(bookId, updatedData);

  sendResponse(res, 200, 'Cow data updated successfully', updatedCow);
};

/**
 * @description Delete a single cow by its ID.
 * @route   DELETE /api/cows/:id
 * @access  Public
 */
export const deleteSingleBook = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const deletedCow = await BookService.deleteSingleBook(id);
  if (!deletedCow) throw new NotfoundError('Cow is not found with the given id');

  sendResponse(res, 202, 'Cow is deleted successfully', deletedCow);
};
