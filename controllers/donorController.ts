import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createDonor = async (
  req: Request, 
  res: Response) => {
  const { name, email, phone, address } = req.body;

  try {
    const donor = await prisma.donor.create({
      data: { name, email, phone, address },
    });
    res.status(201).json(donor);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllDonors = async (req: Request, res: Response) => {
  try {
    const donors = await prisma.donor.findMany();
    res.json(donors);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


// Get a specific donor by ID

export const getDonorById = async (req: Request, res: Response) => {
  const { donorId } = req.params;

  try {
    const donor = await prisma.donor.findUnique({
      where: { id: donorId },
    });

    if (!donor) {
      res.status(404).json({ error: 'Donor not found' });
      return; // ✅ exits the function without "returning" a value to Express
    }

    res.status(200).json(donor);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.error('Error fetching donor:', error);
  }

};
