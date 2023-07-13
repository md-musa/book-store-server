import express from 'express';
import * as UserController from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/roles';
import authenticateUser from '../../middlewares/authenticateUser';

const router = express.Router();


router.get('/my-profile', auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER), UserController.myProfile);
router.patch('/my-profile', auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER), UserController.updateMyProfile);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getUserById);

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.updateUser);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);



export default router;
