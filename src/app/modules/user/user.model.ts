import mongoose, { Schema } from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from "bcrypt"
import config from '../../../config';

const userSchema = new Schema<IUser>(
  {
    password: {
      type: String,
      // select: false,
      required: true,
    },
    role: {
      type: String,
      enum: ['seller', 'buyer'],
      default: 'seller',
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  )

  next();
})


const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;
