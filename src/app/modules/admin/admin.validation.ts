import Joi from 'joi';
import { IAdmin } from './admin.interface';

export const adminSchema = Joi.object({
    phoneNumber: Joi.string().required(),
    role: Joi.string().valid('admin').required(),
    password: Joi.string().required(),
    name: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
    }).required(),
    address: Joi.string().required(),

});

export function validateAdminData(data: IAdmin) {
    return adminSchema.validate(data);
}

