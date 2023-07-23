import { UnauthorizedError } from '../utils/errors';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../config';

const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //get authorization token
    console.log(req.headers);
    const token = req.headers['authorization'];

    console.log('Authorization token ', token);
    if (!token) throw new UnauthorizedError('You are not authorized');

    // verify token
    const verifiedUser = jwt.verify(token.split(' ')[1], config.jwt.access_token_secret as Secret);
    if (!verifiedUser) throw new UnauthorizedError('Please login');

    req.user = verifiedUser as JwtPayload;

    next();
  } catch (error) {
    next(error);
  }
};

export default authenticateUser;
