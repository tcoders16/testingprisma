// server/services/adminService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface DonationFilter {
  name?: string;
  email?: string;
  address?: string;
  donorId?: string;
}

export const fetchFilteredDonations = async (filters: DonationFilter) => {
  const whereClause: any = {
    donor: {
      ...(filters.name && { name: { contains: filters.name, mode: 'insensitive' } }),
      ...(filters.email && { email: { contains: filters.email, mode: 'insensitive' } }),
      ...(filters.address && { address: { contains: filters.address, mode: 'insensitive' } }),
    },
    ...(filters.donorId && { donorId: filters.donorId }),
  };

  return await prisma.donation.findMany({
    where: whereClause,
    include: {
      donor: true,
    },
    orderBy: {
      donatedAt: 'desc',
    },
  });
};