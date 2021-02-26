$.getJSON("js/data.json", function (json) {
    if (!sessionStorage.getItem("comments")) {
        sessionStorage.setItem("comments", JSON.stringify(json.data.comments));
        sessionStorage.setItem("users", JSON.stringify(json.data.users));
        sessionStorage.setItem("videos", JSON.stringify(json.data.videos));
    }
});
