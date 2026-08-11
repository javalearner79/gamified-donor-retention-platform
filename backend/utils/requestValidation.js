import mongoose from 'mongoose';

export const assertValidObjectId = (id, resourceName) => {
  if (!mongoose.isValidObjectId(id)) {
    const error = new Error(`Invalid ${resourceName} ID.`);
    error.statusCode = 400;
    throw error;
  }
};
