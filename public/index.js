
if (sessionStorage.userId) {
    location.href = "views/welcome/welcome_view.html";
} else {
    location.href = "views/register/register_view.html";
}