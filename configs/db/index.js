const mongoose = require("mongoose");
const connectionStr = "mongodb+srv://nxgthanhcongcommunity:7d42nVDzIuGjatIL@cluster0.5ratn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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