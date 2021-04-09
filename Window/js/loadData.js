$.getJSON("js/data.json", function (json) {
    if (!sessionStorage.getItem("videos")) {
        sessionStorage.setItem("videos", JSON.stringify(json.data.videos));
    }
});
