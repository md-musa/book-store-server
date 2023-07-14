import { Schema } from 'mongoose';

export interface IReview {
  rating: number;
  description: string;
  user: Schema.Types.ObjectId;
}

export interface IBook {
  title: string;
  image: string;
  author: string;
  genre: string;
  details: string;
  language: string;
  publicationDate: Date;
  user: Schema.Types.ObjectId;
  reviews: IReview[];
}

export interface BookFilters {
  genre?: string;
  publicationYear?: Date;
  searchTerm?: string;
}

export interface BookQueryParams {
  page?: number;
  limit?: number;
  genre?: string;
  publicationYear?: Date;
  searchTerm?: string;
}
