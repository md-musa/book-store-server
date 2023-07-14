import Joi from 'joi';
import { IBook } from './book.interface';

const bookSchema = Joi.object({
  title: Joi.string().required(),
  image: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
  details: Joi.string().required(),
  language: Joi.string().required(),
  publicationDate: Joi.date().required(),
  user: Joi.string().required(),

  reviews: Joi.array().items(
    Joi.object({
      rating: Joi.number().required(),
      description: Joi.string().required(),
      user: Joi.string().required(),
    })
  ),
});

export function validateBookData(bookData: IBook) {
  return bookSchema.validate(bookData);
}
