import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

// Disable query buffering globally so disconnected queries fail fast instead of hanging for 10s
mongoose.set("bufferCommands", false);
mongoose.set("bufferTimeoutMS", 2000);

/**
 * Connect to MongoDB with connection pooling and singleton caching
 * across Next.js serverless functions and HMR.
 */
export async function connectDB(): Promise<typeof mongoose | null> {
  if (!MONGODB_URI) {
    // Graceful fallback warning: if MONGODB_URI is not set, data fetchers can fall back to local JSON
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("❌ Failed to connect to MongoDB:", e);
    return null;
  }

  return cached.conn;
}
