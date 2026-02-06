# JOAP Hardware Trading Supplier Management System

A web-based Supplier Management System with integrated Accounting for JOAP Hardware Trading. The platform follows a **direct save** workflow for billing/payments and an **append-only** model for Inventory and Accounting.

## Tech Stack
- **Frontend:** React 18 + MUI
- **Backend:** Node.js 18 + Express
- **Database:** MongoDB 6

## Setup
### Backend
```bash
cd backend
npm install
```

Create `.env` (already provided) and ensure it contains:
```
MONGO_URI=mongodb://mongo:sAaUrUyEWfuYgnHTJhWnYQlQhoDZvgQj@mainline.proxy.rlwy.net:35014
JWT_SECRET=supersecretkey
PORT=5000
```

Start the API server:
```bash
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend expects the backend at `http://localhost:5000` by default. You can set `VITE_API_BASE` to change this.

## Seed Demo Data
```bash
cd backend
npm run seed
```

Seeded accounts:
- Owner: `owner@joap.local` / `owner123`
- Employee: `employee@joap.local` / `employee123`

## Demo Flow (Core Modules)
1. Create a product (Inventory module).
2. Record a stock-in movement.
3. Create an order (Orders module) – stock is reserved immediately.
4. Log a GCash payment (Billing & Payment) – order becomes **Paid** and posts to Accounting.
5. Reverse a journal entry (Accounting module).
6. Review reports (Reports module).

## Railway Change Requirement (Single Source of Truth)
**Edit `backend/api_railway.py` when you create a new Railway account / project.**
- This file is the canonical source for the MongoDB URI.
- The backend reads `process.env.MONGO_URI`, which should be updated to match `api_railway.py`.

Helper commands are available in `api_railway.py`:
```bash
python backend/api_railway.py
```

## How to switch to a new Railway account
1. Update `backend/api_railway.py` with the new MongoDB URI.
2. Update `backend/.env` to match (or set `MONGO_URI` in the environment).
3. Restart the backend server.

## API Endpoints (Minimum)
- Auth: `/api/auth/login`, `/api/auth/register`, `/api/auth/me`
- Suppliers: `/api/suppliers`
- Products: `/api/products`
- Inventory: `/api/inventory/summary`, `/api/inventory/logs`, `/api/inventory/adjust`
- Orders: `/api/orders`, `/api/orders?status=pending_payment`, `/api/orders/:id/reserve`, `/api/orders/:id/mark-paid`
- Payments: `/api/payments`, `/api/payments/daily-audit?date=YYYY-MM-DD`
- Accounting: `/api/accounting/ledger`, `/api/accounting/reverse/:entryId`
- Search: `/api/search/by-id/:sku`, `/api/search/by-name?prefix=...`
- Maintenance: `/api/maintenance/backup`, `/api/maintenance/restore`
- Reports: `/api/reports/summary`, `/api/reports/inventory-movements`, `/api/reports/sales-summary`

## Notes
- Inventory and Accounting are **append-only**. Corrections must use adjusting/reversing entries.
- Billing & Payment follows **direct save**, updating order status and accounting in real time.
