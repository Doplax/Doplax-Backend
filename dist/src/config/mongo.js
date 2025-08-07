"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dbConnect = async () => {
    const DB_URI = process.env.DB_URI;
    if (!DB_URI) {
        console.error("❌ DB_URI is not defined in environment variables.");
        process.exit(1);
    }
    try {
        await mongoose_1.default.connect(DB_URI);
        console.log("✅ The connection with MongoDB has been successful.");
    }
    catch (err) {
        console.error("❌ Failed to connect to MongoDB", err);
        process.exit(1);
    }
};
exports.default = dbConnect;
//# sourceMappingURL=mongo.js.map