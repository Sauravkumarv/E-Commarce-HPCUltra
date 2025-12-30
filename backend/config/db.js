import mongoose from 'mongoose';

/**
 * Connect to MongoDB database
 * Uses connection string from environment variables
 */
export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI is not defined in .env file');
      console.log('💡 Please create a .env file with MONGODB_URI');
      process.exit(1);
    }
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Make sure MongoDB is running locally, OR');
    console.log('   2. Update MONGODB_URI in .env to use MongoDB Atlas');
    console.log('   3. For local MongoDB: mongodb://localhost:27017/hpcultra');
    console.log('   4. For MongoDB Atlas: mongodb+srv://user:pass@cluster.mongodb.net/hpcultra\n');
    process.exit(1);
  }
};

