
// import {show} from "./create_view.js";

// HIDE
function hide(ele) {
    ele.style.display = "none";
}

// SHOW
function show(ele) {
    ele.style.display = "block";
}



// START QUIZ
function getAllQuestion(number) {
    axios.get("/questions/all").then((response) => {
        let questions = response.data;
        maxQuestion = questions.length;

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
    show(quizContainer);
    hide(navigation);
    hide(quizFeatureContainer);
    currentQuestNumb = 0;
    myScore = 0;
    myAnswer = [];
    mainWidthDurationBar = durationContainer.getBoundingClientRect().width;
    loadQuestionNumber();
}

// INCREASE QUESTION NUMBER
function loadQuestionNumber() {
    getAllQuestion(currentQuestNumb);
    currentQuestNumb += 1;
}

// GET SELECTED ANSWER
function getSelectedAnswer() {
    let isSelected = false;
    domAnswers.forEach(element => {
        if (element.checked == true) {
            myAnswer.push(element.value);
            isSelected = true;
        }
        element.checked = false;
    })
    if (!isSelected) {
        myAnswer.push("!@#$");
    }
    loadQuestionNumber();
}

// CALCULATE SCORE
function calculateScore() {
    axios.get("/questions/all").then((response) => {
        let questions = response.data;
        let index = 0;
        for (let item of questions) {
            if (item.correct == myAnswer[index]) {
                myScore += item.score;
            }
            index ++;
        }
        totalScore.textContent = myScore;
    }).catch((error) => {
        console.log(error);
    })
}

// COMPUTE SCORE
function showScore() {
    hide(quizContainer);
    show(computeScoreContainer);
    calculateScore();
};

// UPDATE DOM
function showQuestionOnDom(item) {
    quest.textContent = item.question;
    questNumber.textContent = currentQuestNumb + "/" + maxQuestion;
    ansA.textContent = item.answers.A;
    ansB.textContent = item.answers.B;
    ansC.textContent = item.answers.C;
    ansD.textContent = item.answers.D;
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
    } else if (currentWidthDurationBar <= 0 && currentQuestNumb <= 4) {
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
            if (element.id == targetID) {
                element.checked = true;
            }
        })
    }
}

// REFRESH QUESTIONS AMOUNT
function amoutQuest() {
    axios.get("/questions/all").then((response) => {
        featureQuestAmount.textContent = response.data.length + " Questions";
    }).catch((error) => {
        console.log(error);
    })
}



// VARIABLES
let myScore = 0;
let myAnswer = [];
let currentQuestNumb = 0;
let maxQuestion = 0;
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
const btnStartQuiz = document.querySelector("#btn-start-quiz");
const quizContainer = document.querySelector("#quiz-container");
const navigation = document.getElementById("navigation");
const quizFeatureContainer = document.querySelector(".quiz-feature-container");
const featureQuestAmount = document.querySelector(".amout-quest");
const btnNext = document.querySelector(".btn-next");
const btnHome = document.querySelector(".btn-home-contain");
const computeScoreContainer = document.querySelector("#compute-score-container");
const totalScore = document.querySelector("#total-score");


btnStartQuiz.addEventListener("click", startQuiz);
answersBox.addEventListener("click", onClickAnswer);
btnNext.addEventListener("click", getSelectedAnswer);
btnHome.addEventListener("click", backHome);


amoutQuest();