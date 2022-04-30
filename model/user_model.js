require('dotenv').config();
const mongoose = require("mongoose");

// CONNECT TO MONGODB 
mongoose.connect(process.env.DATABASE_URL);

// DEFIND SCHEAMA
const UserSchema= new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
});


//CREATE THE MODEL FOR THE QUESTION COLLECTION FROM SCHEMA
const UserModel = mongoose.model("users", UserSchema);


// IPORT MODULE
module.exports =  UserModel;