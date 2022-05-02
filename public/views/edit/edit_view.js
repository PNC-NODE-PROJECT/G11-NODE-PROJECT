
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
        quizQuestions[0].questions.push({question: question, answers: answers, correct: correct, score: score});
        saveData(quizQuestions);
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
function displayQuestions(quizId) {

    loadData();
    
    // REMOVE PREVIOUS ELEMENTS
    while (questionList.lastChild) {
        questionList.removeChild(questionList.lastChild);
    }

    let index = 0;
    // LOOP TO DISPLAY ALL QUESTIONS
    let allQuestions = quizQuestions[0].questions.reverse();
    for (let item of allQuestions) {
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
    quizQuestions[0].questions.splice(id, 1);
    saveData(quizQuestions);
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

    let question = quizQuestions[0].questions[id];

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
    let quizId = storeQuizId.value;
    if (question && answers.A && answers.B && answers.C && answers.D && correct.length > 0 && score) {

        let newUpdate = {question: question, answers: answers, correct: correct, score: score, quiz_id: quizId};
        quizQuestions[0].questions.splice(id, 1, newUpdate);
        saveData(quizQuestions);
        loadData();
        console.log("Update successfully");
        
        hide(questionDialog);
        show(btnCreateQuestion);
        refreshQuestionForm();
        dialogBtnCreate.textContent = "Create";
        displayQuestions(quizId);
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


// DISPLAY LIST OF QUIZ
function displayQuizzes() {
    while (quizList.lastChild) {
        quizList.removeChild(quizList.lastChild);
    }

    let userId = sessionStorage.userId;
    axios.post("/quizzes/owns", {owner: userId}).then((response) => {
        let quizzes = response.data.reverse();

        if (quizzes.length > 0) {
            noQuizAlert.textContent = null;
            quizzes.forEach(quiz => {
                let card = document.createElement("div");
                card.className = "my-shadow mt-5 w-75 m-auto my-border-top bg-light rounded-3";
                card.id = quiz._id;
                quizList.appendChild(card);
    
                let cardBody = document.createElement("div");
                cardBody.className = "d-flex justify-content-between align-center";
                card.appendChild(cardBody);
    
                let quizTitle = document.createElement("h3");
                quizTitle.className = "ms-4 mt-1";
                quizTitle.textContent = quiz.title;
                cardBody.appendChild(quizTitle);
    
                let quizMenu = document.createElement("div");
                cardBody.appendChild(quizMenu);
    
                let menuEdit = document.createElement("i");
                menuEdit.className = "material-icons me-3 c-pointer hover-color-orange icon-bigger";
                menuEdit.textContent = "edit";
                menuEdit.id = "quiz-edit";
                quizMenu.appendChild(menuEdit);
    
                let menuDelete = document.createElement("i");
                menuDelete.className = "material-icons me-3 c-pointer hover-color-orange icon-bigger";
                menuDelete.id = "quiz-delete";
                menuDelete.textContent = "delete";
                quizMenu.appendChild(menuDelete);
    
                let amoutQuestion = document.createElement("h6");
                amoutQuestion.className = "text-primary ms-4 py-2";
                amoutQuestion.textContent = quiz.questions.length + " Questions";
                card.appendChild(amoutQuestion);
    
            })
        } else {
            noQuizAlert.textContent = "No quiz for now!";
        }

    }).catch((error) => {
        console.log(error);
    })
}

// CHECK WHEN CLICK ON QUIZ-LIST-CONTAINER
function onQuizListClick(e) {
    let myTarget = e.target.id;
    let quizId = e.target.parentNode.parentNode.parentNode.id;
    if (myTarget == "quiz-edit") {
        axios.get("/quizzes/quiz/"+quizId).then((response) => {
            quizQuestions = response.data;
            saveData(quizQuestions);
        })
        storeQuizId.value = quizId;
        axios.get("/quizzes/quiz/"+quizId).then((response) => {
            let quiz = response.data[0];
            myQuizTitle.value = quiz.title;
        }).catch((error) => {
            console.log(error);
        })
        saveData(quizQuestions);
        loadData();
        setTimeout(onEditQuiz, 500);
        
    } else if (myTarget == "quiz-delete") {
        if (confirm("Are you sure to delete this quiz?")) {
            onDeleteQuiz(quizId);
        }
    }
}

// DELETE A QUIZ
function onDeleteQuiz(quizId) {
    axios.delete("/quizzes/clear/"+quizId).then((response) => {
        console.log("Quiz deleted");
        displayQuizzes();
    }).catch((error) => {
        console.log(error);
    })
}

// EDIT QUIZ
function onEditQuiz() {
    hide(quizListContainer);
    hide(navigationBar);
    show(quizTitleBlock);
    show(allQuestionsContainer);
    show(editMenuContainer);
    quizQuestions = [];
    
    displayQuestions(storeQuizId.value);
}

// SAVE OR CANCEL
function onEditMenuContainerClick(e) {
    let myTarget = e.target.id;
    let quizId = storeQuizId.value;
    if (myTarget == "cancel") {
        if (confirm("Cancel edit??")) {
            onCancelEdit();
        }
    } else if (myTarget == "save") {
        console.log("save");
        if (myQuizTitle) {
            if (quizQuestions.length > 0) {
                onUpdateQuiz(quizId);
            } else {
                alert("You have no any questions! Pleas add some questions")
            }
        } else {
            alert("Please enter title of quiz");
        }
    }
}

// CANCEL EDIT
function onCancelEdit() {
    hide(quizTitleBlock);
    hide(allQuestionsContainer);
    hide(editMenuContainer);
    show(navigationBar);
    storeQuizId.value = null;
    show(quizListContainer);
    displayQuizzes();
}

// SAVE EDIT
function onUpdateQuiz(quizId) {
    axios.put("/quizzes/update/"+quizId, quizQuestions[0]).then((response => {
        console.log("Quiz updated");
    })).catch((error) => {
        console.log(error);
    })

    quizQuestions = [];
    saveData(quizQuestions);

    onCancelEdit();
}

// LOAD DATA
function loadData() {
    if (localStorage.getItem("quizQuestions") == null) {
        saveData(quizQuestions);
    } else {
        quizQuestions = JSON.parse(localStorage.getItem("quizQuestions"));
    }
}

// SAVE DATA
function saveData(questions) {
    localStorage.setItem("quizQuestions", JSON.stringify(quizQuestions));
}









let quizQuestions = [];

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
const quizListContainer = document.querySelector("#quizzes-container");
const quizList = document.querySelector("#quiz-list");
const quizTitleBlock = document.querySelector("#quiz-title-block");
const allQuestionsContainer = document.querySelector("#all-questions-container");
const editMenuContainer = document.querySelector("#edit-menu-container")
const storeQuizId = document.querySelector("#store-quiz-id");
const navigationBar = document.querySelector("#navigation-bar");
const noQuizAlert = document.querySelector("#no-quiz-alert");

const myQuizTitle = document.querySelector("#my-quiz-title");
// UPDATE TITLE
myQuizTitle.addEventListener("change", () => { 
    quizQuestions[0].title = myQuizTitle.value; 
    saveData(quizQuestions);
});


btnCreateQuestion.addEventListener("click", onAddquestion);
dialogMenu.addEventListener("click", onClickDialog);
questionList.addEventListener("click", onQuestionMenu);
activeManyAnswers.addEventListener("change", onManyAnswers);
quizListContainer.addEventListener("click", onQuizListClick);
editMenuContainer.addEventListener("click", onEditMenuContainerClick);




displayQuizzes();