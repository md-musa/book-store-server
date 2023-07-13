import { ApiResponse } from '../../utils/sendResponse';
import { Response, Request } from 'express';
import * as UserService from './user.service';
import { NotfoundError, UnauthorizedError, UnprocessableEntityError } from '../../utils/errors';
import { validateProfileUpdateInformation, validateUser } from './user.validation';
import { IUser } from './user.interface';
import sendResponse from '../../utils/sendResponse';

/**
 * @description Get all users
 * @route       GET /users
 * @access      Public
 */
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const users: IUser[] = await UserService.getAllUsers();
  sendResponse(res, 200, 'Users retrieve successfully', users);
};

/**
 * @description Get a user by ID
 * @route       GET /users/:id
 * @access      Public
 */
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const userId: string = req.params.id;
  const user = await UserService.getUserById(userId);

  if (!user) throw new NotfoundError('User not found');

  sendResponse(res, 200, 'User retrieve successfully', user);
};

/**
 * @description Update a user
 * @route       PATCH /users/:id
 * @access      Public
 */
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const userId: string = req.params.id;
  const userData: IUser = req.body;

  const user = await UserService.updateUserProfileInformation(userId, userData);
  sendResponse(res, 200, 'User updated successfully', user);
};

/**
 * @description Delete a user
 * @route       DELETE /users/:id
 * @access      Public
 */
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;

  const user = await UserService.deleteUser(userId);
  if (!user) throw new NotfoundError('User is not found!');

  sendResponse(res, 200, 'User deleted successfully', user);
};

/**
 * @description Get user's profile information
 * @route       GET /users/my-profile
 * @access      User
 */
export const myProfile = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user.id;

  const user = await UserService.getUserProfileInformation(userId);

  if (user._id != req.user.id) throw new UnauthorizedError('You are not authorized');

  const data = {
    _id: user._id,
    name: user.name,
    phoneNumber: user.phoneNumber,
    address: user.address,
  };

  sendResponse(res, 200, 'User retrieve successfully', data);
};

/**
 * @description Update user profile information
 * @route       PATCh /users/my-profile
 * @access      User
 */
export const updateMyProfile = async (req: Request, res: Response): Promise<void> => {
  const userData = req.body;
  const userId = req.user.id; // Access from req object

  const { error } = validateProfileUpdateInformation(req.body);
  if (error) throw new UnprocessableEntityError(error);

  const user = await UserService.updateUserProfileInformation(userId, userData);
  if (user._id != req.user.id) throw new UnauthorizedError('You are not authorized');

  const data = {
    name: user?.name,
    phoneNumber: user?.phoneNumber,
    address: user?.address,
  };

  sendResponse(res, 200, 'User updated successfully', data);
};
