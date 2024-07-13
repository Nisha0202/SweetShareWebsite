import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;
// const uri = `mongodb+srv://${process.env.S3_BUCKET}:${process.env.SECRET_KEY}@cluster0.5cua0xk.mongodb.net/sweetshare?retryWrites=true&w=majority&appName=Cluster0`;

const uri = `mongodb+srv://Admin:Admin0202@cluster0.5cua0xk.mongodb.net/sweetshare?retryWrites=true&w=majority&appName=Cluster0`;

export const connect = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(uri);

    isConnected = true;
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

