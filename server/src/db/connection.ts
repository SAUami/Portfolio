import mongoose from 'mongoose';
import { env } from '../config/env.js';

let isConnected = false;

// Register runtime event listeners for connection observability
mongoose.connection.on('connected', () => {
  isConnected = true;
  console.log('[Database] MongoDB connection established.');
});

mongoose.connection.on('error', (err) => {
  console.error('[Database] MongoDB runtime connection error:', err instanceof Error ? err.message : err);
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.warn('[Database] MongoDB disconnected.');
});

export async function connectToDatabase(): Promise<boolean> {
  if (!env.isDatabaseConfigured) {
    console.info('[Database] MONGODB_URI is not set in .env. Running in file-fallback mode (enquiries saved locally in server/data/enquiries.json).');
    isConnected = false;
    return false;
  }

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`[Database] Connected successfully to MongoDB: "${mongoose.connection.name}" on host "${mongoose.connection.host}".`);
    return true;
  } catch (error) {
    isConnected = false;
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[Database] Failed to connect to MongoDB:', errorMessage);
    console.warn('[Database] The server will continue running and safely save enquiries to local storage.');
    return false;
  }
}

export function isDbConnected(): boolean {
  return isConnected && mongoose.connection.readyState === 1;
}

export function getDatabaseStatus(): {
  configured: boolean;
  connected: boolean;
  databaseName?: string;
  host?: string;
  readyState: number;
} {
  return {
    configured: env.isDatabaseConfigured,
    connected: isDbConnected(),
    databaseName: mongoose.connection.name || undefined,
    host: mongoose.connection.host || undefined,
    readyState: mongoose.connection.readyState,
  };
}

export async function disconnectDatabase(): Promise<void> {
  if (isConnected || mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    isConnected = false;
    console.log('[Database] Disconnected from MongoDB.');
  }
}

