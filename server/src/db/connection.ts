import mongoose from 'mongoose';
import { env } from '../config/env.js';

let isConnected = false;

export async function connectToDatabase(): Promise<boolean> {
  if (!env.isDatabaseConfigured) {
    console.info('[Database] MONGODB_URI is not configured. Running in stateless mode (enquiries will not be stored in MongoDB).');
    isConnected = false;
    return false;
  }

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log('[Database] Connected successfully to MongoDB.');
    return true;
  } catch (error) {
    isConnected = false;
    console.error('[Database] Failed to connect to MongoDB:', error instanceof Error ? error.message : error);
    return false;
  }
}

export function isDbConnected(): boolean {
  return isConnected && mongoose.connection.readyState === 1;
}

export async function disconnectDatabase(): Promise<void> {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
    console.log('[Database] Disconnected from MongoDB.');
  }
}
