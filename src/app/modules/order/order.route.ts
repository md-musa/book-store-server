import express from 'express';
const router = express.Router();
import * as OrderController from "./order.controller";
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/roles';
import authenticateUser from '../../middlewares/authenticateUser';

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER), OrderController.getSingleOrder);

router.post('/', auth(ENUM_USER_ROLE.BUYER), OrderController.createOrder);

router.get('/', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER), OrderController.getAllOrders);


export default router;
