import { UnauthorizedError } from '../utils/errors';
import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../../config';

const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //get authorization token
    const token = req.headers.authorization;
    if (!token) {
      throw new UnauthorizedError('You are not authorized');
    }
    // verify token
    let verifiedUser = null;

    verifiedUser = jwt.verify(token, config.jwt.secret as Secret);
    if (!verifiedUser) throw new UnauthorizedError('You are not authorized');

    req.user = {
      role: verifiedUser.role,
      id: verifiedUser._id,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default authenticateUser;
