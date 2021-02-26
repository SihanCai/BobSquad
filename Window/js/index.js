function userStatus() {
    console.log(sessionStorage)
    let status = !!sessionStorage.getItem("username");
    if(status){
        document.getElementById("upload-btn").hidden = false;
        document.getElementById("account-btn").hidden = false;
        document.getElementById("logout-btn").hidden = false;
        document.getElementById("login-btn").hidden = true;
        document.getElementById("account_name").textContent = sessionStorage.getItem("username");
    }
    else{
        document.getElementById("upload-btn").hidden = true;
        document.getElementById("logout-btn").hidden = true;
        document.getElementById("account-btn").hidden = true;
        document.getElementById("login-btn").hidden = false;
    }
}
userStatus();
// $.getJSON("js/data.json", function(json) {
//     console.log(json); // this will show the info it in firebug console
// });

function logout() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("user_id");
    window.location.href = "index.html";
}