import { CowFilters, ICow } from './cow.interface';
import { Request, Response } from 'express';
import CowModel from './cow.model';
import { NotfoundError, UnauthorizedError } from '../../utils/errors';

export const createCowService = async (newCowData: ICow): Promise<ICow> => {
  const createdCow = await CowModel.create(newCowData);
  return createdCow;
};

export async function getCowListings(
  page: number,
  limit: number,
  sortBy: string,
  sortOrder: 'asc' | 'desc',
  filters: CowFilters
): Promise<{ results: ICow[]; totalCount: number }> {
  const skip = (page - 1) * limit;

  const sort: { [key: string]: 'asc' | 'desc' } = {};
  sort[sortBy] = sortOrder;

  const query = CowModel.find({});

  if (filters.minPrice) {
    query.where('price').gte(filters.minPrice);
  }

  if (filters.maxPrice) {
    query.where('price').lte(filters.maxPrice);
  }

  if (filters.location) {
    query.where('location').equals(filters.location);
  }

  if (filters.searchTerm) {
    const searchRegex = new RegExp(filters.searchTerm, 'i');
    query.or([{ location: searchRegex }, { breed: searchRegex }, { category: searchRegex }]);
  }

  const results = await query.sort(sort).skip(skip).limit(limit).exec();
  const totalCount = await CowModel.countDocuments(query).exec();

  return { results, totalCount };
}

export async function getSingleCow(cowId: string): Promise<ICow | null> {
  try {
    const cow = await CowModel.findById(cowId);
    if (!cow) throw new NotfoundError('Cow is not found with the given id!');

    return cow;
  } catch (err) {
    throw err;
  }
}
export async function updateSingleCow(req: Request, cowId: string, updateData: Partial<ICow>): Promise<ICow | null> {
  try {
    const cow = await CowModel.findById(cowId);
    console.log(cow);
    if (!cow) throw new NotfoundError("Cow doesn't exist!");

    if (cow.seller != req.user.id) throw new UnauthorizedError('You are not authorized');

    const { name, age, price, location, breed, weight, label, category } = updateData;

    if (name) cow.name = name;
    if (age) cow.age = age;
    if (location) cow.location = location;
    if (breed) cow.breed = breed;
    if (weight) cow.weight = weight;
    if (label) cow.label = label;
    if (category) cow.category = category;

    return await cow.save();
  } catch (error) {
    throw error;
  }
}

export async function deleteSingleCow(req: Request, cowId: string): Promise<ICow | null> {
  try {
    const cow = await CowModel.findById(cowId);

    if (!cow) throw new NotfoundError("Cow doesn't exist!");
    if (cow.seller != req.user.id) throw new UnauthorizedError('You are not authorized');

    return await CowModel.findByIdAndDelete(cowId);
  } catch (err) {
    throw err;
  }
}
