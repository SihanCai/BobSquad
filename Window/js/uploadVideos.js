function testJS() {
    var b = document.getElementById('video_category').value,
        url = 'http://localhost:8080/Window/manageVideos.html?video_category=' + encodeURIComponent(b);
    document.location.href = url;
}

function uploadNewVideo() {
    let users = JSON.parse(sessionStorage.getItem("users"));
    let videos = JSON.parse(sessionStorage.getItem("videos"));
    let newVideoId = videos.length + 1;
    videos.push({
        video_name: "St. Louis Zoo In Forest Park Part 2: Sea Lions, Gorillas, Kangaroos, Tigers, & Lions",
        location: "Saint Louis Zoo",
        category: "Attractions",
        latitude: 38.63660172477592,
        longitude: -90.29270907735156,
        // position: {lat: 38.64551555006555, lng: -90.28585240429031},
        video_id: newVideoId,
        link: "https://www.youtube.com/embed?v=7dsDdAVfQbA",
        allComments: []
    });
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === sessionStorage.getItem("username")) {
            users[i].userVideo.push(newVideoId);
        }
    }
    sessionStorage.setItem("videos", JSON.stringify(videos));
    sessionStorage.setItem("users", JSON.stringify(users));
}

function loadAllLocations() {
    let selectCulture = document.getElementById("culture_locations");
    let selectSports = document.getElementById("sports_locations");
    let selectAttractions = document.getElementById("attractions_locations");

    let videos = JSON.parse(sessionStorage.getItem("videos"));
    let locations = [];
    let locationSet = new Set();
    for (let i = 0; i < videos.length; i++) {
        if (!locationSet.has(videos[i].location)) {
            locationSet.add(videos[i].location);
            locations.push({location: videos[i].location, category: videos[i].category});
        }
    }

    for (let i = 0; i < locations.length; i++) {
        switch (locations[i].category) {
            case "Sports":
                selectSports.innerHTML += "<option>" + locations[i].location + "</option>";
                break;
            case "Attractions":
                selectAttractions.innerHTML += "<option>" + locations[i].location + "</option>";
                break;
            case "Culture":
                selectCulture.innerHTML += "<option>" + locations[i].location + "</option>";
                break;
            default:
                break;
        }
    }
}

loadAllLocations();