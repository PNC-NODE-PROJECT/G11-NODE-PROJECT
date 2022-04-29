
require('dotenv').config();
const mongoose = require("mongoose");

// CONNECT TO MONGODB 
mongoose.connect(process.env.DATABASE_URL);

// DEFIND SCHEAMA
const QuestionSchema= new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answers: {
        A: {
            type: String,
            required: true
        },
        B: {
            type: String,
            required: true
        },
        C: {
            type: String,
            required: true
        },
        D: {
            type: String,
            required: true
        }
    },
    correct: [String],
    score: {
        type: Number,
        required: true
    }
});


//CREATE THE MODEL FOR THE QUESTION COLLECTION FROM SCHEMA
const QuestionModel = mongoose.model("questions",QuestionSchema);


// IPORT MODULE
module.exports = QuestionModel;
