import Joi from 'joi';
import { ICow } from './cow.interface';

const cowSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().integer().positive().required(),
    price: Joi.number().positive().required(),
    location: Joi.string().valid('Dhaka', 'Chattogram', 'Barishal', 'Rajshahi', 'Sylhet', 'Comilla', 'Rangpur', 'Mymensingh').required(),
    breed: Joi.string().valid('Brahman', 'Nellore', 'Sahiwal', 'Gir', 'Indigenous', 'Tharparkar', 'Kankrej').required(),
    weight: Joi.number().positive().required(),
    label: Joi.string().valid('for sale', 'sold out').default('for sale'),
    category: Joi.string().valid('Dairy', 'Beef', 'Dual Purpose').required(),
    seller: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
});

export const validateCowData = (cowData: ICow) => {
    return cowSchema.validate(cowData);
}

const updatedCowSchema = Joi.object({
    name: Joi.string(),
    age: Joi.number().integer().positive(),
    price: Joi.number().positive(),
    location: Joi.string().valid('Dhaka', 'Chattogram', 'Barishal', 'Rajshahi', 'Sylhet', 'Comilla', 'Rangpur', 'Mymensingh'),
    breed: Joi.string().valid('Brahman', 'Nellore', 'Sahiwal', 'Gir', 'Indigenous', 'Tharparkar', 'Kankrej'),
    weight: Joi.number().positive(),
    label: Joi.string().valid('for sale', 'sold out'),
    category: Joi.string().valid('Dairy', 'Beef', 'Dual Purpose'),
    seller: Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
});

export const updatedCowValidate = (cowData: ICow) => {
    return updatedCowSchema.validate(cowData);
}

