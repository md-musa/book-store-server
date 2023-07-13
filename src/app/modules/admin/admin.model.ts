import { Schema, model } from "mongoose";
import { IAdmin } from "./admin.interface";
import bcrypt from 'bcrypt';
import config from "../../../config";

const adminSchema = new Schema<IAdmin>(
    {
        phoneNumber: {
            type: String,
            required: true,
            unique: true
        },
        role: {
            type: String,
            enum: ['admin'],
            default: 'admin'
        },
        password: { type: String, required: true, select: 0 },
        name: {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
        },
        address: { type: String, required: true },
    },
    { timestamps: true }
);

adminSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_rounds)
    )

    next();
})

const AdminModel = model<IAdmin>('Admin', adminSchema);




export default AdminModel;
