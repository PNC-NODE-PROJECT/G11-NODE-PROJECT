
if (sessionStorage.userId) {
    location.href = "views/welcome_view.html";
} else {
    location.href = "views/register_view.html";
}