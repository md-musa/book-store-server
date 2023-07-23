import { ConflictError } from '../../utils/errors';
import WishlistModel, { IWishlist } from './wishlist.model';

export const addToWishlist = async (payload: IWishlist): Promise<IWishlist> => {
  const { user, book } = payload;

  let books = await WishlistModel.find({ user, book });
  if (books.length) throw new ConflictError('Book already exist in your wishlist');

  const createdWishlist = new WishlistModel(payload);
  return await createdWishlist.save();
};

interface IWishlistPayload {
  book: string;
  user: string;
}
export const removeFromWishlist = async (payload: IWishlistPayload): Promise<IWishlist | null> => {
  const { user, book } = payload;
  return await WishlistModel.findOneAndDelete({ user, book });
};

export const getWishlist = async (userId: string): Promise<IWishlist[]> => {
  return await WishlistModel.find({ user: userId }).populate('book').exec();
};
