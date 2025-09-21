# API Documentation

This document describes all the API endpoints available in the Booking.com Clone backend.

## Base URL
```
https://{project-id}.supabase.co/functions/v1/make-server-2c363e8a
```

## Authentication

Most endpoints require authentication. Include the authorization header:
```
Authorization: Bearer {access_token}
```

For admin endpoints, the user must have email: `admin@bookingint.com`

## Endpoints

### 🔐 Authentication

#### Register User
```http
POST /signup
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe",
  "subscribeNewsletter": true
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user-uuid",
    "email": "user@example.com",
    "user_metadata": {
      "name": "John Doe",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

---

### 🎫 Discount Codes

#### Validate Discount Code
```http
POST /validate-discount
```

**Request Body:**
```json
{
  "code": "WELCOME10"
}
```

**Response:**
```json
{
  "valid": true,
  "discount": {
    "id": 1,
    "code": "WELCOME10",
    "description": "Welcome discount for new users",
    "percentage": 10,
    "maxUses": 100,
    "usedCount": 15,
    "expiryDate": "2024-12-31",
    "active": true
  }
}
```

---

### 💳 Payment Processing

#### Process Payment
```http
POST /process-payment
```
*Requires Authentication*

**Request Body:**
```json
{
  "bookingId": "booking-123",
  "userId": "user-uuid",
  "amount": 299,
  "paymentMethod": "paystack",
  "discountCode": "WELCOME10",
  "booking": {
    "id": "booking-123",
    "title": "Luxury Resort & Spa",
    "type": "stays",
    "price": 299
  }
}
```

**Response:**
```json
{
  "success": true,
  "bookingId": "booking_1640995200000"
}
```

---

### 📋 Booking Management

#### Get User Bookings
```http
GET /bookings
```
*Requires Authentication*

**Response:**
```json
{
  "bookings": [
    {
      "id": "booking_1640995200000",
      "userId": "user-uuid",
      "bookingId": "booking-123",
      "amount": 299,
      "paymentMethod": "paystack",
      "discountCode": "WELCOME10",
      "booking": {
        "id": "booking-123",
        "title": "Luxury Resort & Spa",
        "type": "stays",
        "price": 299
      },
      "status": "confirmed",
      "createdAt": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

---

### ✈️ Flight Search

#### Search Flights
```http
POST /search-flights
```

**Request Body:**
```json
{
  "from": "JNB",
  "to": "DXB", 
  "departureDate": "2024-11-15T00:00:00.000Z",
  "returnDate": "2024-11-22T00:00:00.000Z",
  "passengers": {
    "adults": 2,
    "children": 0
  },
  "class": "economy"
}
```

**Response:**
```json
{
  "flights": [
    {
      "id": "EK201",
      "airline": "Emirates",
      "from": "JNB",
      "to": "DXB",
      "price": 899,
      "duration": "8h 15m",
      "departure": "10:30",
      "arrival": "20:45",
      "class": "Economy",
      "type": "flights",
      "title": "Emirates Flight EK201",
      "description": "JNB to DXB - 8h 15m",
      "image": "https://images.unsplash.com/...",
      "rating": 4.5,
      "location": "JNB to DXB"
    }
  ]
}
```

#### Get November/December Flights
```http
GET /flights/november-december
```

**Response:**
```json
{
  "flights": [
    {
      "id": "EK201",
      "airline": "Emirates",
      "from": "JNB",
      "to": "DXB",
      "price": 899,
      "duration": "8h 15m",
      "departure": "10:30",
      "arrival": "20:45",
      "class": "Economy",
      "month": "November",
      "date": "2024-11-15"
    }
  ]
}
```

---

### 👑 Admin Endpoints

#### Get All Discount Codes
```http
GET /admin/discount-codes
```
*Requires Admin Authentication*

**Response:**
```json
{
  "codes": [
    {
      "id": 1,
      "code": "WELCOME10",
      "description": "Welcome discount for new users",
      "percentage": 10,
      "maxUses": 100,
      "usedCount": 15,
      "expiryDate": "2024-12-31",
      "active": true
    }
  ]
}
```

#### Create Discount Code
```http
POST /admin/discount-codes
```
*Requires Admin Authentication*

**Request Body:**
```json
{
  "code": "NEWDISCOUNT",
  "description": "New discount description",
  "percentage": 15,
  "maxUses": 50,
  "expiryDate": "2024-12-31"
}
```

**Response:**
```json
{
  "success": true,
  "code": {
    "id": 11,
    "code": "NEWDISCOUNT",
    "description": "New discount description",
    "percentage": 15,
    "maxUses": 50,
    "usedCount": 0,
    "expiryDate": "2024-12-31",
    "active": true
  }
}
```

#### Update Discount Code
```http
PUT /admin/discount-codes/{id}
```
*Requires Admin Authentication*

**Request Body:**
```json
{
  "code": "UPDATEDDISCOUNT",
  "description": "Updated description",
  "percentage": 20,
  "maxUses": 75,
  "expiryDate": "2024-12-31"
}
```

**Response:**
```json
{
  "success": true
}
```

#### Delete Discount Code
```http
DELETE /admin/discount-codes/{id}
```
*Requires Admin Authentication*

**Response:**
```json
{
  "success": true
}
```

---

### 🤖 Scraping Control

#### Get Scraping Status
```http
GET /admin/scraping/status
```
*Requires Admin Authentication*

**Response:**
```json
{
  "scrapingConfig": {
    "flights": {
      "enabled": true,
      "interval": 24,
      "lastRun": "2024-01-01T12:00:00.000Z",
      "status": "completed"
    },
    "hotels": {
      "enabled": true,
      "interval": 12,
      "lastRun": null,
      "status": "idle"
    },
    "cars": {
      "enabled": true,
      "interval": 6,
      "lastRun": null,
      "status": "idle"
    },
    "attractions": {
      "enabled": false,
      "interval": 48,
      "lastRun": null,
      "status": "idle"
    },
    "taxis": {
      "enabled": false,
      "interval": 24,
      "lastRun": null,
      "status": "idle"
    }
  }
}
```

#### Update Scraping Configuration
```http
PUT /admin/scraping/config
```
*Requires Admin Authentication*

**Request Body:**
```json
{
  "flights": {
    "enabled": true,
    "interval": 24,
    "lastRun": "2024-01-01T12:00:00.000Z",
    "status": "completed"
  },
  "hotels": {
    "enabled": false,
    "interval": 12,
    "lastRun": null,
    "status": "idle"
  }
}
```

**Response:**
```json
{
  "success": true,
  "config": {
    "flights": {
      "enabled": true,
      "interval": 24,
      "lastRun": "2024-01-01T12:00:00.000Z",
      "status": "completed"
    }
  }
}
```

#### Trigger Manual Scraping
```http
POST /admin/scraping/trigger/{service}
```
*Requires Admin Authentication*

**Parameters:**
- `service`: One of `flights`, `hotels`, `cars`, `attractions`, `taxis`

**Response:**
```json
{
  "success": true,
  "message": "flights scraping triggered"
}
```

---

### 📊 Analytics & Data

#### Get Data Overview
```http
GET /admin/data/overview
```
*Requires Admin Authentication*

**Response:**
```json
{
  "flights": {
    "count": 6,
    "data": [...]
  },
  "hotels": {
    "count": 3,
    "data": [...]
  },
  "cars": {
    "count": 3,
    "data": [...]
  },
  "attractions": {
    "count": 3,
    "data": [...]
  },
  "taxis": {
    "count": 2,
    "data": [...]
  }
}
```

#### Get Analytics
```http
GET /admin/analytics
```
*Requires Admin Authentication*

**Response:**
```json
{
  "analytics": {
    "totalBookings": 157,
    "totalRevenue": 45680,
    "activeDiscountCodes": 8,
    "userRegistrations": 342,
    "recentActivity": [
      {
        "type": "booking",
        "description": "New flight booking to Dubai",
        "timestamp": "2024-01-01T12:00:00.000Z"
      }
    ],
    "monthlyStats": {
      "bookings": [12, 19, 23, 31, 28, 35, 42],
      "revenue": [3200, 4100, 3800, 5200, 4600, 6100, 7200]
    }
  }
}
```

---

### 🏥 Health Check

#### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "ok"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Invalid request parameters"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error message"
}
```

---

## Rate Limiting

The API implements rate limiting to prevent abuse:
- 100 requests per minute per IP for public endpoints
- 1000 requests per minute for authenticated users
- 10000 requests per minute for admin users

## Data Models

### User
```typescript
interface User {
  id: string;
  email: string;
  user_metadata: {
    name: string;
    firstName: string;
    lastName: string;
    subscribeNewsletter?: boolean;
  };
}
```

### Discount Code
```typescript
interface DiscountCode {
  id: number;
  code: string;
  description: string;
  percentage: number;
  maxUses: number;
  usedCount: number;
  expiryDate: string;
  active: boolean;
}
```

### Booking
```typescript
interface Booking {
  id: string;
  userId: string;
  bookingId: string;
  amount: number;
  paymentMethod: string;
  discountCode?: string;
  booking: {
    id: string;
    title: string;
    type: string;
    price: number;
  };
  status: string;
  createdAt: string;
}
```

### Flight
```typescript
interface Flight {
  id: string;
  airline: string;
  from: string;
  to: string;
  price: number;
  duration: string;
  departure: string;
  arrival: string;
  class: string;
  month: string;
  date: string;
  lastUpdated?: string;
}
```

---

**For questions about the API, please create an issue in the GitHub repository.**