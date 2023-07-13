import express from 'express'
import * as AdminController from "./admin.controller";
const router = express.Router();

router.post("/create-admin", AdminController.createAdminHandler);
router.post("/login", AdminController.login);

export default router;
