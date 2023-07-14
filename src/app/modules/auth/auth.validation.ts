import { IUser } from './auth.interface';
import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export function validateUser(userData: IUser) {
  return userSchema.validate(userData);
}
