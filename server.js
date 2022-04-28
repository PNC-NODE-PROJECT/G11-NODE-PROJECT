
require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


// RUN SERVER
app.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
});


// DDFINE STATIC
app.use(express.static("front_end"));

// REQUEST TARGETS
let question = require('./routes/question');
app.use('/questions',question);