if (sessionStorage.userId) {
    location.href = "welcome_view.html";
}

// REGISTER ACCOUNT
function registerAccount() {
    if (userName && email && password) {
        axios.post("/users/register", {username: userName.value, email: email.value, password: password.value})
        .then((response) => {
            axios.post("/users/user", {email: email.value, password: password.value})
            .then((response) => {
                let data = response.data[0];
                if (data.email == email.value && data.password == password.value) {
                    sessionStorage.setItem("userId", "123456");
                    location.href = "welcome_view.html";
                }
            }).catch((error) => {
                console.log(error);
            })
        }).catch((error) => {
            console.log(error);
        })
    }
}






const userName = document.querySelector("#register-username");
const email = document.querySelector("#register-email");
const password = document.querySelector("#register-password");

// MAIN
const btnRegister = document.querySelector("#btn-register");



btnRegister.addEventListener("click", registerAccount);

