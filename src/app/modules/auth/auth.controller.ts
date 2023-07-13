import { BadRequestError, UnauthorizedError } from '../../utils/errors';
import { Request, Response } from 'express';
import { IUser } from '../user/user.interface';
import { validateUser } from '../user/user.validation';
import { UnprocessableEntityError } from '../../utils/errors';
import * as UserService from '../user/user.service';
import sendResponse from '../../utils/sendResponse';
import jwt, { Secret, decode } from 'jsonwebtoken';
import config from '../../../config';
import cookieParser from 'cookie-parser';

/**
 * @description Sign up a new user
 * @route       POST /auth/sinup
 * @access      Public
 * @returns     {Object} Created user data
 */
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const userData: IUser = req.body;

  const { error } = validateUser(userData);
  if (error) throw new UnprocessableEntityError(error);

  const user = await UserService.createUser(userData);

  const data = {
    _id: user.user._id,
    role: user.user.role,
    address: user.user.address,
  };

  res.cookie('refreshToken', user?.refreshToken);
  sendResponse(res, 201, 'User created successfully', { accessToken: user.accessToken, user: data });
};

/**
 * @description Login a user
 * @route       POST /auth/login
 * @access      Public
 * @returns     {Object} logged-in user data
 */
export const userLogin = async (req: Request, res: Response): Promise<void> => {
  const { accessToken, refreshToken } = await UserService.loginUser(req.body);

  res.cookie('refreshToken', refreshToken);
  sendResponse(res, 200, 'User logged in successfully', { accessToken });
};

/**
 * @description Generate a access token by refresh token if it is valid
 * @route       POST /auth/refresh-token
 * @access      Public
 * @returns     {Object} refresh token
 */
export const generateRefreshToken = async (req: Request, res: Response): Promise<void> => {
  const refreshToken = req.cookies['refreshToken'];
  console.log(refreshToken);
  if (!refreshToken) throw new BadRequestError('Please provide refresh token');

  const decodedUserInfo = await jwt.verify(refreshToken, config.jwt.refresh_secret as Secret);

  console.log(decodedUserInfo);
  if (!decodedUserInfo) throw new UnauthorizedError('Please login');

  const accessToken = jwt.sign({ id: decodedUserInfo._id, role: decodedUserInfo.role }, config.jwt.secret as Secret, { expiresIn: '5d' });

  sendResponse(res, 200, 'Access Token generated successfully', { accessToken });
};
