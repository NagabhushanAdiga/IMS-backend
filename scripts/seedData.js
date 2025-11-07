import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin exists
    const existingAdmin = await User.findOne({ role: 'admin' });

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
      console.log('📌 Use PIN: 1234 to login');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      pin: '1234',
      role: 'admin'
    });

    console.log('🎉 Admin user created successfully!');
    console.log('📌 PIN: 1234');
    console.log('👤 Name:', admin.name);
    console.log('');
    console.log('✅ You can now login with PIN: 1234');
    console.log('📝 Add your own categories and products after login!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedDatabase();


