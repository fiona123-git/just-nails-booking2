const mongoose = require("mongoose");

const db = "mongodb+srv://fiona:YfLOskEcByA8CwwU@cluster0.tcuah.mongodb.net/nails?retryWrites=true&w=majority"

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB is connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
