// let users = {
//     "data": [
//         {
//             "user_id": 1,
//             "username": "Bob",
//             "password": "1234",
//             "userVideo": [1, 2]
//         },
//         {
//             "user_id": 2,
//             "username": "Test",
//             "password": "123456",
//             "userVideo": [3]
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
//             link: "https://www.youtube.com/embed?v=uH0v-u7aXU8"
//         },
//         {
//             video_name: "Storm of Progress: German Art After 1800",
//             category: "Culture",
//             location: "Saint Louis Art Museum",
//             latitude: 38.63959833792551,
//             longitude: -90.2945311303329,
//             // position: {lat: 38.63959833792551, lng: -90.2945311303329},
//             video_id: 2,
//             link: "https://www.youtube.com/embed?v=CpYP473ILCQ"
//         },
//         {
//             video_name: "A World of Art: The Metropolitan Museum of Art",
//             category: "Culture",
//             location: "Saint Louis Art Museum",
//             latitude: 38.63959833792551,
//             longitude: -90.2945311303329,
//             // position: {lat: 38.63959833792551, lng: -90.2945311303329},
//             video_id: 5,
//             link: "https://www.youtube.com/embed?v=PHrmoSlfLD0"
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
//         },
//     ]
// };
//
// let randomAttractionData = {
//     "data": [
//         {
//             video_name: "Forest Park Zoo Penguins",
//             link: "https://www.youtube.com/embed/aCtX5M_BGwE"
//         },
//         {
//             video_name: "Forest Park Frm The Zoo Elephants",
//             link: "https://www.youtube.com/embed/yYWzHAjuaew"
//         }
//     ]
// };
//
// let randomSportData = {
//     "data": [
//         {
//             video_name: "Forest Park Golfing",
//             link: "https://www.youtube.com/embed/PZowNtB4520"
//         },
//         {
//             video_name: "Forest Park Running",
//             link: "https://www.youtube.com/embed/w7_DTJQd74U"
//         }
//     ]
// };
//
// let randomCultureData = {
//     "data": [
//         {
//             video_name: "Forest Park Art Museum",
//             link: "https://www.youtube.com/embed/Xh5WRx5_AHQ"
//         },
//         {
//             video_name: "Forest Park History Museum",
//             link: "https://www.youtube.com/embed/8BCNfTGtWc0"
//         }
//     ]
// };


// window.onload = function () {
//     var url = document.location.href,
//         params = url.split('?')[1].split('&'),
//         data = {}, tmp;
//     for (var i = 0, l = params.length; i < l; i++) {
//         tmp = params[i].split('=');
//         data[tmp[0]] = tmp[1];
//     }
//     console.log(data);
//     console.log(data.video_category);
//     if (data.video_category == "cultures") {
//         let temp = randomCultureData.data.pop();
//         videoList.innerHTML += "<li><p>" + temp.video_name +
//             "</p><iframe width='420' height='345' src=" + temp.link + "></iframe></li>";
//     } else if (data.video_category == "sports") {
//         let temp = randomSportData.data.pop();
//         videoList.innerHTML += "<li><p>" + temp.video_name +
//             "</p><iframe width='420' height='345' src=" + temp.link + "></iframe></li>";
//     } else if (data.video_category == "attractions") {
//         let temp = randomAttractionData.data.pop();
//         videoList.innerHTML += "<li><p>" + temp.video_name +
//             "</p><iframe width='420' height='345' src=" + temp.link + "></iframe></li>";
//     }
// };

let dummyData = {data:JSON.parse(sessionStorage.getItem("videos"))};
let users = {data:JSON.parse(sessionStorage.getItem("users"))};
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


function searchYourVideos() {
    let keyword = document.getElementById("search_text").value;
    let videoList = document.getElementById("videoList");
    videoList.innerHTML = "";
    let videos = fuzzyQuery(dummyData.data, keyword);
    let videos_id = getUsersVideos();
    for (let i = 0; i < videos.length; i++) {
        if (videos_id.indexOf(videos[i].video_id) != -1) {
            console.log("SDF")
            let imgUrl = getScreen(videos[i].link);
            videoList.innerHTML += "            <div class=\"card w-25\" style=\"margin:3%\">\n" +
                "<img src=" + imgUrl + " class=\"card-img-top\" alt=\"img/1.png\" onclick='goPlayVideo(" + videos[i].video_id + ")'>" +
                "                <div>\n" +
                "                    <a class=\"list-group-item list-group-item-action\" style=\"color:black\" href=\"playvideo.html?id=" + videos[i].video_id + "\" >" + videos[i].video_name + "</a>\n" +
                "                </div>\n" +
                "            </div>";
        }
    }
}

function getUsersVideos() {
    let user_id = sessionStorage.getItem("user_id");
    document.getElementById("username").textContent = sessionStorage.getItem("username");
    let videos_id = [];
    for (let i = 0; i < users.data.length; i++) {
        if (users.data[i].user_id == user_id) {
            videos_id = users.data[i].userVideo;
            break;
        }
    }
    return videos_id;
}

function renderVideos() {
    let videoList = document.getElementById("videoList");
    let videos = getUsersVideos();
    for (let i = 0; i < dummyData.data.length; i++) {
        if (videos.indexOf(dummyData.data[i].video_id) != -1) {
            let imgUrl = getScreen(dummyData.data[i].link);
            videoList.innerHTML += "            <div class=\"card w-25\" style=\"margin:3%\">\n" +
                "<img src=" + imgUrl + " class=\"card-img-top\" alt=\"img/1.png\" onclick='goPlayVideo(" + dummyData.data[i].video_id + ")'>" +
                "                <div>\n" +
                "                    <a class=\"list-group-item list-group-item-action\" style=\"color:black\" href=\"playvideo.html?id=" + dummyData.data[i].video_id + "\" >" + dummyData.data[i].video_name + "</a>\n" +
                "                </div>\n" +
                "            </div>";
        }
    }
}

function logout() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("user_id");
    window.location.href = "index.html";
}

function goPlayVideo(id) {
    window.location.href = "playvideo.html?id=" + id;
}

renderVideos();