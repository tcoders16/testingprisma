import { Router } from 'express';
import { createDonor, getAllDonors, getDonorById } from '../controllers/donorController.js';

const router = Router();

router.post('/', createDonor);
router.get('/', getAllDonors);
router.get("/:donorId", getDonorById);
export default router;