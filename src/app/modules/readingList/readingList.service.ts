import { ConflictError } from '../../utils/errors';
import ReadingListModel, { IReadingList } from './readingList.model';

export const addToReadingList = async (payload: IReadingList): Promise<IReadingList> => {
  const list = await ReadingListModel.findOne({ user: payload.user, book: payload.book });
  if (list) throw new ConflictError('The book already in your list');

  const newReadingList = new ReadingListModel(payload);
  return await newReadingList.save();
};

export const removeFromReadingList = async (bookId: string, userId: string): Promise<void> => {
  await ReadingListModel.findOneAndDelete({ bookId, userId }).exec();
};

export const getReadingList = async (userId: string): Promise<IReadingList[]> => {
  return await ReadingListModel.find({ user: userId }).populate('book').exec();
};
