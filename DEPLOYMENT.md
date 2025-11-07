# 🚀 Production Deployment Guide

## MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Click "Build a Database"
4. Choose "FREE" (M0 Sandbox)
5. Select your preferred cloud provider and region
6. Click "Create Cluster"

### 2. Configure Database Access
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and password (save these!)
5. Set user privileges to "Read and write to any database"
6. Click "Add User"

### 3. Configure Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your server's IP address
5. Click "Confirm"

### 4. Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. It will look like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

### 5. Update Environment Variables
Replace in your `.env` file:
```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/inventory?retryWrites=true&w=majority
```

**Important:** Replace `<password>` with your actual password!

## Backend Deployment

### Option 1: Render.com (Recommended - Free Tier Available)

1. **Prepare for Deployment**
   ```bash
   cd backend
   # Ensure package.json has start script
   ```

2. **Deploy to Render**
   - Go to [Render.com](https://render.com)
   - Sign up/Login
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: inventory-backend
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Add Environment Variables**:
       - `MONGODB_URI` = your MongoDB connection string
       - `JWT_SECRET` = random secure string
       - `NODE_ENV` = production
       - `FRONTEND_URL` = your frontend URL

3. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - Copy your backend URL (e.g., `https://inventory-backend.onrender.com`)

### Option 2: Railway.app

1. Visit [Railway.app](https://railway.app)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Select backend folder
5. Add environment variables
6. Deploy

### Option 3: Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create inventory-backend`
4. Set env vars:
   ```bash
   heroku config:set MONGODB_URI="your_connection_string"
   heroku config:set JWT_SECRET="your_secret"
   heroku config:set NODE_ENV=production
   ```
5. Deploy: `git push heroku main`

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Update Environment Variable**
   - Create `.env.production` with your backend URL:
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

2. **Deploy to Vercel**
   - Go to [Vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: ./
     - **Environment Variables**: Add `VITE_API_URL`
   - Click "Deploy"

### Option 2: Netlify

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build: `npm run build`
3. Deploy: `netlify deploy --prod --dir=dist`
4. Add environment variable in Netlify dashboard

### Option 3: GitHub Pages

1. Update `vite.config.js` with base path
2. Build: `npm run build`
3. Deploy dist folder to gh-pages branch

## Environment Variables Summary

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/inventory?retryWrites=true&w=majority
JWT_SECRET=super_secret_key_change_this_in_production
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-api.com/api
```

## Production Checklist

### Backend
- ✅ MongoDB Atlas cluster created
- ✅ Database user configured
- ✅ IP whitelist configured
- ✅ Environment variables set
- ✅ JWT_SECRET is strong and unique
- ✅ NODE_ENV=production
- ✅ CORS configured with frontend URL
- ✅ Rate limiting enabled
- ✅ Helmet security headers enabled
- ✅ Error logging configured

### Frontend
- ✅ API URL points to production backend
- ✅ Build completed successfully
- ✅ Environment variables configured
- ✅ CORS matches backend settings

## Testing Production Setup

### 1. Test Backend
```bash
# Health check
curl https://your-backend-url.com/api/health

# Should return:
# {"status":"OK","message":"Server is running","environment":"production"}
```

### 2. Test Frontend
1. Open your deployed frontend URL
2. Try logging in with PIN: 1234
3. Test creating a product
4. Verify data is saved to MongoDB

## Monitoring & Maintenance

### MongoDB Atlas
- Monitor database usage in Atlas dashboard
- Set up alerts for high usage
- Regular backups are automatic

### Backend Server
- Monitor server logs
- Check for errors regularly
- Monitor API response times

### Scaling
- MongoDB Atlas: Upgrade to M10+ for production
- Backend: Increase server resources as needed
- Frontend: CDN is automatic on Vercel/Netlify

## Troubleshooting

### "CORS Error"
- Ensure `FRONTEND_URL` in backend matches your frontend domain
- Check CORS configuration in server.js

### "Database Connection Failed"
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas
- Ensure password doesn't contain special characters (URL encode if needed)

### "JWT Error"
- Ensure JWT_SECRET is set in backend environment
- Token might have expired (30 days default)

### "API Not Found"
- Verify VITE_API_URL in frontend environment
- Check backend is running and accessible

## Security Best Practices

1. **Change Default PIN**: Update the default PIN in production
2. **Strong JWT Secret**: Use a long, random string
3. **HTTPS Only**: Always use HTTPS in production
4. **Regular Updates**: Keep dependencies updated
5. **Environment Variables**: Never commit .env files
6. **IP Whitelisting**: Use specific IPs in production
7. **Rate Limiting**: Adjust limits based on usage
8. **Database Backups**: Enable in MongoDB Atlas

## Performance Optimization

1. **Enable Compression**: Already configured
2. **Database Indexes**: Add indexes for frequently queried fields
3. **Caching**: Consider Redis for session storage
4. **CDN**: Use for static assets (auto on Vercel/Netlify)
5. **Code Splitting**: Already configured in Vite

## Cost Optimization

### Free Tier Limits
- **MongoDB Atlas**: 512 MB storage (free forever)
- **Render.com**: Free tier sleeps after inactivity
- **Vercel**: 100 GB bandwidth/month
- **Netlify**: 100 GB bandwidth/month

### Upgrade When
- Database size > 400 MB
- Traffic > 50K requests/month
- Need 24/7 uptime

## Support

For issues during deployment:
1. Check server logs
2. Verify environment variables
3. Test API endpoints individually
4. Review MongoDB Atlas metrics
5. Check CORS and network settings

---

**Ready for Production!** 🎉


