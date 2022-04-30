

// LOG OUT : CLEAR SESSIONSTORAGE
function logoutAccount() {
    sessionStorage.clear();
    location.href = "register_view.html";
}



const btnLogout = document.querySelector("#btn-logout");


btnLogout.addEventListener("click", logoutAccount)
