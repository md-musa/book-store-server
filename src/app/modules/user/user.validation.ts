import { IUser } from './user.interface';
import Joi from 'joi';

const userSchema = Joi.object({
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('buyer').valid('seller').required(),
  name: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }).required(),
  phoneNumber: Joi.string().required(),
  address: Joi.string().required(),
  budget: Joi.number().positive().required(),
  income: Joi.number().default(0),
});

export function validateUser(userData: IUser) {
  return userSchema.validate(userData);
}

const userProfileChangeSchema = Joi.object({
  password: Joi.string().min(6),
  role: Joi.string().valid('buyer').valid('seller'),
  name: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
  }),
  phoneNumber: Joi.string(),
  address: Joi.string(),
  budget: Joi.number().positive(),
  income: Joi.number().default(0),
});

export function validateProfileUpdateInformation(userData: IUser) {
  return userProfileChangeSchema.validate(userData);
}
