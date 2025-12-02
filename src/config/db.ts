import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI as string;
    console.log("🔌 Mongoose connecting to:", uri);

    if (!uri) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    await mongoose.connect(uri, {
      dbName: "test",   // 👈 force DB name
    });

    mongoose.connection.on("connected", () => {
      console.log("🟢 Connected to DB:", mongoose.connection.name);
    });

    console.log("✅ MongoDB connected");

  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
