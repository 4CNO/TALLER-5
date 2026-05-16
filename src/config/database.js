const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI ||
  'mongodb://dockerbddivisionpolitica:27017/divisionpolitica';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB conectado: divisionpolitica');
  } catch (err) {
    console.error('❌ Error conectando a MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
