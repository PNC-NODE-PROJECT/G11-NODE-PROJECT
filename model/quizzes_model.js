require('dotenv').config();
const mongoose = require("mongoose");

// CONNECT TO MONGODB 
mongoose.connect(process.env.DATABASE_URL);


const quizzesSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    questions: {
        type: [{
            question: {
                type: String,
                reqiored: true
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
            },
        }]
    }
});


//CREATE THE MODEL FOR THE QUESTION COLLECTION FROM SCHEMA
const QuizzesModel = mongoose.model("quizzes", quizzesSchema);


// IPORT MODULE
module.exports = QuizzesModel;