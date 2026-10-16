import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { Enquiry } from '../models/Enquiry.js';

async function testConnection(): Promise<void> {
  console.log('='.repeat(60));
  console.log('🧪 MongoDB Connection Diagnostic Tool');
  console.log('='.repeat(60));

  console.log(`\n1. Checking environment configuration:`);
  console.log(`   - Environment: ${env.NODE_ENV}`);
  console.log(`   - MONGODB_URI configured: ${env.isDatabaseConfigured ? 'YES' : 'NO'}`);

  if (!env.isDatabaseConfigured) {
    console.error('\n❌ ERROR: MONGODB_URI is not set or is empty in server/.env file.');
    console.log('\n👉 To fix this:');
    console.log('   1. Open "server/.env" in your editor.');
    console.log('   2. Set MONGODB_URI to your MongoDB connection string, for example:');
    console.log('      - For Local MongoDB:');
    console.log('        MONGODB_URI=mongodb://127.0.0.1:27017/saurabh_portfolio');
    console.log('      - For MongoDB Atlas (Cloud):');
    console.log('        MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/saurabh_portfolio?retryWrites=true&w=majority');
    console.log('\n   3. Run "npm run db:test" again.');
    console.log('='.repeat(60));
    process.exit(1);
  }

  // Mask credentials when printing URI
  const maskedUri = env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');
  console.log(`   - Target URI: ${maskedUri}`);

  console.log('\n2. Attempting connection to MongoDB (timeout: 6000ms)...');

  try {
    const startTime = Date.now();
    mongoose.set('strictQuery', true);
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 6000,
    });
    const duration = Date.now() - startTime;

    console.log('\n✅ SUCCESS: Connected to MongoDB successfully!');
    console.log(`   - Database Name : ${mongoose.connection.name}`);
    console.log(`   - Host          : ${mongoose.connection.host}`);
    console.log(`   - Port          : ${mongoose.connection.port || 'default'}`);
    console.log(`   - Latency       : ${duration}ms`);

    // Verify model query
    const enquiryCount = await Enquiry.countDocuments();
    console.log(`   - Existing Enquiries in DB: ${enquiryCount}`);

    console.log('\n🎉 Your database is completely ready and connected for Saurabh Portfolio!');
    console.log('='.repeat(60));

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ FAILED TO CONNECT TO MONGODB:');
    const msg = error instanceof Error ? error.message : String(error);
    console.error(`   ${msg}\n`);

    console.log('🔍 Troubleshooting Tips:');
    if (env.MONGODB_URI.includes('mongodb+srv://')) {
      console.log('   [MongoDB Atlas]');
      console.log('   1. Check your database username & password. Ensure "<" and ">" were removed.');
      console.log('   2. If password contains special characters (@, #, $, etc.), URL-encode them.');
      console.log('   3. Check Network Access in MongoDB Atlas dashboard:');
      console.log('      - Ensure IP Access List includes "0.0.0.0/0" (Allow access from anywhere).');
    } else {
      console.log('   [Local MongoDB]');
      console.log('   1. Check if MongoDB Service is running on your machine.');
      console.log('   2. Try opening MongoDB Compass and connecting to mongodb://127.0.0.1:27017');
    }
    console.log('='.repeat(60));

    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
}

testConnection();
