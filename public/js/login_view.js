
if (sessionStorage.userId) {
    location.href = "welcome_view.html";
}


// LOGIN ACCOUNT
function loginAccount() {
    let email = loginEmail.value;
    let password = loginPassword.value;

    if (email && password) {
        axios.post("/users/user", {email: email, password: password})
        .then((response) => {
            let myData = response.data[0];
            if (myData.email == email && myData.password == password) {
                sessionStorage.setItem("userId", myData._id);
                location.href = "welcome_view.html";
            }
    
        }).catch((error) => {
            console.log(error);
        })
    }
}



const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");

// MAIN
const btnLogin = document.querySelector("#btn-login");


btnLogin.addEventListener("click", loginAccount);
