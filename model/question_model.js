

const mongoose = require("mongoose");



// TODO: Connect to MangoDB
mongoose.connect('mongodb://127.0.0.1:27017/quiz-app');

// defind schema

const QuestionScheama= new mongoose.Schema({
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
    correct: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});

// Create the Model for the question collection from Schema
const QuestionModel = mongoose.model("questions",QuestionScheama);


// import module
module.exports = QuestionModel;
