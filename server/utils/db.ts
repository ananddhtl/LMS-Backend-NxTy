
require("dotenv").config();


const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URL, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);   

  }
};

module.exports = connectDB;