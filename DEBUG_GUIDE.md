# Debugging Guide

## Current Issues Found

### 1. MongoDB Connection Error ✅ FIXED
**Error:** `connect ECONNREFUSED ::1:27017`

**Solution:**
- MongoDB is not running locally
- You have two options:

#### Option A: Install and Start Local MongoDB
1. Download MongoDB from https://www.mongodb.com/try/download/community
2. Install MongoDB
3. Start MongoDB service:
   ```bash
   # Windows (as Administrator)
   net start MongoDB
   
   # Or use MongoDB Compass GUI
   ```

#### Option B: Use MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get connection string
5. Update `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hpcultra
   ```

### 2. Environment Variables
The `.env` file has been created in the backend directory. Verify it contains:
- `MONGODB_URI`
- `JWT_SECRET`
- `PORT`
- `FRONTEND_URL`
- Email settings (for password reset)

## Testing the Application

### Backend Testing
1. Start MongoDB (local or Atlas)
2. Start backend server:
   ```bash
   cd backend
   npm run dev
   ```
3. Test health endpoint:
   ```bash
   curl http://localhost:5000/api/health
   ```
   Should return: `{"message":"Server is running"}`

### Frontend Testing
1. Start frontend server:
   ```bash
   cd frontend
   npm run dev
   ```
2. Open browser: http://localhost:5173
3. Check browser console for errors

## Common Issues

### Issue: "Cannot find module"
**Solution:** Run `npm install` in both backend and frontend directories

### Issue: "Port already in use"
**Solution:** 
- Change PORT in `.env` file
- Or kill the process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### Issue: CORS errors
**Solution:** Check `FRONTEND_URL` in backend `.env` matches frontend URL

### Issue: JWT errors
**Solution:** Ensure `JWT_SECRET` is set in `.env` file

## Next Steps

1. ✅ Dependencies installed
2. ✅ .env file created
3. ⚠️ Start MongoDB (local or Atlas)
4. ⚠️ Start backend server
5. ⚠️ Start frontend server
6. ⚠️ Test the application

## Quick Start Commands

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

Then open http://localhost:5173 in your browser.

