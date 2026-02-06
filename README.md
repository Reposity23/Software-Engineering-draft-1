# JOAP Hardware Trading Supplier Management System

A three-tier Supplier Management System with Accounting for JOAP Hardware Trading.

## Tech Stack
- **Frontend:** React 18 + MUI + Vite
- **Backend:** Node.js 18 + Express + Mongoose
- **Database:** MongoDB 6 (Railway)

## Setup
### 1) Backend
```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

### 2) Frontend
```bash
cd frontend
npm install
npm run start
```

The frontend connects to `http://localhost:5000/api` by default. Update `VITE_API_BASE` if needed.

## Environment Variables
Backend `.env`:
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret
- `PORT` - API port (default `5000`)

## Demo Credentials
- **Owner:** owner@joap.local / owner123
- **Employee:** employee@joap.local / employee123

## Seed Data
Run `npm run seed` in `/backend` to create demo users, suppliers, products, and low stock alerts.

## Payment Flow Test
1. Create a product and stock in via Inventory.
2. Create an order and reserve stock.
3. Log a GCash payment in Billing & Payments.
4. Order is marked **Paid**, and a Journal Entry is created automatically.
5. Reverse entries from the Accounting module when needed.

## Railway Connection (Single Source of Truth)
**IMPORTANT:** edit `backend/api_railway.py` when switching Railway projects.
- It is the single source of truth for all Railway settings.
- Update `backend/.env` if you want runtime overrides.

Helper commands are printed by:
```bash
python backend/api_railway.py
```

## Switching to a New Railway Account
1. Update `backend/api_railway.py` with the new MongoDB URI.
2. Mirror the values in `backend/config/railway.js` if you want Node defaults updated.
3. Update `backend/.env` if you prefer environment override.
4. Restart the backend server.

## Folder Structure
```
/backend  - Express API, Mongoose models, seed script
/frontend - React dashboard UI
```
