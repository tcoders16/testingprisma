import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Create a donation and link it to a valid donor.
 * Route: POST /api/donations
 */
export const createDonation = async (req: Request, res: Response) => {
  const { amount, message, donorId } = req.body;

  try {
    const donor = await prisma.donor.findUnique({
      where: { id: donorId },
    });

    if (!donor) {
       res.status(404).json({ error: 'Donor not found' });
    }

    const donation = await prisma.donation.create({
      data: {
        amount,
        message,
        donor: {
          connect: { id: donorId },
        },
      },
    });

    res.status(201).json(donation);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get all donations by a specific donor ID.
 * Route: GET /api/donations/:donorId
 */
export const getDonationsByDonor = async (req: Request, res: Response) => {
  const { donorId } = req.params;

  try {
    const donations = await prisma.donation.findMany({
      where: { donorId },
      orderBy: { donatedAt: 'desc' },
    });

    res.status(200).json(donations);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};