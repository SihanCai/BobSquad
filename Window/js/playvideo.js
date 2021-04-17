let dummyData={data:[]};
function getVideoId() {
    dummyData.data = JSON.parse(sessionStorage.getItem("videos"));
    let video_id = window.location.search.split("=")[1];
    video_id = video_id.replace("+", " ");
    displayVideo(video_id);
}

function displayVideo(id) {
    for (let i = 0; i < dummyData.data.length; i++) {
        let element = dummyData.data[i];
        if (element.video_id == id) {
            document.getElementById("video_name").textContent = element.video_name;
            document.getElementById("location").textContent = "Location: " + element.location;
            document.getElementById("credits").textContent = element.credits;
            document.getElementById("caption").textContent = element.caption;
            document.getElementById("link").src=element.link.replace("?v=","/");
            if (document.getElementById("link2") != null){
                document.getElementById("link2").src=element.link2;
            }
            if (document.getElementById("link3") != null){
                document.getElementById("link3").src=element.link3;
            }
            displayOtherVideos(element.location, id);
            break;
        }
    }
}

function displayOtherVideos(location, id) {
    let containerVideos = document.getElementById("other_videos");
    let otherVideos = getVideosBasedLocation(location, id);
    for (let i = 0; i < otherVideos.length && i < 5; i++) {
        let name = otherVideos[i].video_name;
        let thumbnail = getScreen(otherVideos[i].link);
        let id = otherVideos[i].video_id;
        let format = otherVideos[i].format;
        if (format.localeCompare("Text") == 0){
            thumbnail = otherVideos[i].link;
            containerVideos.innerHTML += "                <div class=\"item popular-item\">\n" +
            "                    <div class=\"thumb\">\n" +
            "                        <img src=" + thumbnail + " alt=\"\">\n" +
            "                        <div class=\"text-content\">\n" +
            "                            <h4  onclick='goToImage(" + id + ")'>" + name + "</h4>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </div>";
        }
        else{
            containerVideos.innerHTML += "                <div class=\"item popular-item\">\n" +
                "                    <div class=\"thumb\">\n" +
                "                        <img src=" + thumbnail + " alt=\"\" onclick='goPlayVideo(" + id + ")'>\n" +
                "                        <div class=\"text-content\">\n" +
                "                            <h4>" + name + "</h4>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                </div>";
        }

    }
}

function goToImage(id) {
    window.location.href = "openImage.html?id=" + id;
}


function goPlayVideo(id) {
    window.location.href = "playvideo.html?id=" + id;
}


function getVideosBasedLocation(location, id) {
    let result = [];
    for (let i = 0; i < dummyData.data.length; i++) {
        if (dummyData.data[i].location === location && dummyData.data[i].video_id != id) {
            result.push(dummyData.data[i]);
        }
    }
    return result;
}

getVideoId();
