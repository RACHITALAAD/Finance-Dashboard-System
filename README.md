# Finance Data Processing and Access Control

A backend system for a finance dashboard built with Node.js, Express, and PostgreSQL. It handles user roles, financial record management, and summary analytics.

**Live Demo:** https://finance-dashboard-system-tobb.onrender.com

---

## Tech Stack

- Node.js + Express
- PostgreSQL
- JWT for authentication
- bcryptjs for password hashing

---

## Getting Started

**1. Clone and install**

```bash
git clone https://github.com/RACHITALAAD/Finance-Dashboard-System.git
cd Finance-Dashboard-Backend
npm install
```

**2. Create a `.env` file**

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=finance_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password
JWT_SECRET=your_secret_key
PORT=5000
```

**3. Set up the database**

```bash
psql -U postgres -c "CREATE DATABASE finance_db"
psql -U postgres -d finance_db -f database/init.sql
```

**4. Run the server**

```bash
npm run dev
```

**5. Author**

```
Rachita Laad
```

---
