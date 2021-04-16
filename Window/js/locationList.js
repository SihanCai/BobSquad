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

function addLocation(){
    let allVideos = JSON.parse(sessionStorage.getItem("videos"));
    let all = document.getElementById("all");
    let health = document.getElementById("health");
    let Housing = document.getElementById("housing");
    let Education = document.getElementById("education");
    let myset = new Set();
    for(let i = 0;i<allVideos.length;i++){
        //if(myset.has(allVideos[i].location)) continue;
        if(myset.has(allVideos[i].location)==false){
            all.innerHTML += "<li><div class = \"shape\" onclick = 'jump1(\""+allVideos[i].location+"\")'>" + allVideos[i].location + "</div></li>";
        }
        myset.add(allVideos[i].location);
        if("Housing" === allVideos[i].pin){
            health.innerHTML += "<li><div class = \"shape\" onclick = 'jump1(\""+allVideos[i].location+"\")'>" + allVideos[i].location + "</div></li>";
        }
        if("Health" === allVideos[i].pin){
            Housing.innerHTML += "<li><div class = \"shape\" onclick = 'jump1(\""+allVideos[i].location+"\")'>" + allVideos[i].location + "</div></li>";
        }
        if("School" === allVideos[i].pin){
            Education.innerHTML += "<li><div class = \"shape\" onclick = 'jump1(\""+allVideos[i].location+"\")'>" + allVideos[i].location + "</div></li>";
        }
    }
}

function jump1(location){
    window.location.href = "videoList.html?location=" + location;
}

function cilckMap(){
    let mapButton = document.getElementById("mapbutton");
    mapButton.addEventListener("click", jump);
}

function jump(){
    window.location.href = "index.html"
}
addLocation();
cilckMap();
//dynamic add location videolist->74

//jump -> 