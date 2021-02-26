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