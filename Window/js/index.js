window.onload = function() {
    if (!sessionStorage.getItem("pageLoad")) {
        sessionStorage.setItem("pageLoad", true);
        window.location.reload();
    }
    timeFunction();
}

// delay showing legend to allow it to move to the correct location
function timeFunction() {
    setTimeout(function(){ document.getElementById("legend").classList.remove('initial-hide') }, 400);
}