import { Schema, Document, model } from 'mongoose';

export interface IWishlist {
  book: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
}

const WishlistSchema = new Schema<IWishlist>({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const WishlistModel = model<IWishlist>('Wishlist', WishlistSchema);

export default WishlistModel;
