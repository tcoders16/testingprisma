import { Router } from 'express';
import {
  createDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
} from '../controllers/donorController.js';
import { verifyAdminAuth } from '../middleware/verifyAdminAuth';

const router = Router();

/**
 * Apply authentication middleware to all donor-related routes.
 * All routes below require a valid JWT from an admin user.
 */

// Apply authentication middleware to all donor-related routes.
router.use(verifyAdminAuth);

/**
 * @route   POST /api/donors/
 * @desc    Create a new donor
 * @access  Protected
 */
router.post('/', createDonor);

/**
 * @route   GET /api/donors/
 * @desc    Fetch all donors
 * @access  Protected
 */
router.get('/', getAllDonors);

/**
 * @route   GET /api/donors/:donorId
 * @desc    Fetch a single donor by ID
 * @access  Protected
 */
router.get('/:donorId', getDonorById);

/**
 * @route   PUT /api/donors/:donorId
 * @desc    Update donor by ID
 * @access  Protected
 */
router.put('/:donorId', updateDonor);

/**
 * @route   DELETE /api/donors/:donorId
 * @desc    Delete donor by ID
 * @access  Protected
 */
router.delete('/:donorId', deleteDonor);

export default router;