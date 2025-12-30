# HPC Ultra - MERN E-Commerce Platform

A modern, high-performance e-commerce website built with the MERN stack (MongoDB, Express, React, Node.js). This project features a clean, responsive design with full authentication, product management, shopping cart, and order management capabilities.

## 🚀 Features

### Customer Features
- ✅ User registration and login
- ✅ Forgot password with email reset
- ✅ Browse products with category filtering
- ✅ Product detail pages
- ✅ Shopping cart management
- ✅ Checkout process
- ✅ Order history
- ✅ Responsive design (mobile & desktop)

### Admin Features
- ✅ Secure admin dashboard
- ✅ Add, edit, and delete products
- ✅ View all orders
- ✅ Update order status (Pending → Shipped → Delivered)
- ✅ Role-based access control

## 📋 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Nodemailer** - Email service

## 📁 Project Structure

```
HPCUltra/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── productController.js  # Product CRUD operations
│   │   └── orderController.js    # Order management
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── adminMiddleware.js    # Admin role check
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Product.js            # Product schema
│   │   └── Order.js              # Order schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── productRoutes.js      # Product endpoints
│   │   └── orderRoutes.js        # Order endpoints
│   ├── utils/
│   │   └── sendEmail.js          # Email utility
│   ├── server.js                 # Express server
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx        # Navigation bar
    │   │   ├── Footer.jsx        # Footer component
    │   │   ├── ProductCard.jsx   # Product card component
    │   │   └── Loader.jsx        # Loading spinner
    │   ├── pages/
    │   │   ├── Home.jsx          # Product listing
    │   │   ├── Login.jsx         # Login page
    │   │   ├── Signup.jsx        # Registration page
    │   │   ├── ForgotPassword.jsx
    │   │   ├── ResetPassword.jsx
    │   │   ├── ProductDetails.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Checkout.jsx
    │   │   ├── Orders.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   └── AddProduct.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx   # Authentication state
    │   │   └── CartContext.jsx   # Cart state
    │   ├── services/
    │   │   └── api.js            # API service layer
    │   ├── routes/
    │   │   ├── ProtectedRoute.jsx
    │   │   └── AdminRoute.jsx
    │   ├── App.jsx               # Main app component
    │   ├── main.jsx              # Entry point
    │   └── index.css             # Global styles
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

## 🗄️ Database Schemas

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: 'customer' | 'admin', default: 'customer'),
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  timestamps: true
}
```

### Product Schema
```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required, min: 0),
  category: String (required),
  image: String (required),
  stock: Number (required, min: 0),
  timestamps: true
}
```

### Order Schema
```javascript
{
  user: ObjectId (ref: User),
  orderItems: [{
    product: ObjectId (ref: Product),
    name: String,
    quantity: Number,
    price: Number,
    image: String
  }],
  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentMethod: String (default: 'Cash on Delivery'),
  totalPrice: Number,
  status: String (enum: 'Pending' | 'Shipped' | 'Delivered'),
  timestamps: true
}
```

## 🔌 API Routes

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user (protected)
- `POST /forgotpassword` - Request password reset
- `PUT /resetpassword/:resettoken` - Reset password

### Product Routes (`/api/products`)
- `GET /` - Get all products (optional query: `?category=Electronics`)
- `GET /:id` - Get single product
- `POST /` - Create product (admin only)
- `PUT /:id` - Update product (admin only)
- `DELETE /:id` - Delete product (admin only)

### Order Routes (`/api/orders`)
- `POST /` - Create new order (protected)
- `GET /myorders` - Get user's orders (protected)
- `GET /:id` - Get single order (protected)
- `GET /` - Get all orders (admin only)
- `PUT /:id/status` - Update order status (admin only)

## 🔐 Authentication Flow

1. **Registration/Login**: User provides credentials
2. **JWT Generation**: Server generates JWT token with user ID
3. **Token Storage**: Frontend stores token in localStorage
4. **Protected Routes**: Token sent in `Authorization: Bearer <token>` header
5. **Token Verification**: Middleware verifies token and attaches user to request
6. **Role Check**: Admin middleware checks user role for admin routes

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/hpcultra
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
FRONTEND_URL=http://localhost:5173
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_NAME=HPC Ultra
FROM_EMAIL=your_email@gmail.com
```

5. Start the server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

### Creating Admin User

To create an admin user, you can either:

1. **Using MongoDB Compass/Shell**:
```javascript
use hpcultra
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

2. **Using Postman/API**:
- Register a user normally
- Update the user's role in MongoDB to "admin"

## 🚀 Performance Optimizations

1. **Lazy Loading**: React pages are lazy-loaded for code splitting
2. **Image Optimization**: Images use lazy loading attribute
3. **API Optimization**: Clean API responses with proper status codes
4. **Context Optimization**: Minimal re-renders with proper context structure
5. **Route Protection**: Efficient route guards with loading states
6. **Cart Persistence**: Cart stored in localStorage for persistence

## 📦 Build for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

The build output will be in `frontend/dist/` directory.

## 🌐 Deployment Notes

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables in your hosting platform
2. Ensure MongoDB connection string is accessible
3. Update `FRONTEND_URL` to your frontend domain
4. Configure CORS if needed

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Update API base URL in `vite.config.js` or use environment variables
4. Configure proxy or update API endpoints

### Environment Variables for Production
- Use strong `JWT_SECRET`
- Use production MongoDB URI (MongoDB Atlas recommended)
- Configure proper SMTP settings
- Set `NODE_ENV=production`
- Update `FRONTEND_URL` to production domain

## 🧪 Testing the Application

1. **Register a new user** at `/signup`
2. **Login** at `/login`
3. **Browse products** on the home page
4. **Add products to cart** and proceed to checkout
5. **Place an order** with shipping details
6. **View orders** in the orders page
7. **Login as admin** to manage products and orders

## 📝 Notes

- Password reset tokens expire in 10 minutes
- JWT tokens expire in 30 days
- Cart is persisted in localStorage
- Stock is automatically updated when orders are placed
- Admin routes are protected with role-based middleware

## 🔧 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access if using MongoDB Atlas

### Email Not Sending
- Verify SMTP credentials
- For Gmail, use App Password (not regular password)
- Check firewall/network restrictions

### CORS Errors
- Ensure `FRONTEND_URL` is set correctly
- Check CORS configuration in `server.js`

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Development

Built with ❤️ using the MERN stack. This is a production-ready e-commerce platform with clean code, proper error handling, and scalable architecture.

---

**Happy Coding! 🚀**

