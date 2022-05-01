if (sessionStorage.userId) {
    location.href = "welcome_view.html";
}

// REGISTER ACCOUNT
function registerAccount() {
    let isAllValidated = false;
    if (userName.value && email.value && password.value) {
        missedInput.textContent = null;

        let validName = onValidateUsername(userName.value);
        let validEmail = onvalidateEmail(email.value);
        let validPassword = onvalidatePassword(password.value);

        if (validName && validEmail && validPassword) {
            isAllValidated = true;
        }

        if (isAllValidated) {
            invalidUsername.textContent = null;
            invalidEmail.textContent = null;
            invalidPassword.textContent = null;

            axios.post("/users/register", {username: userName.value, email: email.value, password: password.value})
            .then((response) => {
                let result = response.data;
                if (result != "Email is already used") {
                    axios.post("/users/user", {email: email.value, password: password.value})
                    .then((response) => {
                        let data = response.data[0];
                        if (data.email == email.value && data.password == password.value) {
                            sessionStorage.setItem("userId", data._id);
                            location.href = "welcome_view.html";
                        }
                        }).catch((error) => {
                            console.log(error);
                        })
                } else {
                    missedInput.textContent = "This email is already used! Please enter an available email"
                }
            }).catch((error) => {
                console.log(error);
            })
        } else {
            if (!validName) {
                invalidUsername.textContent = "Username must be no special characters and less than 30 characters";
            } else {
                invalidUsername.textContent = null;
            }

            if (!validEmail) {
                invalidEmail.textContent = "Email must contains '@'";
            } else {
                invalidEmail.textContent = null;
            }

            if (!validPassword) {
                invalidPassword.textContent = "Password must be 8 to 12 characters";
            } else{
                invalidPassword.textContent = null;
            }
        }

    } else {
        missedInput.textContent = "Please enter all information require";
    }
}


// VALIDATE USERNAME 
function onValidateUsername(data) {
    let isvalid = false
    if (data.length <= 30) {
        isvalid = data.match(usernameValidForm) != null;
    }
    return isvalid;
}

// VALIDATE EMAIL
function onvalidateEmail(data) {
    let isValid = false;
    for (let char of data) {
        if (char == "@") {
            isValid = true;
        }
    }
    return isValid;
}

// VALIDATE PASSWORD 
function onvalidatePassword(data) {
    let isvalid = false;
    if (data.length >= 8 && data.length <= 12) {
        isvalid = true;
    }
    return isvalid;
}


const usernameValidForm = /^[a-zA-Z0-9]+$/;

const userName = document.querySelector("#register-username");
const email = document.querySelector("#register-email");
const password = document.querySelector("#register-password");

const invalidUsername = document.querySelector("#invalid-username");
const invalidEmail = document.querySelector("#invalid-email");
const invalidPassword = document.querySelector("#invalid-password");
const missedInput = document.querySelector("#missed-input");


// MAIN
const btnRegister = document.querySelector("#btn-register");



btnRegister.addEventListener("click", registerAccount);

