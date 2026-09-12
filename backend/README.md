# Dynamic QR Generator - Backend API

Node.js & Express REST API backend for managing **Dynamic QR Codes** with PostgreSQL integration.

---

## 🚀 Quick Start

### 1. Installation

Navigate to the `backend` directory and install dependencies:

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Ensure `.env` contains your PostgreSQL credentials:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/qr_generator_db
FRONTEND_URL=http://localhost:5173
QR_BASE_URL=http://localhost:5000/r
```

### 3. Database Setup (PostgreSQL)

Create the PostgreSQL database and execute the initial schema:

```bash
psql -U postgres -d qr_generator_db -f src/models/schema.sql
```

*(Note: The server will also automatically create the `dynamic_qr_codes` table on startup if PostgreSQL is running).*

### 4. Run Server

- **Development Mode** (with auto-reload):
  ```bash
  npm run dev
  ```

- **Production Mode**:
  ```bash
  npm start
  ```

---

## 📡 API Endpoints

### 1. Health Check
- **`GET /api/health`**
- **Response**: `200 OK`
  ```json
  {
    "success": true,
    "message": "API is running",
    "timestamp": "2026-09-11T22:00:00.000Z"
  }
  ```

---

### 2. Create Dynamic QR Code
- **`POST /api/qr`**
- **Body**:
  ```json
  {
    "name": "My Portfolio",
    "destinationUrl": "https://example.com"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "success": true,
    "data": {
      "id": "e4a2d398-...",
      "publicId": "a8F92x",
      "name": "My Portfolio",
      "destinationUrl": "https://example.com",
      "isActive": true,
      "qrUrl": "http://localhost:5000/r/a8F92x",
      "createdAt": "2026-09-11T22:00:00.000Z",
      "updatedAt": "2026-09-11T22:00:00.000Z"
    }
  }
  ```

---

### 3. Get Dynamic QR Code Details
- **`GET /api/qr/:publicId`**
- **Response**: `200 OK`
  ```json
  {
    "success": true,
    "data": {
      "id": "e4a2d398-...",
      "publicId": "a8F92x",
      "name": "My Portfolio",
      "destinationUrl": "https://example.com",
      "isActive": true,
      "qrUrl": "http://localhost:5000/r/a8F92x"
    }
  }
  ```

---

### 4. Update Destination URL
- **`PATCH /api/qr/:publicId`**
- **Body**:
  ```json
  {
    "destinationUrl": "https://new-destination.com"
  }
  ```
- **Response**: `200 OK`

---

### 5. Update Active Status
- **`PATCH /api/qr/:publicId/status`**
- **Body**:
  ```json
  {
    "isActive": false
  }
  ```
- **Response**: `200 OK`

---

### 6. Public Redirect (Scan QR Code)
- **`GET /r/:publicId`**
- **Behavior**: Performs an HTTP `302 Found` redirect to the QR code's `destinationUrl` if active. Returns `410 Gone` if disabled.

---

## 🏛️ Architecture Overview

```text
backend/
├── src/
│   ├── config/       # Database & pool configuration (db.js)
│   ├── controllers/  # Request handlers (qrController.js)
│   ├── middleware/   # Error handling & logging (errorHandler.js)
│   ├── models/       # SQL Schema & migrations (schema.sql, initDb.js)
│   ├── routes/       # Express API routes (qrRoutes.js)
│   ├── services/     # Business logic & PostgreSQL queries (qrService.js)
│   ├── utils/        # URL validation & helpers (urlValidator.js)
│   └── server.js     # Express app entry point
├── .env.example
├── .gitignore
├── package.json
└── README.md
```
