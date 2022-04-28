
require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT ||80;


// RUN SERVER
app.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
});


// DDFINE STATIC
app.use(express.static("public"));

// REQUEST TARGETS
let question = require('./routes/question');
app.use('/questions',question);