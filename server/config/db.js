const mongoose = require("mongoose");
const config = require("./keys");
const db = config.mongoURI;

const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            //useNewUrlParser: true, 
            //useUnifiedTopology: true,
        });
        console.log("Connected to database");
    }catch(err){
        console.log("Connection Failed: " + err.toString());
        process.exit(1);
    }
}

module.exports = connectDB;