import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const admins = [
  { email: 'admin1@temple.org', password: 'admin123' },
  { email: 'admin2@temple.org', password: 'admin123' },
  { email: 'admin3@temple.org', password: 'admin123' },
  { email: 'admin4@temple.org', password: 'admin123' },
  { email: 'admin5@temple.org', password: 'admin123' },
];

async function main() {
  for (const admin of admins) {
    const hashed = await bcrypt.hash(admin.password, 10);
    await prisma.admin.create({
      data: {
        email: admin.email,
        password: hashed,
      },
    });
  }
}
main();