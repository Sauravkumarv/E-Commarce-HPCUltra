# Quick Setup Guide

## Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/hpcultra
# For MongoDB Atlas, use: mongodb+srv://username:password@cluster.mongodb.net/hpcultra

# JWT Secret (use a strong random string in production)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Email Configuration (for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_NAME=HPC Ultra
FROM_EMAIL=your_email@gmail.com
```

### Gmail Setup for Password Reset

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Generate an App Password:
   - Go to Security → 2-Step Verification → App passwords
   - Create a new app password for "Mail"
   - Use this password in `SMTP_PASS`

## Quick Start

### 1. Backend
```bash
cd backend
npm install
# Create .env file (see above)
npm run dev
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Create Admin User

After registering a user, update their role in MongoDB:

```javascript
// Using MongoDB Shell or Compass
use hpcultra
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

## Testing

1. Open http://localhost:5173
2. Register a new account
3. Browse products and add to cart
4. Complete checkout
5. Login as admin to manage products and orders

