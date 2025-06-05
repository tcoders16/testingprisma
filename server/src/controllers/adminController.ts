// controllers/adminController.ts

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || 'supersecret'; // Store in .env for production

/**
 * @desc Admin Login
 * @route POST /api/admin/login
 * @access Public
 */
export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ adminId: admin.id }, SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * @desc Create a new donor
 * @route POST /api/admin/donor
 * @access Protected (Admin only)
 */
export const createDonor = async (req: Request, res: Response) => {
  const { name, email, phone, address } = req.body;

  try {
    // Check if donor with same email exists
    const existing = await prisma.donor.findUnique({ where: { email } });
    if (existing)  res.status(400).json({ error: 'Donor already exists' });

    // Create new donor
    const newDonor = await prisma.donor.create({
      data: {
        name,
        email,
        phone,
        address,
      },
    });

    res.status(201).json(newDonor);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create donor' });
  }
};

/**
 * @desc Fetch all donors
 * @route GET /api/admin/donors
 * @access Protected (Admin only)
 */
export const getAllDonors = async (_req: Request, res: Response) => {
  try {
    // Fetch all donors, optionally include donations
    const donors = await prisma.donor.findMany({
      include: {
        donations: true,
      },
    });

    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching donors' });
  }
};