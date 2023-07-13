import { Schema } from 'mongoose';

type Location =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh';
type Breed =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej';
type Label = 'for sale' | 'sold out';
type Category = 'Dairy' | 'Beef' | 'Dual Purpose';

export interface ICow {
  name: string;
  age: number;
  price: number;
  location: Location;
  breed: Breed;
  weight: number;
  label: Label;
  category: Category;
  seller: Schema.Types.ObjectId; // Reference ID of the seller
}

export interface CowFilters {
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  breed?: string;
  category?: string;
  searchTerm?: string;
}

export interface CowQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  searchTerm?: string;
}
