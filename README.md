# 🎯 Donation Management Backend API

A scalable, production-grade backend built using **TypeScript**, **Express.js**, **Prisma ORM**, and **MongoDB**. This API supports managing **Donors** and **Donations**, with strong relational linkage.

---

## 🚀 Tech Stack

- **Node.js** + **Express** for backend routing
- **TypeScript** for type-safe development
- **Prisma** ORM for database access
- **MongoDB** as the document store
- **dotenv** for environment config
- **nodemon** for live server reload

---

## 📦 Installation

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
```

---

---

## 🔧 Prisma Setup

```bash
npx prisma generate         # Generate Prisma Client
npx prisma db push          # Push schema to MongoDB
```

---

## 📁 File Structure

```
├── controllers/
│   ├── donorController.ts
│   └── donationController.ts
├── routes/
│   ├── donorRoutes.ts
│   └── donationRoutes.ts
├── prisma/
│   └── schema.prisma
├── dist/                # Compiled JS files
├── server.ts
├── tsconfig.json
├── .env
├── package.json
└── README.md
```

---

## 📜 Example Requests

### ➕ Create Donor

**POST** `/api/donors`

```json
{
  "name": "Omkumar Solanki",
  "email": "om@x.com",
  "phone": "1234567890",
  "address": "Toronto"
}
```

### ➕ Create Donation

**POST** `/api/donations`

```json
{
  "amount": 50,
  "message": "Charity support",
  "donorId": "replace_with_valid_id"
}
```

---

## 🔗 API Endpoints

### Donors

| Method | Route                 | Description           |
|--------|-----------------------|-----------------------|
| GET    | `/api/donors`         | List all donors       |
| GET    | `/api/donors/:id`     | Get a single donor    |
| POST   | `/api/donors`         | Create a new donor    |

### Donations

| Method | Route                     | Description               |
|--------|---------------------------|---------------------------|
| GET    | `/api/donations/:donorId` | Get all donations by donor |
| POST   | `/api/donations`          | Create a donation         |

---

## ✅ Scripts

```json
"scripts": {
  "dev": "nodemon dist/server.js",
  "build": "tsc",
  "start": "node dist/server.js",
  "prisma:generate": "npx prisma generate",
  "prisma:push": "npx prisma db push"
}
```

Run with:

```bash
npm run build
npm start
```

---

## 📘 License

MIT © 2024 Omkumar Solanki