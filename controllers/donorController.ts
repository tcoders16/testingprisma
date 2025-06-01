// controllers/donorController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';




// Initialize Prisma Client
const prisma = new PrismaClient();


//creating a new donar

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



// Update a donor's information
export const updateDonor = async (req: Request, res: Response) => {
  const { donorId } = req.params;
  const { name, email, phone, address } = req.body;

  try {
    const updatedDonor = await prisma.donor.update({
      where: { id: donorId },
      data: { name, email, phone, address },
    });
    res.status(200).json(updatedDonor);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.error('Error updating donor:', error);
  };

};




  // Delete a donor
  export const deleteDonor = async (req: Request, res: Response) => {
  const { donorId } = req.params;

  try {
    await prisma.donor.delete({
      where: { id: donorId },
    });
    res.status(200).json({ message: 'Donor deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.error('Error deleting donor:', error);
  }
};



