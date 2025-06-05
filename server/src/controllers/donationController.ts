import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @route   POST /api/donations
 * @desc    Create a donation and link it to a valid donor
 */
export const createDonation = async (req: Request, res: Response) => {
  const amount: number = req.body.amount;
  const message: string = req.body.message;
  const donorId: string = req.body.donorId;

  try {
    const donor = await prisma.donor.findUnique({
      where: { id: donorId },
    });

    if (!donor) {
       res.status(404).json({ error: 'Donor not found' }); // ✅ added return
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
    console.error('Error creating donation:', error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * @route   GET /api/donations/:donorId
 * @desc    Get all donations by a specific donor ID
 */
export const getDonationsByDonor = async (req: Request, res: Response) => {
  const donorId: string = req.params.donorId;

  try {
    const donations = await prisma.donation.findMany({
      where: { donorId },
      orderBy: { donatedAt: 'desc' },
    });

    res.status(200).json(donations);
  } catch (error: any) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ error: error.message });
  }
};