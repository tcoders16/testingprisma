import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Route imports
import donorRoutes from './routes/donorRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import adminRoutes from './routes/adminRoutes.js'; 


// Middleware imports
import { verifyAdminAuth } from './middleware/verifyAdminAuth.js';
// Load environment variables
dotenv.config();

// Initialize app and database client
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req: Request, res: Response) => {
  res.send('✅ Backend server is running');
});

// Public login route (no auth needed)
app.use('/api/admin', adminRoutes);

// Protected routes
app.use('/api/admin/donors', verifyAdminAuth, donorRoutes);
app.use('/api/admin/donations', verifyAdminAuth, donationRoutes);

// Server port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});