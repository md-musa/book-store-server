import { IUser } from './../auth/auth.interface';
import { NotfoundError, UnauthorizedError } from '../../utils/errors';
import { BookFilters, IBook } from './book.interface';
import BookModel from './book.model';
import { JwtPayload } from 'jsonwebtoken';

export const insertBook = async (bookData: IBook): Promise<IBook> => {
  return await BookModel.create(bookData);
};

export async function getBooks(page: number, limit: number, filters: BookFilters): Promise<{ results: IBook[]; totalCount: number }> {
  const skip = (page - 1) * limit;

  const query = BookModel.find({});

  if (filters.publicationYear) {
    query.where('publicationYear').equals(filters.publicationYear);
  }

  if (filters.genre) {
    query.where('genre').equals(filters.genre);
  }

  if (filters.searchTerm) {
    const searchRegex = new RegExp(filters.searchTerm, 'i');
    query.or([{ title: searchRegex }, { author: searchRegex }, { genre: searchRegex }]);
  }

  const results = await query.skip(skip).limit(limit).exec();
  const totalCount = await BookModel.countDocuments(query).exec();

  return { results, totalCount };
}

export async function getSingleBook(bookId: string): Promise<IBook | null> {
  const book = await BookModel.findById(bookId);
  if (!book) throw new NotfoundError('book is not found with the given id!');

  return book;
}

export async function updateSingleBook(user: JwtPayload, bookId: string, updateData: IBook): Promise<IBook | null> {
  const book = await BookModel.findById(bookId);
  if (!book) throw new NotfoundError("Book doesn't exist!");

  if (user._id != book.user) throw new UnauthorizedError('You are not authorized');

  const { title, author, genre, publicationDate } = updateData;

  if (title) book.title = title;
  if (genre) book.genre = genre;
  if (author) book.author = author;
  if (publicationDate) book.publicationDate = publicationDate;

  return await book.save();
}

export async function deleteSingleBook(user: JwtPayload, bookId: string): Promise<IBook | null> {
  const book = await BookModel.findById(bookId);
  console.log(book);
  if (!book) throw new NotfoundError("Book doesn't exist!");

  if (user._id != book.user) throw new UnauthorizedError('You are not authorized to perform this action');

  return await BookModel.findByIdAndDelete(bookId);
}
