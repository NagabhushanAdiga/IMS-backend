# ⚠️ IMPORTANT - Replace Password in .env File

## 🔧 Action Required

The `backend/.env` file has been created, but you need to **replace the password**!

### Current Line in .env:
```
MONGODB_URI=mongodb+srv://nagbhushanadiga_db_user:<db_password>@cluster0...
```

### What to Do:

1. **Open** `backend/.env` file
2. **Find** `<db_password>`
3. **Replace** with your actual MongoDB password from MongoDB Atlas
4. **Save** the file

### Example:

If your MongoDB password is `MySecurePass123`, change:

**FROM**:
```env
MONGODB_URI=mongodb+srv://nagbhushanadiga_db_user:<db_password>@cluster0.0kna8j9.mongodb.net/inventory?retryWrites=true&w=majority&appName=Cluster0
```

**TO**:
```env
MONGODB_URI=mongodb+srv://nagbhushanadiga_db_user:MySecurePass123@cluster0.0kna8j9.mongodb.net/inventory?retryWrites=true&w=majority&appName=Cluster0
```

## 🔐 Where to Find Your Password?

### If you remember it:
- Just replace `<db_password>` with it

### If you forgot:
1. Go to MongoDB Atlas
2. Click "Database Access"
3. Find user `nagbhushanadiga_db_user`
4. Click "Edit"
5. Click "Edit Password"
6. Create new password or autogenerate
7. **Save the password!**
8. Update in `.env` file

## ⚡ After Updating Password

Run these commands:

```bash
# 1. Create admin user
npm run setup

# You should see:
# ✅ Connected to MongoDB
# 🎉 Admin user created successfully!
# 📌 PIN: 1234

# 2. Start backend
npm run dev

# You should see:
# ✅ MongoDB Connected: cluster0.0kna8j9.mongodb.net
# 🚀 Server running in development mode on port 5000
```

## ✅ Success Indicators

If you see:
- ✅ `MongoDB Connected: cluster0.0kna8j9.mongodb.net`

Your connection is working!

If you see:
- ❌ `MongoServerError: bad auth`
- ❌ `Authentication failed`

Your password is incorrect. Double-check it in MongoDB Atlas!

---

## 🎯 Next Steps After Password Update

1. ✅ Update password in `.env`
2. ✅ Run `npm run setup` (creates admin)
3. ✅ Run `npm run dev` (starts backend)
4. ✅ Open new terminal, run `npm run dev` in root (starts frontend)
5. ✅ Login with PIN 1234

**You're almost there!** Just replace that password and you're ready to go! 🚀

