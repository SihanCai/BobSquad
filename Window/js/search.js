let dummyData = {data:[]};
function fuzzyQuery(list, keyWord) {
    let arr = [];
    keyWord = keyWord.toLowerCase();
    for (let i = 0; i < list.length; i++) {
        let str = list[i].video_name.toLowerCase();
        if (str.indexOf(keyWord) >= 0) {
            arr.push(list[i]);
        }
    }

    return arr;
}


function searchVideo() {
    dummyData.data = JSON.parse(sessionStorage.getItem("videos"));
    let keyword = window.location.search.split("=")[1];
    keyword = keyword.replaceAll("+", " ");
    document.getElementById("keyword").textContent = "Search result for " + keyword;
    displayResult(fuzzyQuery(dummyData.data, keyword));
}

function displayResult(result) {
    let container = document.getElementById("search_result");
    for (let i = 0; i < result.length; i++) {
        let j = i;
        let threeVideos = "";
        for (j; j < result.length && j < i + 3; j++) {
            let imgUrl = getScreen(result[j].link);
            threeVideos += "            <div class=\"card w-25\" style=\"margin:3%\">\n" +
                "<img src="+imgUrl+" class=\"card-img-top\" alt=\"img/1.png\" onclick='goPlayVideo("+result[j].video_id+")'>"+
                "                <div>\n" +
                "                    <a class=\"list-group-item list-group-item-action\" style=\"color:black\" href=\"playvideo.html?id=" + result[j].video_id + "\">" + result[j].video_name + "</a>\n" +
                "                </div>\n" +
                "            </div>";
        }
        i = j - 1;
        container.innerHTML += "<div class=\" d-flex justify-content-start flex-wrap\" style=\"margin:0 6%\">" + threeVideos + "</div>";
    }
}


function goPlayVideo(id) {
    window.location.href="playvideo.html?id="+id;
}

searchVideo();