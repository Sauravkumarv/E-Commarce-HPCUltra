import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { connectDB } from '../config/db.js';

// Load environment variables
dotenv.config();

/**
 * Script to create or update a user to admin role
 * Usage: node scripts/createAdmin.js <email> [password]
 * 
 * If user exists, updates role to admin
 * If user doesn't exist, creates new admin user
 */
const createAdmin = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('Connected to MongoDB');

    // Get email and password from command line arguments
    const email = process.argv[2];
    const password = process.argv[3];

    if (!email) {
      console.error('Error: Email is required');
      console.log('Usage: node scripts/createAdmin.js <email> [password]');
      console.log('Example: node scripts/createAdmin.js admin@example.com mypassword');
      process.exit(1);
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      // Update existing user to admin
      user.role = 'admin';
      await user.save();
      console.log(`✅ User ${email} has been updated to admin role`);
    } else {
      // Create new admin user
      if (!password) {
        console.error('Error: Password is required for new users');
        console.log('Usage: node scripts/createAdmin.js <email> <password>');
        process.exit(1);
      }

      user = await User.create({
        name: 'Admin User',
        email,
        password,
        role: 'admin',
      });
      console.log(`✅ Admin user created successfully: ${email}`);
    }

    console.log(`\n📧 Email: ${user.email}`);
    console.log(`👤 Role: ${user.role}`);
    console.log(`\nYou can now login with these credentials at POST /api/auth/login`);

    // Close database connection
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run the script
createAdmin();

