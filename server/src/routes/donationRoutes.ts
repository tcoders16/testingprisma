import { Router } from 'express';
import {
  createDonation,
  getDonationsByDonor,
} from '../controllers/donationController.js';
import { verifyAdminAuth } from '../middleware/verifyAdminAuth';

const router = Router();

/**
 * Apply authentication middleware to all donation-related routes.
 * All donation APIs require admin login and JWT token.
 */


// Apply authentication middleware to all donation-related routes.
router.use(verifyAdminAuth);

/**
 * @route   POST /api/donations/
 * @desc    Create a new donation entry
 * @access  Protected
 */
router.post('/', createDonation);

/**
 * @route   GET /api/donations/:donorId
 * @desc    Get all donations for a specific donor
 * @access  Protected
 */
router.get('/:donorId', getDonationsByDonor);

export default router;