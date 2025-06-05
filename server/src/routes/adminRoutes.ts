import express from 'express';
import {
  loginAdmin,
  createDonor,
  getAllDonors,
} from '../controllers/adminController.js';
import { verifyAdminAuth } from '../middleware/verifyAdminAuth';

const router = express.Router();

/**
 * @route   POST /api/admin/login
 * @desc    Admin login route (public)
 * @access  Public
 */
router.post('/login', loginAdmin);

// Apply middleware to all routes below this line
router.use(verifyAdminAuth);

/**
 * @route   POST /api/admin/donor
 * @desc    Create donor (alternate access via admin panel)
 * @access  Protected
 */
router.post('/donor', createDonor);

/**
 * @route   GET /api/admin/donors
 * @desc    Get all donors (for admin use)
 * @access  Protected
 */
router.get('/donors', getAllDonors);

export default router;