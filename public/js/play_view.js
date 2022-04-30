
if (!sessionStorage.userId) {
    location.href = "register_view.html";
}

import {hide, show} from "./hide_show.js";



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
    hide(computeScoreContainer);
    currentQuestNumb = 0;
    myScore = 0;
    maxScore = 0;
    myAnswer = [];
    goodBadAnswers = [];
    mainWidthDurationBar = durationContainer.getBoundingClientRect().width;
    loadQuestionNumber();
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
    axios.get("/questions/all").then((response) => {
        let questions = response.data;
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
    questNumber.textContent = currentQuestNumb + "/" + maxQuestion;
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

// REFRESH QUESTIONS AMOUNT
function amoutQuest() {
    axios.get("/questions/all").then((response) => {
        featureQuestAmount.textContent = response.data.length + " Questions";
        questionAmount = response.data.length;
    }).catch((error) => {
        console.log(error);
    })
}

// DISPLAY GOOD AND BAD ANSWER
function displayCorrection() {
    // REMOVE PREVIOUS ELEMENTS
    while (corretionList.lastChild) {
        corretionList.removeChild(corretionList.lastChild);
    }

    let index = 0;
    axios.get("/questions/all").then((response) => {
        let questions = response.data;

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
                headerMenu.textContent = "No answer selected!"
                headerMenu.className = "text-danger me-2";
            }
            cardheader.appendChild(headerMenu);

            let cardFooter = document.createElement("div");
            cardFooter.className = "mt-3 ms-5";
            card.appendChild(cardFooter);

            //A
            let answersA = document.createElement("div");
            answersA.className = "d-flex";
            cardFooter.appendChild(answersA);

            let ia = document.createElement("i");
            ia.className = "material-icons";
            answersA.appendChild(ia);

            let pa = document.createElement("p");
            pa.className = "ms-2";
            pa.textContent = item.answers.A;
            answersA.appendChild(pa);

            //B
            let answersB = document.createElement("div");
            answersB.className = "d-flex";
            cardFooter.appendChild(answersB);

            let ib = document.createElement("i");
            ib.className = "material-icons";
            answersB.appendChild(ib);

            let pb = document.createElement("p");
            pb.className = "ms-2";
            pb.textContent = item.answers.B;
            answersB.appendChild(pb);

            //C
            let answersC = document.createElement("div");
            answersC.className = "d-flex";
            cardFooter.appendChild(answersC);

            let ic = document.createElement("i");
            ic.className = "material-icons";
            answersC.appendChild(ic);

            let pc = document.createElement("p");
            pc.className = "ms-2";
            pc.textContent = item.answers.C;
            answersC.appendChild(pc);

            // D
            let answersD = document.createElement("div");
            answersD.className = "d-flex";
            cardFooter.appendChild(answersD);

            let id = document.createElement("i");
            id.className = "material-icons";
            answersD.appendChild(id);

            let pd = document.createElement("p");
            pd.className = "ms-2";
            pd.textContent = item.answers.D;
            answersD.appendChild(pd);

            // UPDATE ANSWERS THAT ARE CORRECT
            if (item.correct.includes("A")) {
                ia.textContent = "done";
                ia.style.color = "green";
                pa.style.color = "green";
            }
            if (item.correct.includes("B")) {
                ib.textContent = "done";
                ib.style.color = "green";
                pb.style.color = "green";
            }
            if (item.correct.includes("C")) {
                ic.textContent = "done";
                ic.style.color = "green";
                pc.style.color = "green";
            }
            if (item.correct.includes("D")) {
                id.textContent = "done";
                id.style.color = "green";
                pd.style.color = "green";
            }

            // UPDATE USER'S ANSWER
            if (myAnswer[index].includes("A") && !goodBadAnswers[index] && !item.correct.includes("A")) {
                ia.textContent = "close";
                ia.style.color = "red";
                pa.style.color = "red";
            }
            if (myAnswer[index].includes("B") && !goodBadAnswers[index] && !item.correct.includes("B")) {
                ib.textContent = "close";
                ib.style.color = "red";
                pb.style.color = "red";
            }
            if (myAnswer[index].includes("C") && !goodBadAnswers[index] && !item.correct.includes("C")) {
                ic.textContent = "close";
                ic.style.color = "red";
                pc.style.color = "red";
            }
            if (myAnswer[index].includes("D") && !goodBadAnswers[index] && !item.correct.includes("D")) {
                id.textContent = "close";
                id.style.color = "red";
                pd.style.color = "red";
            }

            index ++;
        }


    }).catch((error) => {
        console.log(error);
    })
}




// VARIABLES
let questionAmount = 0;
let maxScore = 0;
let myScore = 0;
let myAnswer = [];
let goodBadAnswers = [];
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
const corretionList = document.querySelector("#correction-list");
const btnPlayAgain = document.getElementById("btn-play-again");


btnStartQuiz.addEventListener("click", startQuiz);
answersBox.addEventListener("click", onClickAnswer);
btnNext.addEventListener("click", getSelectedAnswer);
btnHome.addEventListener("click", backHome);
btnPlayAgain.addEventListener("click", startQuiz);


amoutQuest();