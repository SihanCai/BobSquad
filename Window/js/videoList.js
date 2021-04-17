let dummyData = { data: [] };
function getLocation() {
    dummyData.data = JSON.parse(sessionStorage.getItem("videos"));
    let location = window.location.search.split("=")[1];
    location = location.replaceAll("%20", " ").replaceAll("%27", "'");
    document.getElementById("location_text").textContent = "Location: " + location;
    displayResult(filter(location));
}

function filter(location) {
    let result = [];
    for (let i = 0; i < dummyData.data.length; i++) {
        if (location === dummyData.data[i].location) {
            result.push(dummyData.data[i]);
        }
    }
    return result;
}

function displayResult(result) {
    let container = document.getElementById("list_result");
    for (let i = 0; i < result.length; i++) {
        let j = i;
        let threeVideos = "";
        for (j; j < result.length && j < i + 3; j++) {
            let imgUrl = getScreen(result[j].link);
            if (result[j].format.localeCompare("Text") == 0) {
                imgUrl = result[j].link;
                threeVideos += "            <div class=\"card w-25\" style=\"margin:3%\">\n" +
                    "<img src=" + imgUrl + " class=\"card-img-top\" alt=\"img/1.png\" onclick='goToImage(" + result[j].video_id + ")'>" +
                    "                <div>\n" +
                    "                    <a class=\"list-group-item list-group-item-action\" style=\"color:black\" href=\"openImage.html?id=" + result[j].video_id + "\">" + result[j].video_name + "</a>\n" +
                    "                </div>\n" +
                    "            </div>";
            }
            else {
                threeVideos += "            <div class=\"card w-25\" style=\"margin:3%\">\n" +
                    "<img src=" + imgUrl + " class=\"card-img-top\" alt=\"img/1.png\" onclick='goPlayVideo(" + result[j].video_id + ")'>" +
                    "                <div>\n" +
                    "                    <a class=\"list-group-item list-group-item-action\" style=\"color:black\" href=\"playvideo.html?id=" + result[j].video_id + "\">" + result[j].video_name + "</a>\n" +
                    "                </div>\n" +
                    "            </div>";
            }
        }
        i = j - 1;
        container.innerHTML += "<div class=\" d-flex justify-content-start flex-wrap\" style=\"margin:0 6%\">" + threeVideos + "</div>";
    }
}
function goToImage(id) {
    window.location.href = "openImage.html?id=" + id;
}

function goPlayVideo(id) {
    window.location.href = "playvideo.html?id=" + id;
}

getLocation();