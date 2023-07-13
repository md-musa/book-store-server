import { NextFunction } from 'express';
import { IAdmin } from "./admin.interface";
import AdminModel from "./admin.model";
import bcrypt from 'bcrypt'
import { UnauthorizedError, NotfoundError, ConflictError } from "../../utils/errors"
import jwt, { Secret } from "jsonwebtoken";
import config from "../../../config";

export const createAdmin = async (adminData: IAdmin): Promise<IAdmin> => {
    try {
        let admin = await AdminModel.findOne({ phoneNumber: adminData.phoneNumber })
        console.log(admin)
        if (admin) throw new ConflictError("Admin already exit!")

        const newAdmin = new AdminModel(adminData);
        return await newAdmin.save();
    }
    catch (error) {
        throw error;
    }
}

export const loginUser = async (payload: IAdmin) => {
    const { phoneNumber, password } = payload;

    const admin = await AdminModel.findOne(
        { phoneNumber },
        { phoneNumber: 1, password: 1, role: 1 }).lean();

    if (!admin) throw new NotfoundError("Admin does not exist");

    const isPasswordMatched = await bcrypt.compare(password, admin?.password);
    if (!isPasswordMatched) throw new UnauthorizedError("Invalid password");


    const accessToken = jwt.sign(
        admin,
        config.jwt.secret as Secret,
        { expiresIn: '5d' }
    )
    const refreshToken = jwt.sign(
        {
            phoneNumber: admin?.phoneNumber,
            role: admin?.role
        },
        config.jwt.refresh_secret as Secret,

        { expiresIn: "20d" }
    )

    return { accessToken, refreshToken, admin };
}




export const getAdminById = async (adminId: string): Promise<IAdmin | null> => {
    return await AdminModel.findById(adminId).exec();
};

export const updateAdmin = async (adminId: string, adminData: Partial<IAdmin>): Promise<IAdmin | null> => {
    return await AdminModel.findByIdAndUpdate(adminId, adminData, { new: true }).exec();
};

export const deleteAdmin = async (adminId: string): Promise<IAdmin | null> => {
    return await AdminModel.findByIdAndDelete(adminId).exec();
};
