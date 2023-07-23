import { ConflictError, NotfoundError } from '../../utils/errors';
import ReadingListModel, { IReadingList } from './readingList.model';

export const addToReadingList = async (payload: IReadingList): Promise<IReadingList> => {
  const { user, status, book } = payload;
  const list = await ReadingListModel.findOne({ user, book });
  if (list) throw new ConflictError('The book already in your list');

  const newReadingList = new ReadingListModel(payload);
  return await newReadingList.save();
};

export const updateStatus = async (payload: IReadingList): Promise<IReadingList> => {
  const { user, status, book } = payload;
  const list = await ReadingListModel.findOne({ user, book });
  if (!list) throw new NotfoundError('Book does not exits');

  list.status = status;
  return await list.save();
};

export const removeFromReadingList = async (bookId: string, userId: string): Promise<void> => {
  await ReadingListModel.findOneAndDelete({ bookId, userId }).exec();
};

export const getReadingList = async (userId: string): Promise<IReadingList[]> => {
  return await ReadingListModel.find({ user: userId }).populate('book').exec();
};
