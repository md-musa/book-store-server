import { UnauthorizedError } from '../utils/errors';
import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../../config';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.cookies['refreshToken'];
      console.log(token);
      if (!token) {
        throw new UnauthorizedError('You are not authorized');
      }
      // verify token
      let verifiedUser = null;

      verifiedUser = await jwt.verify(token, config.jwt.refresh_secret as Secret);

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new UnauthorizedError('You are not authorized');
      }
      console.log(verifiedUser);
      req.user = {
        role: verifiedUser.role,
        id: verifiedUser.id,
      };
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
