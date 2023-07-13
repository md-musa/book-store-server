import mongoose from 'mongoose';

export interface IOrder {
  cow: mongoose.Types.ObjectId;
  buyer: mongoose.Types.ObjectId;
}
