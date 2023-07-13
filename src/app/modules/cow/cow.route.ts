import express from 'express';
const router = express.Router();
import * as CowController from "./cow.controller";
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/roles';


router.post('/',
    auth(ENUM_USER_ROLE.SELLER),
    CowController.createCow
)
router.get('/',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
    CowController.getAllCows
);
router.get('/:id',
    auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
    CowController.getSingleCow
);
router.patch('/:id',
    auth(ENUM_USER_ROLE.SELLER),
    CowController.updateSingleCow
);
router.delete('/:id',
    auth(ENUM_USER_ROLE.SELLER),
    CowController.deleteSingleCow
);

export default router;
