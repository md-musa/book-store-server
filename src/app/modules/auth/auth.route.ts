import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/roles';
import * as AuthController from './auth.controller';

const router = express.Router();

router.post('/signup', AuthController.createUser);
router.post('/login', AuthController.userLogin);
router.post('/refresh-token', AuthController.generateRefreshToken);

export default router;
