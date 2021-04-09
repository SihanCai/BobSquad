window.onload = function() {
    if (!sessionStorage.getItem("pageLoad")) {
        sessionStorage.setItem("pageLoad", true);
        window.location.reload();
    }
}