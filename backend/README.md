# QR Generator - Dynamic QR Backend

Clean, robust, and scalable Express REST API and redirection service for dynamic QR codes built with **Node.js**, **Express.js**, and **PostgreSQL** (`pg`).

---

## Architecture Overview

```text
backend/
├── src/
│   ├── config/
│   │   ├── db.js             # PostgreSQL connection pool (pg)
│   │   └── schema.sql        # Database schema definitions and indexes
│   ├── controllers/
│   │   ├── qrController.js       # Health, CRUD operations for dynamic QRs
│   │   └── redirectController.js # Public HTTP 302 redirection handler
│   ├── middleware/
│   │   ├── errorHandler.js   # Global error handling middleware
│   │   └── validateUrl.js    # Security URL validator middleware
│   ├── routes/
│   │   ├── qrRoutes.js       # API routes (/api/qr, /api/health)
│   │   └── redirectRoutes.js # Public redirect route (/r/:publicId)
│   └── server.js             # Express server entrypoint
├── .env.example              # Documented environment variables template
├── .gitignore                # Ignored files (node_modules, .env)
├── package.json              # Backend dependencies and scripts
└── README.md                 # Backend documentation
```

---

## Installation

```bash
cd backend
npm install
```

---

## Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set your PostgreSQL connection string:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/qr_generator_db
FRONTEND_URL=http://localhost:5173
QR_BASE_URL=http://localhost:5000/r
```

---

## PostgreSQL Database Setup

1. Create a PostgreSQL database (e.g. `qr_generator_db`).
2. Run the SQL schema script located in `src/config/schema.sql`:

```bash
psql -d qr_generator_db -f src/config/schema.sql
```

### Table Schema (`dynamic_qr_codes`)

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY, DEFAULT `gen_random_uuid()` | Internal unique identifier |
| `public_id` | VARCHAR(12) | UNIQUE, NOT NULL | Short public identifier for redirection URLs |
| `name` | VARCHAR(255) | NOT NULL | Friendly label for the QR code |
| `destination_url` | TEXT | NOT NULL | Current target URL for redirects |
| `is_active` | BOOLEAN | DEFAULT `true` | Active/Inactive toggle status |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last update timestamp |

---

## Launching the Backend

### Development Mode (auto-reload on Node 18+)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

---

## REST API Endpoints

### 1. Health Check
* **GET** `/api/health`
* **Response:**
  ```json
  {
    "success": true,
    "message": "API is running",
    "timestamp": "2026-03-10T12:00:00.000Z"
  }
  ```

### 2. Create Dynamic QR Code
* **POST** `/api/qr`
* **Body:**
  ```json
  {
    "name": "My Portfolio",
    "destinationUrl": "https://example.com"
  }
  ```
* **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "id": "c7a8b3f1-...",
      "publicId": "a8F92x1B",
      "name": "My Portfolio",
      "destinationUrl": "https://example.com",
      "isActive": true,
      "qrUrl": "http://localhost:5000/r/a8F92x1B",
      "createdAt": "2026-03-10T12:00:00.000Z",
      "updatedAt": "2026-03-10T12:00:00.000Z"
    }
  }
  ```

### 3. Get Dynamic QR Code Details
* **GET** `/api/qr/:publicId`
* **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "c7a8b3f1-...",
      "publicId": "a8F92x1B",
      "name": "My Portfolio",
      "destinationUrl": "https://example.com",
      "isActive": true,
      "qrUrl": "http://localhost:5000/r/a8F92x1B",
      "createdAt": "2026-03-10T12:00:00.000Z",
      "updatedAt": "2026-03-10T12:00:00.000Z"
    }
  }
  ```

### 4. Update Destination URL
* **PATCH** `/api/qr/:publicId`
* **Body:**
  ```json
  {
    "destinationUrl": "https://new-portfolio.com"
  }
  ```
* **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "c7a8b3f1-...",
      "publicId": "a8F92x1B",
      "name": "My Portfolio",
      "destinationUrl": "https://new-portfolio.com",
      "isActive": true,
      "updatedAt": "2026-03-10T12:05:00.000Z"
    }
  }
  ```

### 5. Toggle Active Status
* **PATCH** `/api/qr/:publicId/status`
* **Body:**
  ```json
  {
    "isActive": false
  }
  ```
* **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "c7a8b3f1-...",
      "publicId": "a8F92x1B",
      "name": "My Portfolio",
      "destinationUrl": "https://new-portfolio.com",
      "isActive": false,
      "updatedAt": "2026-03-10T12:10:00.000Z"
    }
  }
  ```

---

## Public Redirection Route

* **GET** `/r/:publicId`
* **Behavior:**
  1. Searches database for `publicId`.
  2. If missing, responds with styled `404 Not Found` page.
  3. If `is_active` is `false`, responds with styled `410 Gone` (Inactive) page.
  4. If active, executes **HTTP 302 Found** redirect to `destination_url`.
