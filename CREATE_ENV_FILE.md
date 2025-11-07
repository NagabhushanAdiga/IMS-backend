# 📝 Create Your .env File

## Quick Setup

Create a file named `.env` in the `backend` folder with this content:

```env
PORT=5000
MONGODB_URI=mongodb+srv://nagbhushanadiga_db_user:REPLACE_WITH_YOUR_PASSWORD@cluster0.0kna8j9.mongodb.net/inventory?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=hardware_shop_secret_key_2024_change_in_production
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## ⚠️ IMPORTANT

**Replace** `REPLACE_WITH_YOUR_PASSWORD` with your actual MongoDB Atlas password!

## How to Create the File

### Windows (PowerShell):
```powershell
cd backend
New-Item -Path .env -ItemType File
# Then edit the file and paste the content above
```

### Windows (Command Prompt):
```cmd
cd backend
echo PORT=5000 > .env
echo MONGODB_URI=mongodb+srv://nagbhushanadiga_db_user:YOUR_PASSWORD@cluster0.0kna8j9.mongodb.net/inventory?retryWrites=true^&w=majority^&appName=Cluster0 >> .env
echo JWT_SECRET=hardware_shop_secret_key_2024 >> .env
echo NODE_ENV=development >> .env
echo FRONTEND_URL=http://localhost:3000 >> .env
```

### Mac/Linux:
```bash
cd backend
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb+srv://nagbhushanadiga_db_user:YOUR_PASSWORD@cluster0.0kna8j9.mongodb.net/inventory?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=hardware_shop_secret_key_2024
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
EOF
```

### Using Code Editor (Easiest):
1. Open VS Code or your editor
2. Navigate to `backend` folder
3. Create new file named `.env`
4. Copy and paste the content above
5. Replace the password
6. Save the file

## Your Connection Details

- **Username**: `nagbhushanadiga_db_user`
- **Cluster**: `cluster0.0kna8j9.mongodb.net`
- **Database**: `inventory`
- **Password**: ⚠️ You need to get this from MongoDB Atlas

## Find Your Password

1. Go to https://cloud.mongodb.com
2. Click "Database Access"
3. Find user: `nagbhushanadiga_db_user`
4. If you don't remember password:
   - Click "Edit"
   - Click "Edit Password"
   - Generate new password or create custom one
   - **SAVE IT!**
5. Use this password in the connection string

## Test Connection

After creating `.env` file with correct password:

```bash
cd backend
npm install
npm run setup
```

Should see:
```
✅ Connected to MongoDB
🎉 Admin user created successfully!
```

If you see errors, your password is wrong - double check it!

## ✅ Ready?

Once `.env` is created with correct password:

```bash
# Create admin
npm run setup

# Start backend
npm run dev
```

Then in new terminal (project root):
```bash
npm run dev
```

Login with PIN: **1234**

---

**That's it!** Once you replace the password, everything will work! 🚀

