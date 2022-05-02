

// LOG OUT : CLEAR SESSIONSTORAGE
function logoutAccount() {
    if (confirm("Are you sure to sign out?")) {
        sessionStorage.clear();
        location.href = "../register/register_view.html";
    }
}



const btnLogout = document.querySelector("#btn-logout");


btnLogout.addEventListener("click", logoutAccount)
