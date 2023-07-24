import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ConflictError, NotfoundError, UnauthorizedError } from '../../utils/errors';
import { IUser } from './auth.interface';
import UserModel from './auth.model';
import config from '../../../config';

export const createUser = async (userData: IUser) => {
  const { name, email, password } = userData;

  let user = await UserModel.findOne({ email });
  if (user) throw new ConflictError('User already exits');

  user = new UserModel({ name, email, password });
  await user.save();

  const accessToken = jwt.sign({ _id: user._id, email: user.email }, config.jwt.access_token_secret as Secret, { expiresIn: '5d' });
  const refreshToken = jwt.sign({ _id: user._id, email: user.email }, config.jwt.refresh_token_secret as Secret, { expiresIn: '20d' });
  console.log(accessToken, refreshToken, user);

  return { accessToken, refreshToken, user };
};

export const loginUser = async (payload: IUser) => {
  const { email, password } = payload;

  const user = await UserModel.findOne({ email });
  if (!user) throw new NotfoundError('User does not exist');

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) throw new UnauthorizedError('Invalid password');

  const accessToken = jwt.sign({ _id: user._id, email: user.email }, config.jwt.access_token_secret as Secret, { expiresIn: '5d' });
  const refreshToken = jwt.sign({ _id: user._id, email: user.email }, config.jwt.refresh_token_secret as Secret, { expiresIn: '20d' });

  return { accessToken, refreshToken, user };
};
