

// HIDE
function hide(ele) {
    ele.style.visibility = "hidden";
}

// SHOW
function show(ele) {
    ele.style.visibility = "visible";
}

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
    if (question && answers.A && answers.B && answers.C && answers.D && correct && score) {
        axios.post("/questions/create", {question: question, answers: answers, correct: correct, score: score})
        .then((response) => {
            console.log("Question added");
        }).catch((error) => {
            console.log(error);
        })
        hide(questionDialog);
        show(btnCreateQuestion);
        refreshQuestionForm();
        displayQuestions();
    } else {
        console.log("Adding failed");
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

    axios.get("/questions/all").then((response) => {
        let questions = response.data;

        // LOOP TO DISPLAY ALL QUESTIONS
        for (let item of questions) {
            let card = document.createElement("div");
            card.className = "question-show question-card my-shadow small-border-top mb-4";
            card.id = item._id;
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
            let answersA = document.createElement("div");
            answersA.className = "d-flex";
            cardFooter.appendChild(answersA);
            let ia = document.createElement("i");
            ia.className = "material-icons";
            if (item.correct.includes("A")) {
                ia.textContent = "done";
                ia.style.color = "green";
            }
            answersA.appendChild(ia);
            let pa = document.createElement("p");
            pa.className = "ms-2";
            pa.textContent = item.answers.A;
            if (item.correct.includes("A")) {
                pa.style.color = "green";
            }
            answersA.appendChild(pa);

            //B
            let answersB = document.createElement("div");
            answersB.className = "d-flex";
            cardFooter.appendChild(answersB);
            let ib = document.createElement("i");
            ib.className = "material-icons";
            if (item.correct.includes("B")) {
                ib.textContent = "done";
                ib.style.color = "green";
            }
            answersB.appendChild(ib);
            let pb = document.createElement("p");
            pb.className = "ms-2";
            pb.textContent = item.answers.B;
            if (item.correct.includes("B")) {
                pb.style.color = "green";
            }
            answersB.appendChild(pb);

            //C
            let answersC = document.createElement("div");
            answersC.className = "d-flex";
            cardFooter.appendChild(answersC);
            let ic = document.createElement("i");
            ic.className = "material-icons";
            if (item.correct.includes("C")) {
                ic.textContent = "done";
                ic.style.color = "green";
            }
            answersC.appendChild(ic);
            let pc = document.createElement("p");
            pc.className = "ms-2";
            pc.textContent = item.answers.C;
            if (item.correct.includes("C")) {
                pc.style.color = "green";
            }
            answersC.appendChild(pc);

            // D
            let answersD = document.createElement("div");
            answersD.className = "d-flex";
            cardFooter.appendChild(answersD);
            let id = document.createElement("i");
            id.className = "material-icons";
            if (item.correct.includes("D")) {
                id.textContent = "done";
                id.style.color = "green";
            }
            answersD.appendChild(id);
            let pd = document.createElement("p");
            pd.className = "ms-2";
            pd.textContent = item.answers.D;
            if (item.correct.includes("D")) {
                pd.style.color = "green";
            }
            answersD.appendChild(pd);

        }

    }).catch((error) => {
        console.log(error);
    })
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
    axios.delete("/questions/delete/" + id).then((response) => {
        console.log("Question deleted");
        displayQuestions();
    }).catch((error) => {
        console.log(error);
    })
}


// EDIT A QUESTION
function onPreEditQuestion(id) {
    show(questionDialog);
    hide(btnCreateQuestion);
    dialogBtnCreate.textContent = "Save";
    formQuestionID.value = id;
    axios.get("/questions/one/"+id).then((response) => {
        let question = response.data[0];
        formQuestion.value = question.question;
        answersA.value = question.answers.A;
        answersB.value = question.answers.B;
        answersC.value = question.answers.C;
        answersD.value = question.answers.D;
        formScore.value = question.score;
        formCorrect.forEach(element => {
            if (element.value == question.correct) {
                element.checked = true;
            }
        });
    }).then((error) => {
        console.log(error);
    })
}

// SAVE UPDATE
function onSaveUpdate(id) {
    let question = formQuestion.value;
    let answers = {A: answersA.value, B: answersB.value, C: answersC.value, D: answersD.value};
    let correct = "A";
    for (let item of formCorrect) {
        if (item.checked == true) {
            correct = item.value;
        }
    }
    let score = formScore.value;
    if (question && answers.A && answers.B && answers.C && answers.D && correct && score) {
        axios.put("/questions/update/"+id, {question: question, answers: answers, correct: correct, score: score}).then((response) => {
            console.log("Update success");
        }).then((error)=>{
            console.log(error);
        })
        hide(questionDialog);
        show(btnCreateQuestion);
        refreshQuestionForm();
        displayQuestions();
        dialogBtnCreate.textContent = "Create";
    } else {
        console.log("Adding failed");
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




// FORM ELEMENTS
const formQuestion = document.querySelector("#title");
const answersA = document.querySelector("#choiceA");
const answersB = document.querySelector("#choiceB");
const answersC = document.querySelector("#choiceC");
const answersD = document.querySelector("#choiceD");
const formCorrect = document.querySelectorAll("input[name=correct-ans]");
const formScore = document.querySelector("#score");
const formQuestionID = document.querySelector("#formQuestId");

// MAIN
const questionDialog = document.querySelector("#questions-dialog");
const btnCreateQuestion = document.querySelector(".btn-create-question");
const dialogMenu = document.querySelector(".dialog-menu");
const questionList = document.querySelector("#question-list");
const dialogBtnCreate = document.querySelector("#create");
const activeManyAnswers = document.querySelector("#many-answers");


btnCreateQuestion.addEventListener("click", onAddquestion);
dialogMenu.addEventListener("click", onClickDialog);
questionList.addEventListener("click", onQuestionMenu);
activeManyAnswers.addEventListener("change", onManyAnswers);


displayQuestions();