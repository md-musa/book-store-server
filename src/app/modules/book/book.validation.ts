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

  reviews: Joi.array().items(
    Joi.object({
      rating: Joi.number().greater(0).less(6).required(),
      description: Joi.string().required(),
      user: Joi.string().required(),
    })
  ),
});

const updatedBookSchema = Joi.object({
  title: Joi.string(),
  genre: Joi.string(),
  author: Joi.string(),
  publicationDate: Joi.date(),
});

const reviewSchema = Joi.object({
  rating: Joi.number().greater(0).less(6).required(),
  description: Joi.string().required(),
});
export function validateReview(review: Partial<IBook>) {
  return reviewSchema.validate(review);
}

export function validateBookData(bookData: IBook) {
  return bookSchema.validate(bookData);
}
export function validateUpdatedBookData(bookData: IBook) {
  return updatedBookSchema.validate(bookData);
}
