import mongoose, { Schema } from 'mongoose';
import { ICow } from './cow.interface';

const cowSchema = new Schema<ICow>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
    enum: [
      'Dhaka',
      'Chattogram',
      'Barishal',
      'Rajshahi',
      'Sylhet',
      'Comilla',
      'Rangpur',
      'Mymensingh',
    ],
  },
  breed: {
    type: String,
    required: true,
    enum: [
      'Brahman',
      'Nellore',
      'Sahiwal',
      'Gir',
      'Indigenous',
      'Tharparkar',
      'Kankrej',
    ],
  },
  weight: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    enum: ['for sale', 'sold out'],
    default: 'for sale',
  },
  category: {
    type: String,
    required: true,
    enum: ['Dairy', 'Beef', 'Dual Purpose'],
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true,
  },
});

const CowModel = mongoose.model<ICow>('Cow', cowSchema);

export default CowModel;
