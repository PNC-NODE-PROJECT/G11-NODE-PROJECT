
if (!sessionStorage.userId) {
    location.href = "../register/register_view.html";
}

import {hide, show} from "../../utils/hide_show.js";



// START QUIZ
function getAllQuestion(number) {
    axios.get("/quizzes/quiz/"+quizId).then((response) => {
        let questions = response.data[0].questions;
        if (number < questions.length) {
            showQuestionOnDom(questions[number]);
            startDuration();
        } else {
            showScore();
        }
    }).catch((error) => {
        console.log(error);
    })
}

// CHANGE QUESTION
function startQuiz() {
    if (questionAmount > 0) {
        show(quizContainer);
        hide(navigation);
        hide(quizFeatureContainer);
        hide(computeScoreContainer);
        currentQuestNumb = 0;
        myScore = 0;
        maxScore = 0;
        myAnswer = [];
        goodBadAnswers = [];
        mainWidthDurationBar = durationContainer.getBoundingClientRect().width;
        loadQuestionNumber();
    } else {
        alert("You have no question yes! Please create some questions first");
    }
}

// INCREASE QUESTION NUMBER
function loadQuestionNumber() {
    getAllQuestion(currentQuestNumb);
    currentQuestNumb += 1;
    if (currentQuestNumb == questionAmount) {
        btnNext.textContent = "SUBMIT";
    }
}

// GET SELECTED ANSWER
function getSelectedAnswer() {
    let selectedAnswers = []
    domAnswers.forEach(element => {
        if (element.checked == true) {
            selectedAnswers.push(element.value);
        }
        element.checked = false;
    })

    myAnswer.push(selectedAnswers);
    loadQuestionNumber();
}

// CALCULATE SCORE
function calculateScore() {
    axios.get("/quizzes/quiz/"+quizId).then((response) => {
        let questions = response.data[0].questions;
        let index = 0;
        for (let item of questions) {
            let isCorrectAll = true;
            maxScore += item.score;
            if (item.correct.length == myAnswer[index].length) {
                for (let ans of item.correct) {
                    if (!myAnswer[index].includes(ans)) {
                        isCorrectAll = false;
                    }
                }
            } else {
                isCorrectAll = false;
            }
            if (isCorrectAll) {
                myScore += item.score;
                goodBadAnswers.push(true);
            } else {
                goodBadAnswers.push(false);
            }
            
            index ++;
        }
        totalScore.textContent = myScore+"/"+maxScore;
    }).catch((error) => {
        console.log(error);
    })
}

// COMPUTE SCORE
function showScore() {
    hide(quizContainer);
    show(computeScoreContainer);
    calculateScore();
    displayCorrection();
    btnNext.textContent = "NEXT";
};

// UPDATE DOM
function showQuestionOnDom(item) {
    quest.textContent = item.question;
    questNumber.textContent = currentQuestNumb + "/" + questionAmount;
    ansA.textContent = item.answers.A;
    ansB.textContent = item.answers.B;
    ansC.textContent = item.answers.C;
    ansD.textContent = item.answers.D;
    if (item.correct.length > 1) {
        domAnswers.forEach(element => {
            element.type = "checkbox";
        })
    } else {
        domAnswers.forEach(element => {
            element.type = "radio";
        })
    }
}

// DURATION
function startDuration() {
    durationBar.style.width = mainWidthDurationBar + "px";
    currentWidthDurationBar = durationBar.getBoundingClientRect().width;
    widthPerStep = durationBar.getBoundingClientRect().width / 2000;
    setTime();
}

// UPDATE PROGRESS BAR
function countDown() {
    if (currentWidthDurationBar > 0) {
        currentWidthDurationBar -= widthPerStep;
        durationBar.style.width = currentWidthDurationBar + "px";
        clearTime(count);
        setTime();
    } else if (currentWidthDurationBar <= 0 && currentQuestNumb <= questionAmount) {
        getSelectedAnswer();
    }
}

// SET TIME
function setTime() {
    count = setTimeout(countDown, 10);
}

// CLEAR TIME
function clearTime(timeout) {
    clearTimeout(timeout);
}

// BACK HOME
function backHome() {
    // if (confirm("Are you sure to go back?")) {
        hide(quizContainer);
        show(navigation);
        show(quizFeatureContainer);
    // }
}

// ACTIVE WHEN USER CLICK AN ANSWER
function onClickAnswer(e) {
    if (e.target.id == "answer-checkbox" || e.target.id == "answer-content") {
        let targetID = e.target.children[0].id;
        activeAnswers.forEach(element => {
            if (element.id == targetID && element.checked == false) {
                element.checked = true;
            } else if (element.id == targetID && element.checked == true && element.type == "checkbox") {
                element.checked = false;
            }
        })
    }
}



// DISPLAY GOOD AND BAD ANSWER
function displayCorrection() {
    // REMOVE PREVIOUS ELEMENTS
    while (corretionList.lastChild) {
        corretionList.removeChild(corretionList.lastChild);
    }

    let index = 0;
    axios.get("/quizzes/quiz/"+quizId).then((response) => {
        let questions = response.data[0].questions;

        // LOOP TO DISPLAY ALL CORRECTIONS
        for (let item of questions) {
            let card = document.createElement("div");
            card.className = "question-show question-card my-shadow small-border-top mb-4";
            card.id = item._id;
            corretionList.appendChild(card);

            let cardheader = document.createElement("div");
            cardheader.className = "d-flex justify-content-between mt-2 ms-3";
            card.appendChild(cardheader);

            let scoreAndTitle = document.createElement("div");
            scoreAndTitle.className = "d-flex";
            cardheader.appendChild(scoreAndTitle);

            let questionScore = document.createElement("h6");
            questionScore.className = "me-2 text-primary";
            if (goodBadAnswers[index]) {
                questionScore.textContent = "(" + item.score + " pts)";
            } else {
                questionScore.textContent = "(0 pts)";
            }
            scoreAndTitle.appendChild(questionScore);

            let questTitle = document.createElement("h6");
            questTitle.textContent = item.question;
            scoreAndTitle.appendChild(questTitle);

            let headerMenu = document.createElement("div");
            if (myAnswer[index].length == 0) {
                headerMenu.textContent = "No answer selected!";
                headerMenu.className = "text-danger me-2";
            }

            cardheader.appendChild(headerMenu);

            let cardFooter = document.createElement("div");
            cardFooter.className = "mt-3 ms-5";
            card.appendChild(cardFooter);


            let answerA = createAnswer();
            let ia = createIElement()
            let pa = createPElement(item.answers.A);
            answerA.appendChild(ia);
            answerA.appendChild(pa);
            cardFooter.append(answerA);

            let answerB = createAnswer();
            let ib = createIElement()
            let pb = createPElement(item.answers.B);
            answerB.appendChild(ib);
            answerB.appendChild(pb);
            cardFooter.append(answerB);

            let answerC = createAnswer();
            let ic = createIElement()
            let pc = createPElement(item.answers.C);
            answerC.appendChild(ic);
            answerC.appendChild(pc);
            cardFooter.append(answerC);

            let answerD = createAnswer();
            let id = createIElement()
            let pd = createPElement(item.answers.D);
            answerD.appendChild(id);
            answerD.appendChild(pd);
            cardFooter.append(answerD);

            // UPDATE ANSWERS THAT ARE CORRECT
            paintCorrectAnswers(item.correct, "A", ia, pa);
            paintCorrectAnswers(item.correct, "B", ib, pb);
            paintCorrectAnswers(item.correct, "C", ic, pc);
            paintCorrectAnswers(item.correct, "D", id, pd);

            // // UPDATE USER'S ANSWER
            paintUserAnswers(myAnswer[index], goodBadAnswers[index], item.correct, "A", ia, pa);
            paintUserAnswers(myAnswer[index], goodBadAnswers[index], item.correct, "B", ib, pb);
            paintUserAnswers(myAnswer[index], goodBadAnswers[index], item.correct, "C", ic, pc);
            paintUserAnswers(myAnswer[index], goodBadAnswers[index], item.correct, "D", id, pd);
 

            index ++;
        }


    }).catch((error) => {
        console.log(error);
    })
}

// CREATE ANSWERS ELEMENTS
function createAnswer() {
    let answer = document.createElement("div");
    answer.className = "d-flex";

    return answer;
}

// CREATE I ELEMENT FOR ICON
function createIElement() {
    let i = document.createElement("i");
    i.className = "material-icons";

    return i;
}

// CREATE P ELEMENT FOR ANSWER TEXT
function createPElement(answerText) {
    let p = document.createElement("p");
    p.className = "ms-2";
    p.textContent = answerText;

    return p;
}

// UPDATE ANSWERS THAT ARE CORRECT
function paintCorrectAnswers(correctAnswers, answerLetter, i, p) {
    if (correctAnswers.includes(answerLetter)) {
        i.textContent = "done";
        i.style.color = "green";
        p.style.color = "green";
    } else {
        
    }
}

// UPDATE USER'S ANSWER
function paintUserAnswers(userAnswer, goodOrBad, correctAnswer, answerLetter, i, p) {
    if (userAnswer.includes(answerLetter) && !goodOrBad && !correctAnswer.includes(answerLetter)) {
        i.textContent = "close";
        i.style.color = "red";
        p.style.color = "red";
    }
}

// DISPLAY QUIZZES FEATURE
function displayQuizzesFeature(){
    
    while (quizFeatures.lastChild) {
        quizFeatures.removeChild(quizFeatures.lastChild);
    }

    let owner = sessionStorage.userId;
    axios.post("/quizzes/owns", {owner: owner}).then((response) => {

        let quizzes = response.data.reverse();

        if (quizzes.length > 0) {
            noQuizAlert.textContent = null;
            quizzes.forEach(quiz => {
                let card = document.createElement("div");
                card.className = "m-auto f-column d-flex justify-content-end quiz-feature rounded-3";
                card.id = quiz._id;
                quizFeatures.appendChild(card);
    
                let cardImage = document.createElement("img");
                cardImage.width = "200";
                cardImage.src = "../../images/feature_1.png";
                card.appendChild(cardImage);
    
                let cardTitle = document.createElement("h4");
                cardTitle.className = "mt-3";
                cardTitle.textContent = quiz.title;
                card.appendChild(cardTitle);
    
                let cardQuestions = document.createElement("h5");
                cardQuestions.className = "mb-3 mt-1 amout-quest";
                cardQuestions.id = quiz.questions.length;
                cardQuestions.textContent = quiz.questions.length + " Questions";
                card.appendChild(cardQuestions);
    
                let cardButton = document.createElement("button");
                cardButton.className = "bg-orange px-5 py-2 decoration border-none text-light welcome-btn mt-5 mb-5";
                cardButton.id = "btn-start-quiz";
                cardButton.textContent = "PLAY NOW";
                card.appendChild(cardButton);
    
            })
        } else {
            noQuizAlert.textContent = "No quiz for now!";
        }

    }).catch((error) => {
        console.log(error);
    })
}


// CHECK TO START QUIZ
function onClickFeature(e) {
    let target = e.target.id;
    quizId = e.target.parentNode.id;
    questionAmount = e.target.parentNode.children[2].id;
    if (target == "btn-start-quiz") {
        startQuiz();
    }
}

// SAVE FILE AS PDF






// VARIABLES
// let userId = sessionStorage.userId;
let quizId = null;
let questionAmount = 0;
let maxScore = 0;
let myScore = 0;
let myAnswer = [];
let goodBadAnswers = [];
let currentQuestNumb = 0;
let count = setTimeout(0);
const durationContainer = document.getElementById("duration-container");
const durationBar = document.getElementById("duration");
let mainWidthDurationBar = durationContainer.getBoundingClientRect().width;
let currentWidthDurationBar = durationBar.getBoundingClientRect().width;
let widthPerStep = durationBar.getBoundingClientRect().width / 2000;


const quest = document.querySelector(".dom-quest");
const questNumber = document.querySelector(".quest-number");
const ansA = document.querySelector(".ans-A");
const ansB = document.querySelector(".ans-B");
const ansC = document.querySelector(".ans-C");
const ansD = document.querySelector(".ans-D");
const domAnswers = document.querySelectorAll("input[name=my-answer]");


// MAIN
const answersBox = document.querySelector("#answers-box");
const activeAnswers = document.querySelectorAll("input[name=my-answer]");
const quizContainer = document.querySelector("#quiz-container");
const navigation = document.getElementById("navigation");
const quizFeatureContainer = document.querySelector("#quiz-feature-container");
const btnNext = document.querySelector(".btn-next");
const btnHome = document.querySelector(".btn-home-contain");
const computeScoreContainer = document.querySelector("#compute-score-container");
const totalScore = document.querySelector("#total-score");
const corretionList = document.querySelector("#correction-list");
const btnPlayAgain = document.getElementById("btn-play-again");
const quizFeatures = document.querySelector("#quiz-features");
const noQuizAlert = document.querySelector("#no-quiz-alert");


answersBox.addEventListener("click", onClickAnswer);
btnNext.addEventListener("click", getSelectedAnswer);
btnHome.addEventListener("click", backHome);
btnPlayAgain.addEventListener("click", startQuiz);
quizFeatures.addEventListener("click", onClickFeature);


displayQuizzesFeature();
