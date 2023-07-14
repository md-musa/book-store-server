import { UnauthorizedError } from '../utils/errors';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../config';

const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //get authorization token
    const token = req.cookies['refreshToken'];
    if (!token) throw new UnauthorizedError('You are not authorized');

    // verify token
    const verifiedUser = jwt.verify(token, config.jwt.refresh_token_secret as Secret);
    if (!verifiedUser) throw new UnauthorizedError('Please login');

    req.user = verifiedUser as JwtPayload;

    next();
  } catch (error) {
    next(error);
  }
};

export default authenticateUser;
