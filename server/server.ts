import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Importing routes for Donars
import donorRoutes from './routes/donorRoutes.js'; // ✅ no curly braces

// Importing routes for Donations
import donationRoutes from './routes/donationRoutes.js'; 

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Backend server is running ✅');
});



//donors routes
app.use('/api/donors', donorRoutes);

// donations routes
app.use('/api/donations', donationRoutes);



//PORT for the server
const PORT = process.env.PORT || 3000;




app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});