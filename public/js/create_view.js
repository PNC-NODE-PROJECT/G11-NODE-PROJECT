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
    let clickTarget = e.target.id;
    if (clickTarget == "cancel") {
        hide(questionDialog);
        show(btnCreateQuestion);
        refreshQuestionForm();
    } else if (clickTarget == "create") {
        onCreateQuestion();
    }
}

// CHECK TO CREATE QUESTION TO DATABASE
function onCreateQuestion() {
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
        axios.post("/questions/create", {question: question, answers: answers, correct: correct, score: score})
        .then((response) => {
            console.log("Question added");
        }).catch((error) => {
            console.log(error);
        })
        hide(questionDialog);
        show(btnCreateQuestion);
        refreshQuestionForm();
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





// FORM ELEMENTS
const formQuestion = document.querySelector("#title");
const answersA = document.querySelector("#choiceA");
const answersB = document.querySelector("#choiceB");
const answersC = document.querySelector("#choiceC");
const answersD = document.querySelector("#choiceD");
const formCorrect = document.querySelectorAll("input[name=correct-ans]");
const formScore = document.querySelector("#score");

// MAIN
const questionDialog = document.querySelector("#questions-dialog");
const btnCreateQuestion = document.querySelector(".btn-create-question");
const dialogMenu = document.querySelector(".dialog-menu");


btnCreateQuestion.addEventListener("click", onAddquestion);
dialogMenu.addEventListener("click", onClickDialog);
