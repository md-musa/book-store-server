import { Request, Response } from 'express';
import * as AdminService from './admin.service';
import * as AdminValidation from "./admin.validation"
import { NotfoundError, UnprocessableEntityError } from "../../utils/errors"
import sendResponse from '../../utils/sendResponse';

export const createAdminHandler = async (req: Request, res: Response): Promise<void> => {
    const adminData = req.body;
    const { error } = AdminValidation.validateAdminData(adminData);
    if (error) throw new UnprocessableEntityError(error);

    const admin = await AdminService.createAdmin(adminData);

    // const { password, ...others } = admin;
    const data = {
        _id: admin._id,
        role: admin.role,
        name: admin.name,
        phoneNumber: admin.phoneNumber,
        address: admin.address,
    }

    sendResponse(res, 201, "Admin created successfully", data);
};


export const login = async (req: Request, res: Response): Promise<void> => {
    const { accessToken, refreshToken } = await AdminService.loginUser(req.body);

    res.cookie("refreshToken", refreshToken); // Secure options will be added in later
    sendResponse(res, 200, "User logged in successfully", { accessToken });
}


export const getAdminByIdHandler = async (req: Request, res: Response): Promise<void> => {
    const adminId = req.params.id;
    const admin = await AdminService.getAdminById(adminId);
    if (admin) {
        res.json(admin);
    } else {
        res.status(404).json({ error: 'Admin not found' });
    }

};

export const updateAdminHandler = async (req: Request, res: Response): Promise<void> => {
    const adminId = req.params.id;
    const adminData = req.body;
    const updatedAdmin = await AdminService.updateAdmin(adminId, adminData);
    if (updatedAdmin) {
        res.json(updatedAdmin);
    } else {
        res.status(404).json({ error: 'Admin not found' });
    }

};

export const deleteAdminHandler = async (req: Request, res: Response): Promise<void> => {
    const adminId = req.params.id;
    const deletedAdmin = await AdminService.deleteAdmin(adminId);

    if (!deletedAdmin) throw new NotfoundError("Admin does not exits!")
    res.json(deletedAdmin);

};
