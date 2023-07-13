import { Request, Response } from 'express';
import * as OrderService from './order.service';
import sendResponse from '../../utils/sendResponse';
import { BadRequestError, NotfoundError, UnauthorizedError } from '../../utils/errors';
import { ENUM_USER_ROLE } from '../../../enums/roles';

// Controller
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const { cow, buyer } = req.body;

  const order = await OrderService.createOrder(cow, buyer);
  console.log("------------------------------???")
  console.log(order)
  sendResponse(res, 200, 'Order created successfully', { order });

};

export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  const user = req.user;
  console.log(user)

  let orders = await OrderService.getAllOrders();

  orders.forEach(o => {
    console.log(o.buyer, user.id)
  })

  if (user.role === ENUM_USER_ROLE.BUYER) {
    orders = orders.filter(order => order.buyer == user.id)
  } else if (user.role === ENUM_USER_ROLE.SELLER) {
    orders = orders.filter(order => order.cow.seller == user.id);
  }
  sendResponse(res, 200, 'Order created successfully', orders);

};

export const getSingleOrder = async (req: Request, res: Response): Promise<void> => {
  const orderId = req.params.id;
  const user = req.user;

  const order = await OrderService.getSingleOrder(orderId);
  if (!order) {
    throw new NotfoundError("Order does not exist with this id!");
  }

  let isAuthorized = false;

  if (user.role === ENUM_USER_ROLE.ADMIN) {
    isAuthorized = true;
  } else if (user.role === ENUM_USER_ROLE.BUYER && order.buyer._id == user.id) {
    isAuthorized = true;
  } else if (user.role === ENUM_USER_ROLE.SELLER && order.cow.seller == user._id) {
    isAuthorized = true;
  }

  if (isAuthorized) {
    sendResponse(res, 200, 'Order retrieved successfully', order);
  } else {
    throw new UnauthorizedError("You are not authorized");
  }
};
