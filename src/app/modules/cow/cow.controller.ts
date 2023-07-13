import { Response, Request } from 'express';
import * as CowService from './cow.service';
import { CowFilters, CowQueryParams, ICow } from './cow.interface';
import sendResponse from '../../utils/sendResponse';
import { updatedCowValidate, validateCowData } from './cow.validation';
import { UnprocessableEntityError, NotfoundError } from '../../utils/errors';

/**
 * @description Create a new cow with the provided data.
 * @route   POST /api/cows
 * @access  Public
 */
export const createCow = async (req: Request, res: Response): Promise<void> => {
  const cowData: ICow = req.body;
  const { error } = validateCowData(cowData);
  if (error) throw new UnprocessableEntityError(error);

  const createdCow = await CowService.createCowService(cowData);
  sendResponse(res, 201, 'Cow created successfully', createdCow);
};

/**
 * @description Retrieve paginated and filtered cow listings based on provided query parameters.
 * @route   GET /api/cows/listings
 * @access  Public
 */
export const getAllCows = async (req: Request, res: Response): Promise<void> => {
  const queryParams: CowQueryParams = req.query;
  const { page = 1, limit = 5, sortBy = 'name', sortOrder = 'asc', minPrice, maxPrice, location, searchTerm } = queryParams;

  const filters: CowFilters = {};

  if (minPrice) {
    filters.minPrice = minPrice;
  }

  if (maxPrice) {
    filters.maxPrice = maxPrice;
  }

  if (location) {
    filters.location = location;
  }

  if (searchTerm) {
    filters.searchTerm = searchTerm;
  }

  const { results, totalCount } = await CowService.getCowListings(Number(page), Number(limit), sortBy, sortOrder, filters);

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
export const getSingleCow = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const cow = await CowService.getSingleCow(id);

  sendResponse(res, 200, 'Cow retrieved successfully', cow);
};

/**
 * @description Update a single cow by its ID with the provided data.
 * @route   PUT /api/cows/:id
 * @access  Public
 */
export const updateSingleCow = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updatedData: ICow = req.body;
  const { error } = updatedCowValidate(updatedData);
  if (error) throw new UnprocessableEntityError(error);

  const updatedCow = await CowService.updateSingleCow(req, id, updatedData);

  sendResponse(res, 200, 'Cow data updated successfully', updatedCow);
};

/**
 * @description Delete a single cow by its ID.
 * @route   DELETE /api/cows/:id
 * @access  Public
 */
export const deleteSingleCow = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const deletedCow = await CowService.deleteSingleCow(req, id);
  if (!deletedCow) throw new NotfoundError('Cow is not found with the given id');

  sendResponse(res, 202, 'Cow is deleted successfully', deletedCow);
};
