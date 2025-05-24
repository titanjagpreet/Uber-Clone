import mongoose from 'mongoose';

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to DB');
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
  }
}