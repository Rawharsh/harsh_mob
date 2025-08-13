import express from 'express'
import mongoose from 'mongoose';
import authRoutes from "./routes/authRoutes.js"


import dotenv from "dotenv";
dotenv.config();


const app = express();
const PORT = 5000;
app.use(express.json());




app.use('/',authRoutes);




mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});