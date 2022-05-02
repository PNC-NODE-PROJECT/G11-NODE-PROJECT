

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

let user = require('./routes/user');
app.use('/users',user);


let quizzes = require('./routes/quizzes');
app.use('/quizzes',quizzes)