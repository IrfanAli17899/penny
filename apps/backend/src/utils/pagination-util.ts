import { Model } from 'mongoose';

export async function paginate<T>(
  model: Model<T>,
  page = 1,
  limit = 10,
  filter: Partial<Record<keyof T, any>> = {}
) {

  const [data, total] = await Promise.all([
    model.find(filter).skip((page - 1) * limit).limit(limit).exec(),
    model.countDocuments(filter).exec(),
  ]);

  return ({
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  });

}
