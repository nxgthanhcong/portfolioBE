const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectionStr = process.env.DATABASE_URL;

async function connectDB() {
    try {
        await mongoose.connect(connectionStr, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("connect db ok");
    } catch (error) {
        console.log("connect db fail", error);
    }
}

module.exports = connectDB;