// server/utils/filter.ts
import { Request } from 'express';

export const extractFiltersFromQuery = (req: Request) => {
  const { name, email, address, donorId } = req.query;

  return {
    name: typeof name === 'string' ? name : undefined,
    email: typeof email === 'string' ? email : undefined,
    address: typeof address === 'string' ? address : undefined,
    donorId: typeof donorId === 'string' ? donorId : undefined,
  };
};