
if (!sessionStorage.userId) {
    location.href = "../register/register_view.html";
}

import {hide, show} from "../../utils/hide_show.js";


// BUTTON ADD QUESTION
function onAddquestion() {
    show(questionDialog);
    hide(btnCreateQuestion);
}

// CLICKING ON FORM
function onClickDialog(e) {
    let clickTarget = e.target.textContent;
    if (clickTarget == "Cancel") {
        hide(questionDialog);
        show(btnCreateQuestion);
        refreshQuestionForm();
        dialogBtnCreate.textContent = "Create";
    } else if (clickTarget == "Create") {
        onCreateQuestion();
    } else if (clickTarget == "Save") {
        onSaveUpdate(formQuestionID.value);
    }
}

// CHECK TO CREATE QUESTION TO DATABASE
function onCreateQuestion() {
    let question = formQuestion.value;
    let answers = {A: answersA.value, B: answersB.value, C: answersC.value, D: answersD.value};
    let correct = [];
    for (let item of formCorrect) {
        if (item.checked == true) {
            correct.push(item.value);
        }
    }
    let score = formScore.value;
    if (question && answers.A && answers.B && answers.C && answers.D && correct.length > 0 && score) {
        questions.push({question: question, answers: answers, correct: correct, score: score});
        saveData(questions);
        loadData();

        hide(questionDialog);
        show(btnCreateQuestion);
        refreshQuestionForm();
        displayQuestions();
    } else {
        console.log("Adding failed");

        dialogValidated();
        questionDialog.addEventListener("change", dialogValidated);
    }

}

// ON DIALOG VALIDATE
function dialogValidated() {
    
    if (formQuestion.value == "") {
        formQuestion.placeholder = "Please enter the question";
        formQuestion.className = "border-none no-outline border-bt-warning w-100 py-1 place-warning";
    } else {
        formQuestion.placeholder = "Question";
        formQuestion.className = "border-none focus-orange no-outline title-input w-100 py-1";
    }

    if (answersA.value == "") {
        answersA.placeholder = "Please enter answer A";
        answersA.className = "border-none no-outline border-bt-warning place-warning w-100 ms-2 py-1";
    } else {
        answersA.placeholder = "Answer A";
        answersA.className = "border-none focus-orange no-outline title-input w-100 ms-2 py-1";
    }

    if (answersB.value == "") {
        answersB.placeholder = "Please enter answer B";
        answersB.className = "border-none no-outline border-bt-warning place-warning w-100 ms-2 py-1";
    } else {
        answersB.placeholder = "Answer B";
        answersB.className = "border-none focus-orange no-outline title-input w-100 ms-2 py-1";
    }

    if (answersC.value == "") {
        answersC.placeholder = "Please enter answer C";
        answersC.className = "border-none no-outline border-bt-warning place-warning w-100 ms-2 py-1";
    } else {
        answersC.placeholder = "Answer C";
        answersC.className = "border-none focus-orange no-outline title-input w-100 ms-2 py-1";
    }

    if (answersD.value == "") {
        answersD.placeholder = "Please enter answer D";
        answersD.className = "border-none no-outline border-bt-warning place-warning w-100 ms-2 py-1";
    } else {
        answersD.placeholder = "Answer D";
        answersD.className = "border-none focus-orange no-outline title-input w-100 ms-2 py-1";
    }

    let isHasAnser = false;
    formCorrect.forEach(element => {
        if (element.checked == true) {
            isHasAnser = true;
        }
    })
    if (!isHasAnser) {
        correctAnserAlert.style.visibility = "visible";
    } else {
        correctAnserAlert.style.visibility = "hidden";
    }
}

// REFRESH DIALOG
function refreshQuestionForm() {
    refreshInputText(formQuestion);
    refreshInputText(answersA);
    refreshInputText(answersB);
    refreshInputText(answersC);
    refreshInputText(answersD);
    refreshInputNumber(formScore);
    makeInputToChecked(formCorrect[0]);
    formCorrect.forEach(element => {
        element.type = "radio";
    })
    activeManyAnswers.checked = false;
    formCorrect[0].checked = true;

    formQuestion.placeholder = "Question";
    formQuestion.className = "border-none focus-orange no-outline title-input w-100 py-1";

    answersA.placeholder = "Answer A";
    answersA.className = "border-none focus-orange no-outline title-input w-100 ms-2 py-1";

    answersB.placeholder = "Answer B";
    answersB.className = "border-none focus-orange no-outline title-input w-100 ms-2 py-1";

    answersC.placeholder = "Answer C";
    answersC.className = "border-none focus-orange no-outline title-input w-100 ms-2 py-1";

    answersD.placeholder = "Answer D";
    answersD.className = "border-none focus-orange no-outline title-input w-100 ms-2 py-1";

    correctAnserAlert.style.visibility = "hidden";
}

// TO REFRESH INPUT TYPE TEXT TO NULL
function refreshInputText(ele) {
    ele.value = null;
}
// TO REFRESH TYPE NUMBER TO 0
function refreshInputNumber(ele) {
    ele.value = 0;
}
// TO REFRESH RADIO OR CHECKBOX TO CHECKED
function makeInputToChecked(ele) {
    ele.checked = true;
}


// DISPLAY THE LIST OF QUESTION
function displayQuestions() {
    // REMOVE PREVIOUS ELEMENTS
    while (questionList.lastChild) {
        questionList.removeChild(questionList.lastChild);
    }

    let index = 0;
    // LOOP TO DISPLAY ALL QUESTIONS
    for (let item of questions.reverse()) {
        let card = document.createElement("div");
        card.className = "question-show question-card my-shadow small-border-top mb-4";
        card.id = index;
        questionList.appendChild(card);

        let cardheader = document.createElement("div");
        cardheader.className = "d-flex justify-content-between mt-2 ms-3";
        card.appendChild(cardheader);

        let scoreAndTitle = document.createElement("div");
        scoreAndTitle.className = "d-flex";
        cardheader.appendChild(scoreAndTitle);

        let questionScore = document.createElement("h6");
        questionScore.className = "me-2 text-primary"
        questionScore.textContent = "(" + item.score + " pts)";
        scoreAndTitle.appendChild(questionScore);

        let questTitle = document.createElement("h6");
        questTitle.textContent = item.question;
        scoreAndTitle.appendChild(questTitle);

        let headerMenu = document.createElement("div");
        cardheader.appendChild(headerMenu);

        let editMenu = document.createElement("i");
        editMenu.className = "material-icons me-3 c-pointer hover-color-orange";
        editMenu.textContent = "edit";
        editMenu.id = "edit";
        headerMenu.appendChild(editMenu);

        let deleteMenu = document.createElement("i");
        deleteMenu.className = "material-icons me-3 c-pointer hover-color-orange";
        deleteMenu.textContent = "delete";
        deleteMenu.id = "delete";
        headerMenu.appendChild(deleteMenu);

        let cardFooter = document.createElement("div");
        cardFooter.className = "mt-3 ms-5";
        card.appendChild(cardFooter);

        //A
        let answerA = createAnswer("A",  item.answers.A, item.correct);
        cardFooter.appendChild(answerA);

        //B
        let answerB = createAnswer("B",  item.answers.B, item.correct);
        cardFooter.appendChild(answerB);

        //C
        let answerC = createAnswer("C",  item.answers.C, item.correct);
        cardFooter.appendChild(answerC);

        // D
        let answerD = createAnswer("D",  item.answers.D, item.correct);
        cardFooter.appendChild(answerD);


        index ++;
    }

}

function createAnswer(answerLetter, answerText, correctAnswers) {
    let answer = document.createElement("div");
    answer.className = "d-flex";
   
    let id = document.createElement("i");
    id.className = "material-icons";
    if (correctAnswers.includes(answerLetter)) {
        id.textContent = "done";
        id.style.color = "green";
    }
    answer.appendChild(id);
    let pd = document.createElement("p");
    pd.className = "ms-2";
    pd.textContent = answerText;
    if (correctAnswers.includes(answerLetter)) {
        pd.style.color = "green";
    }
    answer.appendChild(pd);

    return answer;
}

// CHECK USER CLICK MENU ON QUESTION
function onQuestionMenu(e) {
    let questionId = e.target.parentNode.parentNode.parentNode.id;
    if (e.target.id == "delete") {
        if (confirm("Are you sure to delete this question?")) {
            onDeleteQuestion(questionId);
        }
    } else if (e.target.id == "edit") {
        onPreEditQuestion(questionId);
    }
}

// DELETE A QUESTION
function onDeleteQuestion(id) {
    questions.splice(id, 1);
    saveData(questions);
    loadData();
    console.log("Question deleted");
    displayQuestions();
}


// EDIT A QUESTION
function onPreEditQuestion(id) {
    show(questionDialog);
    hide(btnCreateQuestion);
    dialogBtnCreate.textContent = "Save";
    formQuestionID.value = id;

    let question = questions[id];

    formQuestion.value = question.question;
    answersA.value = question.answers.A;
    answersB.value = question.answers.B;
    answersC.value = question.answers.C;
    answersD.value = question.answers.D;
    formScore.value = question.score;
    if (question.correct.length > 1) {
        activeManyAnswers.checked = true;
        formCorrect.forEach(element => {
            element.type = "checkbox";
            element.checked = false;
            if (question.correct.includes(element.value)) {
                element.checked = true;
            }
        })
        formCorrect.forEach(element => {
            if (question.correct.includes(element.value)) {
                element.checked = true;
            }
        });
    } else {
        formCorrect.forEach(element => {
            if (element.value == question.correct) {
                element.checked = true;
            }
        });
    }
}

// SAVE UPDATE
function onSaveUpdate(id) {
    let question = formQuestion.value;
    let answers = {A: answersA.value, B: answersB.value, C: answersC.value, D: answersD.value};
    let correct = [];
    for (let item of formCorrect) {
        if (item.checked == true) {
            correct.push(item.value);
        }
    }
    let score = formScore.value;
    if (question && answers.A && answers.B && answers.C && answers.D && correct.length > 0 && score) {

        let newQuest = {question: question, answers: answers, correct: correct, score: score}
        questions.splice(id, 1, newQuest);
        saveData(questions);
        loadData();
        console.log("Update successfully");

        hide(questionDialog);
        show(btnCreateQuestion);
        refreshQuestionForm();
        displayQuestions();
        dialogBtnCreate.textContent = "Create";
    } else {
        console.log("Update failed");

        dialogValidated();
        questionDialog.addEventListener("change", dialogValidated);
    }
}

// ACTIVE MANY ANSWERS
function onManyAnswers() {
    if (activeManyAnswers.checked == true) {
        formCorrect.forEach(element => {
            element.type = "checkbox";
        })
        formCorrect[0].checked = true;
    } else {
        formCorrect.forEach(element => {
            element.type = "radio";
        })
        formCorrect[0].checked = true;
    }
}



// CREATE QUIZ
function onCreateQuiz() {
    let thisQuizTitle = quizTitle.value;
    let userId = sessionStorage.userId;
    if (confirm("Save quiz?")){
        if (thisQuizTitle) {
            titleAlert.textContent = null;
            if (questions.length > 0) {

                axios.post("/quizzes/create", {title: thisQuizTitle, owner: userId, questions: questions}).then((response) => {
                    console.log("Quiz added");
                    questions = [];
                    saveData(questions);
                    quizTitle.value = null;
                    show(banner);
                    show(navigationBar);
                    hide(quizTitleBlock);
                    hide(createMenuContainer);
                    hide(allQuestionsContainer);
                    alert("Create quiz successfully!");
                }).catch((error) => {
                    console.log(error);
                })

            } else {
                alert("You have no any questions! Please create some questions")
            }
    
        } else {
            titleAlert.textContent = "Please enter title";
            quizTitle.addEventListener("change", () => {
                if (quizTitle.value) {
                    titleAlert.textContent = null;
                } else {
                    titleAlert.textContent = "Please enter title";
                }
            })
        }
    }
}


// LOAD DATA
function loadData() {
    if (localStorage.getItem("questions") == null) {
        saveData(questions);
    } else {
        questions = JSON.parse(localStorage.getItem("questions"));
    }
}

// SAVE DATA
function saveData(questions) {
    localStorage.setItem("questions", JSON.stringify(questions));
}


// CANCEL CREATE QUIZ 
function onCalcelCreate() {
    if (confirm("Cancel create quiz and leave?")) {
        questions = [];
        saveData(questions);
        show(banner);
        show(navigationBar);
        hide(quizTitleBlock);
        hide(createMenuContainer);
        hide(allQuestionsContainer);
    }
}

// START CREATE NEW QUIZ 
function startCreateNewQuiz() {
    hide(banner);
    hide(navigationBar);
    show(quizTitleBlock);
    show(createMenuContainer);
    show(allQuestionsContainer);
}



let questions = [];

// FORM ELEMENTS
const formQuestion = document.querySelector("#title");
const answersA = document.querySelector("#choiceA");
const answersB = document.querySelector("#choiceB");
const answersC = document.querySelector("#choiceC");
const answersD = document.querySelector("#choiceD");
const formCorrect = document.querySelectorAll("input[name=correct-ans]");
const formScore = document.querySelector("#score");
const formQuestionID = document.querySelector("#formQuestId");
const correctAnserAlert = document.querySelector(".correct-alert");

// MAIN
const questionDialog = document.querySelector("#quest-dialog-container");
const btnCreateQuestion = document.querySelector(".btn-create-question");
const dialogMenu = document.querySelector(".dialog-menu");
const questionList = document.querySelector("#question-list");
const dialogBtnCreate = document.querySelector("#create");
const activeManyAnswers = document.querySelector("#many-answers");

const titleAlert = document.querySelector("#title-alert");
const quizTitle = document.querySelector("#quiz-title-input");

const btnCreateQuiz = document.querySelector("#btn-create-quiz");
const btnCancelCreateQuiz = document.querySelector("#btn-cancel-create");

const btnStartCreateQuiz = document.querySelector("#btn-start-create-quiz");
const navigationBar = document.querySelector("#navigation-bar");
const banner = document.querySelector("#create-quiz-banner-container")
const createMenuContainer = document.querySelector("#create-menu-container");
const quizTitleBlock = document.querySelector("#quiz-title-block");
const allQuestionsContainer = document.querySelector(".all-quest-container");


btnCreateQuestion.addEventListener("click", onAddquestion);
dialogMenu.addEventListener("click", onClickDialog);
questionList.addEventListener("click", onQuestionMenu);
activeManyAnswers.addEventListener("change", onManyAnswers);
btnCreateQuiz.addEventListener("click", onCreateQuiz);
btnCancelCreateQuiz.addEventListener("click", onCalcelCreate);
btnStartCreateQuiz.addEventListener("click", startCreateNewQuiz);



loadData();
displayQuestions();