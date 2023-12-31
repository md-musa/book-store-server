import { Request, Response } from 'express';
import { IUser } from './auth.interface';
import { validateUser } from './auth.validation';
import { BadRequestError, UnauthorizedError, UnprocessableEntityError } from '../../utils/errors';
import * as UserService from './auth.service';
import sendResponse from '../../utils/sendResponse';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../../../config';

/**
 * @description Sign up a new user
 * @route       POST /auth/sinup
 * @access      Public
 * @returns     {Object} Created user data
 */
export const signup = async (req: Request, res: Response): Promise<void> => {
  const userData: IUser = req.body;

  const { error } = validateUser(userData);
  if (error) throw new UnprocessableEntityError(error);

  const { accessToken, refreshToken, user } = await UserService.createUser(userData);
  const { name, _id } = user;

  res.cookie('refreshToken', refreshToken);
  sendResponse(res, 201, 'User created successfully', { accessToken, user: { name, _id } });
};

/**
 * @description Login a user
 * @route       POST /auth/login
 * @access      Public
 * @returns     {Object} logged in user data
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  const { accessToken, refreshToken, user } = await UserService.loginUser(req.body);
  const { name, _id } = user;

  res.cookie('refreshToken', refreshToken);
  sendResponse(res, 200, 'User logged in successfully', { accessToken, user: { name, _id } });
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

  const decodedUserInfo = jwt.verify(refreshToken, config.jwt.refresh_token_secret as Secret);

  console.log(decodedUserInfo);
  if (!decodedUserInfo) throw new UnauthorizedError('Please login');
  const { email, _id } = decodedUserInfo;

  const accessToken = jwt.sign({ _id, email }, config.jwt.access_token_secret as Secret, {
    expiresIn: '5d',
  });

  sendResponse(res, 200, 'Access Token generated successfully', { accessToken });
};
