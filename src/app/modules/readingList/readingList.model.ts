import { Schema, model } from 'mongoose';

export interface IReadingList {
  book: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  status: 'reading' | 'read soon' | 'finished';
}

const readingListSchema = new Schema<IReadingList>({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['reading', 'read soon', 'finished'],
    default: 'read soon',
  },
});

const ReadingListModel = model<IReadingList>('ReadingList', readingListSchema);

export default ReadingListModel;
