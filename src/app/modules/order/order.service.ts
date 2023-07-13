import mongoose from 'mongoose';
import OrderModel from './order.model';
import CowModel from '../cow/cow.model';
import UserModel from '../user/user.model';
import { IOrder } from './order.interface';
import { BadRequestError, NotfoundError } from "../../utils/errors"
import { ENUM_USER_ROLE } from '../../../enums/roles';



export async function createOrder(cowId: string, buyerId: string): Promise<IOrder | null> {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const cow = await CowModel.findById(cowId).session(session);
    const buyer = await UserModel.findById(buyerId).session(session);

    // if cow & buyer do not exits, close the transaction
    if (!cow || !buyer) {
      await session.abortTransaction();
      session.endSession();
      return null;
    }

    if (buyer.budget < cow.price) {
      await session.abortTransaction();
      session.endSession();
      throw new BadRequestError('Insufficient funds'); // handle this in later
    }

    const seller = await UserModel.findById(cow.seller).session(session);

    if (!seller) {
      await session.abortTransaction();
      session.endSession();
      throw new NotfoundError('Seller not found');
    }

    cow.label = 'sold out';
    buyer.budget -= cow.price;
    seller.income += cow.price;

    await cow.save({ session });
    await buyer.save({ session });
    await seller.save({ session });

    const order: IOrder = await OrderModel.create(
      [{ cow: cowId, buyer: buyerId }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return order;
  } catch (error) {

    throw error;
  }
}

export const getAllOrders = async (): Promise<IOrder[]> => {
  return await OrderModel.find({}).populate({ path: "cow" })

}


export const getSingleOrder = async (orderId: string): Promise<IOrder | null> => {
  return await OrderModel.findById(orderId).populate('cow').populate('buyer');
}
