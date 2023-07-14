import WishlistModel, { IWishlist } from './wishlist.model';

export const addToWishlist = async (payload: IWishlist): Promise<IWishlist> => {
  const createdWishlist = new WishlistModel(payload);
  return await createdWishlist.save();
};

export const removeFromWishlist = async (bookId: string, userId: string): Promise<void> => {
  await WishlistModel.findOneAndDelete({ bookId, userId }).exec();
};

export const getWishlist = async (userId: string): Promise<IWishlist[]> => {
  return await WishlistModel.find({ userId }).populate('book').exec();
};
