import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ConflictError, NotfoundError, UnauthorizedError } from '../../utils/errors';
import { IUser } from './user.interface';
import UserModel from './user.model';
import config from '../../../config';

export const createUser = async (userData: IUser) => {
  let user = await UserModel.findOne({ phoneNumber: userData.phoneNumber });
  console.log(user);
  if (user) throw new ConflictError("User already exits");

  user = new UserModel(userData);
  await user.save();

  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    config.jwt.secret as Secret,
    { expiresIn: '5d' }
  )
  const refreshToken = jwt.sign(
    { id: user._id, role: user.role },
    config.jwt.refresh_secret as Secret,
    { expiresIn: "20d" }
  )
  console.log("-------------------")
  console.log(accessToken, refreshToken, user);

  return { accessToken, refreshToken, user };


};

export const loginUser = async (payload: IUser) => {
  const { phoneNumber, password } = payload;

  const user = await UserModel.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, role: 1 }).lean();

  if (!user) throw new NotfoundError("User does not exist");

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  console.log(user.password, password)
  console.log(isPasswordMatched)
  if (!isPasswordMatched) throw new UnauthorizedError("Invalid password");


  const accessToken = jwt.sign(
    user,
    config.jwt.secret as Secret,
    { expiresIn: '5d' }
  )
  const refreshToken = jwt.sign(
    {
      id: user?._id,
      role: user?.role
    },
    config.jwt.refresh_secret as Secret,

    { expiresIn: "20d" }
  )

  return { accessToken, refreshToken, user };

}


export const getAllUsers = (): Promise<IUser[]> => {
  return UserModel.find({}).exec();
};

export const getUserById = (userId: string): Promise<IUser | null> => {
  return UserModel.findById(userId).exec();
};

export const updateUser = async (userId: string, userData: IUser):
  Promise<IUser | null> => {
  return await UserModel.findByIdAndUpdate(userId, userData, { new: true });
};

export const deleteUser = async (userId: string): Promise<IUser | null> => {

  const deletedUser = await UserModel.findByIdAndDelete(userId);
  return deletedUser;
};


export const getUserProfileInformation = async (userId: string): Promise<IUser | null> => {
  const user = await UserModel.findById(userId);
  if (!user) throw new NotfoundError("User does not exits");
  return user;
};
export const updateUserProfileInformation = async (userId: string, newData: IUser): Promise<IUser | null> => {

  try {
    const user = await UserModel.findById(userId);
    console.log(user);
    if (!user) throw new NotfoundError("User doesn't exist!");

    const { name, address, income, budget, role, phoneNumber, password } = newData;
    if (name?.firstName) user.name.firstName = name.firstName;
    if (name?.lastName) user.name.lastName = name.lastName;
    if (address) user.address = address;
    if (income) user.income = income;
    if (budget) user.budget = budget;
    if (role) user.role = role;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (password) user.password = password; // Mongoose pre-hook will hash the password

    return await user.save();

  }
  catch (error) {
    throw error;
  }
};

