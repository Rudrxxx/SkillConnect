import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) throw new Error("❌ Missing MONGODB_URI in .env.local");

let connectPromise: Promise<typeof mongoose> | null = null;
let hasLoggedFailure = false;

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  if (connectPromise) return connectPromise;
  connectPromise = mongoose.connect(MONGODB_URI)
    .then((conn) => {
      console.log("✅ MongoDB connected successfully");
      return conn;
    })
    .catch((err) => {
      if (!hasLoggedFailure) {
        hasLoggedFailure = true;
        console.warn("⚠️ MongoDB connection not available yet. Check Atlas IP allowlist or URI.");
      }
      // Allow future retries only if connection state changes
      connectPromise = null;
      return Promise.reject(err);
    });
  return connectPromise;
};


