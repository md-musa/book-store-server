import { Schema, model } from 'mongoose';
import { IBook, IReview } from './book.interface';

const ReviewSchema = new Schema<IReview>({
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  details: { type: String, required: true },
  language: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reviews: [ReviewSchema],
});

const BookModel = model<IBook>('Book', BookSchema);

export default BookModel;
