// let comments = {
//     "data": [
//         {
//             comment_id: 1,
//             comment_content: "Nice!",
//             comment_name: "Alice",
//             comment_time: "12 Nov 2020",
//         },
//         {
//             comment_id: 2,
//             comment_content: "Good!",
//             comment_name: "Tonny",
//             comment_time: "15 Nov 2020",
//         },
//         {
//             comment_id: 3,
//             comment_content: "Beautiful!",
//             comment_name: "Kevin",
//             comment_time: "2 Nov 2020",
//         }
//     ]
// };
//
// let dummyData = {
//     "data": [
//         {
//             video_name: "zoo",
//             location: "Saint Louis Zoo",
//             category: "Attractions",
//             latitude: 38.63660172477592,
//             longitude: -90.29270907735156,
//             // position: {lat: 38.63660172477592, lng: -90.29270907735156},
//             video_id: 1,
//             link: "https://www.youtube.com/embed?v=uH0v-u7aXU8",
//             allComments: [1, 3],
//         },
//         {
//             video_name: "Storm of Progress: German Art After 1800",
//             category: "Culture",
//             location: "Saint Louis Art Museum",
//             latitude: 38.63959833792551,
//             longitude: -90.2945311303329,
//             // position: {lat: 38.63959833792551, lng: -90.2945311303329},
//             video_id: 2,
//             link: "https://www.youtube.com/embed?v=CpYP473ILCQ",
//             allComments: [2, 3],
//         },
//         {
//             video_name: "A World of Art: The Metropolitan Museum of Art",
//             category: "Culture",
//             location: "Saint Louis Art Museum",
//             latitude: 38.63959833792551,
//             longitude: -90.2945311303329,
//             // position: {lat: 38.63959833792551, lng: -90.2945311303329},
//             video_id: 5,
//             link: "https://www.youtube.com/embed?v=PHrmoSlfLD0",
//             allComments: [1],
//         },
//         {
//             video_name: "TL History Live | Segregation and The City What Happened Next?",
//             location: "Missouri History Museum",
//             category: "Culture",
//             latitude: 38.64551555006555,
//             longitude: -90.28585240429031,
//             // position: {lat: 38.64551555006555, lng: -90.28585240429031},
//             video_id: 3,
//             link: "https://www.youtube.com/embed?v=zQ2_DsFA9hw",
//             allComments: [2, 1],
//         },
//         {
//             video_name: "Forest Park",
//             location: "Forest Park Golf Course",
//             category: "Sports",
//             latitude: 38.64472447732657,
//             longitude: -90.29645284769301,
//             // position: {lat: 38.64472447732657, lng: -90.29645284769301},
//             video_id: 4,
//             link: "https://www.youtube.com/embed?v=E0v1zrZOPf4",
//             allComments: [2],
//         },
//     ]
// };
let dummyData={data:[]};
let comments={data:[]};
function getVideoId() {
    dummyData.data = JSON.parse(sessionStorage.getItem("videos"));
    comments.data = JSON.parse(sessionStorage.getItem("comments"));
    console.log(comments)
    let video_id = window.location.search.split("=")[1];
    video_id = video_id.replace("+", " ");
    displayVideo(video_id);
    displayComments(video_id);
}

function findAllComments(id) {
    let result = [];
    let commentsId = [];
    for(let i =0;i<dummyData.data.length;i++){
        if(dummyData.data[i].video_id==id){
            commentsId = dummyData.data[i].allComments;
            break;
        }
    }

    for(let i =0;i<comments.data.length;i++){
        if(commentsId.indexOf(comments.data[i].comment_id)!==-1){
            result.push(comments.data[i]);
        }
    }
    return result;
}

function displayComments(id) {
    let comments = findAllComments(id);
    let commentsContainer = document.getElementById("comments_container");
    comments.forEach(element =>{
       commentsContainer.innerHTML+="            <div class=\" tm-timeline-item\">\n" +
           "                <div class=\"tm-timeline-item-inner\">\n" +
           "                    <div class=\"tm-timeline-connector\">\n" +
           "                        <p class=\"mb-0\"></p>\n" +
           "                    </div>\n" +
           "                    <div class=\"tm-timeline-description-wrap\">\n" +
           "                        <div class=\"tm-bg-dark tm-timeline-description\">\n" +
           "                            <h3 class=\"tm-text-green tm-font-400\">"+element.comment_name+"</h3>\n" +
           "                            <p class=\"comment-wrap\">"+element.comment_content+"</p>\n" +
           "                            <p class=\"tm-text-green float-right mb-0\">"+element.comment_time+"</p>\n" +
           "                        </div>\n" +
           "                    </div>\n" +
           "                </div>\n" +
           "                <div class=\"tm-timeline-connector-vertical\"></div>\n" +
           "            </div>";
    });
}

function displayVideo(id) {
    for (let i = 0; i < dummyData.data.length; i++) {
        let element = dummyData.data[i];
        if (element.video_id == id) {
            document.getElementById("video_name").textContent = element.video_name;
            document.getElementById("link").src=element.link.replace("?v=","/");
            document.getElementById("location").textContent = "Location: " + element.location;
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
        let id = otherVideos[i].video_id
        containerVideos.innerHTML += "                <div class=\"item popular-item\">\n" +
            "                    <div class=\"thumb\">\n" +
            "                        <img src=" + thumbnail + " alt=\"\" onclick='goPlayVideo(" + id + ")'>\n" +
            "                        <div class=\"text-content\">\n" +
            "                            <h4  onclick='goPlayVideo(" + id + ")'>" + name + "</h4>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </div>";

    }
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

function submitComment() {
    if(!sessionStorage.getItem("username")){
        alert("Please login to submit your comments");
        return;
    }
    let content = document.getElementById("comment_content").value;
    let id = comments.data.length+1;
    comments.data.push({
        comment_id: id,
        comment_content: content,
        comment_name: sessionStorage.getItem("username"),
        comment_time: new Date().Format("yyyy-MM-dd hh:mm:ss"),
    });
    let video_id = window.location.search.split("=")[1];
    video_id = video_id.replace("+", " ");
    for (let i = 0; i < dummyData.data.length; i++) {
        if (dummyData.data[i].video_id == video_id) {
            dummyData.data[i].allComments.push(id);
            break;
        }
    }
    sessionStorage.setItem("videos",JSON.stringify(dummyData.data));
    sessionStorage.setItem("comments",JSON.stringify(comments.data));
    location.reload()
}
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

getVideoId();
