import mongoose, { Schema, Document } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>({
  cow: {
    type: mongoose.Types.ObjectId,
    ref: 'Cow',
    required: true,
  },
  buyer: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const OrderModel = mongoose.model<IOrder>('Order', orderSchema);

export default OrderModel;
