const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            maxPoolSize: 10,        // increase if your app is high-traffic
            serverSelectionTimeoutMS: 5000, // optional
        });
        console.log("Database is Connected");
    } catch (error) {
        console.error("Database Connection Error:", error);
        process.exit(1);
    }
    mongoose.connection.on("error", (err) => {
        console.error("Mongoose Connection Error:", err);
    });
    mongoose.connection.on("disconnected", () => {
        console.warn("Mongoose disconnected. Attempting to reconnect...");
    });
    // Reconnection listener (optional)
    mongoose.connection.on("connected", () => {
        console.log("Mongoose reconnected to the database");
    });
    process.on("SIGINT", async () => {
        await mongoose.connection.close();
        console.log("MongoDB connection closed on app termination");
        process.exit(0);
    });
};

module.exports = connectDB;

// const mongoose = require("mongoose");
// const dotenv = require("dotenv").config();

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             maxPoolSize: 10,                 // Handles up to 10 concurrent DB connections
//             serverSelectionTimeoutMS: 5000,  // Fail fast if DB is unreachable
//         });

//         console.log("✅ Database is Connected");
//     } catch (error) {
//         console.error("❌ Database Connection Error:", error);
//         process.exit(1); // Exit the app if DB connection fails
//     }

//     // Connection error listener
//     mongoose.connection.on("error", (err) => {
//         console.error("❌ Mongoose Connection Error:", err);
//     });

//     // Disconnection listener
//     mongoose.connection.on("disconnected", () => {
//         console.warn("⚠️ Mongoose disconnected. Attempting to reconnect...");
//     });

//     // Reconnection listener (optional)
//     mongoose.connection.on("connected", () => {
//         console.log("🔄 Mongoose reconnected to the database");
//     });

//     // Graceful shutdown on process termination
//     process.on("SIGINT", async () => {
//         await mongoose.connection.close();
//         console.log("🛑 MongoDB connection closed on app termination");
//         process.exit(0);
//     });
// };

// module.exports = connectDB;