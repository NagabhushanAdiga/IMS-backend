# Backend API - Hardware Shop Inventory Management

Production-ready Node.js/Express backend with MongoDB.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Setup

Create `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/inventory?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=production
FRONTEND_URL=http://localhost:3000
```

**Important:** Replace `username`, `password`, and `cluster` with your MongoDB Atlas credentials.

### 3. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string
6. Update `MONGODB_URI` in `.env`

### 4. Start Server

```bash
# Development
npm run dev

# Production
npm start
```

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # PIN authentication
│   ├── productController.js  # Product CRUD
│   ├── categoryController.js # Category CRUD
│   ├── saleController.js     # Sales management
│   └── returnController.js   # Returns tracking
├── middleware/
│   ├── auth.js              # JWT authentication
│   ├── errorHandler.js      # Error handling
│   └── validator.js         # Input validation
├── models/
│   ├── User.js              # User model (PIN auth)
│   ├── Product.js           # Product model
│   ├── Category.js          # Category model
│   ├── Sale.js              # Sale model
│   └── Return.js            # Return model
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── categoryRoutes.js
│   ├── saleRoutes.js
│   └── returnRoutes.js
├── utils/
│   └── generateToken.js     # JWT token generation
├── .env                     # Environment variables
├── .gitignore
├── package.json
└── server.js                # Entry point
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Login with PIN
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/pin` - Update PIN (Protected)

### Products
- `GET /api/products` - Get all products (with search & pagination)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/stats` - Get product statistics

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Sales
- `GET /api/sales` - Get all sales (with search & pagination)
- `GET /api/sales/:id` - Get single sale
- `POST /api/sales` - Create sale
- `PUT /api/sales/:id` - Update sale
- `DELETE /api/sales/:id` - Delete sale

### Returns
- `GET /api/returns` - Get all returns
- `POST /api/returns` - Create return record
- `GET /api/returns/stats` - Get return statistics

## 🔐 Authentication

The API uses JWT tokens for authentication. On successful login, you'll receive a token that must be included in subsequent requests:

```
Authorization: Bearer <token>
```

Default PIN: **1234** (auto-created on first login)

## 🛡️ Security Features

- ✅ Helmet.js for security headers
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ CORS protection
- ✅ Input validation
- ✅ PIN hashing with bcrypt
- ✅ JWT authentication
- ✅ Error handling
- ✅ Request compression

## 📊 Data Models

### Product
- Auto-calculates stock: `totalStock - sold + returned`
- Auto-updates status based on stock levels
- References Category

### Category
- Tracks product count automatically
- Unique name constraint

### Sale
- Auto-generates unique sale ID
- Tracks order status

### Return
- Links to original product
- Calculates total value automatically

## 🌐 Production Deployment

### Environment Variables
Ensure all production environment variables are set:
- `NODE_ENV=production`
- Strong `JWT_SECRET`
- MongoDB Atlas URI
- Correct `FRONTEND_URL`

### Deployment Platforms
- Heroku
- Railway
- Render
- AWS/Azure/GCP

## 📝 Scripts

```bash
npm start      # Production server
npm run dev    # Development with nodemon
```

## ⚙️ Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - PIN hashing
- **cors** - CORS handling
- **helmet** - Security headers
- **compression** - Response compression
- **express-rate-limit** - Rate limiting
- **express-validator** - Input validation

## 📄 License

ISC

