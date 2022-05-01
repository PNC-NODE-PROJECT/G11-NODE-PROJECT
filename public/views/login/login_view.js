
if (sessionStorage.userId) {
    location.href = "../welcome/welcome_view.html";
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
                location.href = "../welcome/welcome_view.html";
            } else {
                wrongLogin.textContent="Wrong email or password!";
            };
    
        }).catch((error) => {
            console.log(error);
        });
    } else{
        wrongLogin.textContent="Please enter both email and password!";
    }
};



const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");
const wrongLogin = document.querySelector(".alert-incorrect");

// MAIN
const btnLogin = document.querySelector("#btn-login");


btnLogin.addEventListener("click", loginAccount);
