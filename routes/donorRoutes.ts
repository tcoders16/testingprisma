import { Router } from 'express';
import {
  createDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
} from '../controllers/donorController.js';

const router = Router();

// POST /api/donors → Create a new donor
router.post('/', createDonor);

// GET /api/donors → Fetch all donors
router.get('/', getAllDonors);

// GET /api/donors/:donorId → Get donor by ID
router.get('/:donorId', getDonorById);

// PUT /api/donors/:donorId → Update donor by ID
router.put('/:donorId', updateDonor);

// DELETE /api/donors/:donorId → Delete donor by ID
router.delete('/:donorId', deleteDonor);


// Export the router to be used in server.ts
export default router;