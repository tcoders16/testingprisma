import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import {
  createDonation,
  getDonationsByDonor,
} from "../controllers/donationController.js";


// Initialize Express Router
const router = Router();

/**
 * @route   POST /api/donations
 * @desc    Create a new donation linked to a donor
 * @access  Public
 */

// Create a new donation
router.post("/", createDonation);

/**
 * @route   GET /api/donations/:donorId
 * @desc    Get all donations made by a specific donor
 * @access  Public
 */


// Get donations by donor ID
router.get(
  "/:donorId",
  getDonationsByDonor as (req: Request, res: Response, next: NextFunction) => any
);



// Get donations by donor ID
router.get("/:donorId", getDonationsByDonor);


// Export the router to be used in server.ts
export default router;