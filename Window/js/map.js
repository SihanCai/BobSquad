let map;
const sportsIcon = "img/baseline_sports_tennis_black_18dp.png";
const AttractionsIcon = "img/baseline_local_see_black_18dp.png";
const CultureIcon = "img/baseline_museum_black_18dp.png";
// let dummyData = {
//     "data": [
//         {
//             video_name: "Saint Louis Zoo",
//             category: "Attractions",
//             latitude: 38.63660172477592,
//             longitude: -90.29270907735156,
//             location: "Saint Louis Zoo",
//             // position: {lat: 38.63660172477592, lng: -90.29270907735156},
//             video_id: 1,
//         },
//         {
//             video_name: "Saint Louis Art Museum",
//             category: "Culture",
//             latitude: 38.63959833792551,
//             longitude: -90.2945311303329,
//             location: "Saint Louis Art Museum",
//             // position: {lat: 38.63959833792551, lng: -90.2945311303329},
//             video_id: 2,
//         },
//         {
//             video_name: "Missouri History Museum",
//             location: "Missouri History Museum",
//             category: "Culture",
//             latitude: 38.64551555006555,
//             longitude: -90.28585240429031,
//             // position: {lat: 38.64551555006555, lng: -90.28585240429031},
//             video_id: 3,
//         },
//         {
//             video_name: "Forest Park Golf Course",
//             location: "Forest Park Golf Course",
//             category: "Sports",
//             latitude: 38.64472447732657,
//             longitude: -90.29645284769301,
//             // position: {lat: 38.64472447732657, lng: -90.29645284769301},
//             video_id: 4,
//         },
//     ]
// };
let AttractionsMarkers = [];
let CultureMarkers = [];
let SportsMarkers = [];
let dummyData={"data":[]};
function setIcons() {
    dummyData.data.forEach(element => {
        if (element.category === "Sports") {
            element.icon = sportsIcon;
        } else if (element.category === "Culture") {
            element.icon=CultureIcon;
        } else if (element.category === "Attractions") {
            element.icon = AttractionsIcon;
        }
    })
}

function initMap() {
    dummyData.data=JSON.parse(sessionStorage.getItem("videos"));
    setIcons();
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 38.638821, lng: -90.284174},
        zoom: 15,
    });
    dummyData.data.forEach(element => {
        let position = {lat: element.latitude, lng: element.longitude};
        let marker = new google.maps.Marker({position, map, icon: element.icon});
        switch (element.category) {
            case "Culture":
                CultureMarkers.push(marker);
                break;
            case "Attractions":
                AttractionsMarkers.push(marker);
                break;
            case "Sports":
                SportsMarkers.push(marker);
                break;
            default:
                break;
        }
        google.maps.event.addListener(marker, 'click', (function (marker) {
            return function () {
                window.location.href = "videoList.html?location=" + element.location;
            }
        })(marker));
    });
}

function handleCheckBox(checkboxElem) {
    if (checkboxElem.checked) {
        setMapOnAll(map, checkboxElem.value);
    } else {
        deleteMarkers(checkboxElem.value);
    }
}

// Sets the map on all markers in the array.
function setMapOnAll(map, category) {
    if (category === "sports") {
        for (let i = 0; i < SportsMarkers.length; i++) {
            SportsMarkers[i].setMap(map);
        }
    } else if (category === "culture") {
        for (let i = 0; i < CultureMarkers.length; i++) {
            CultureMarkers[i].setMap(map);
        }
    } else if (category === "attractions") {
        for (let i = 0; i < AttractionsMarkers.length; i++) {
            AttractionsMarkers[i].setMap(map);
        }
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers(category) {
    setMapOnAll(null, category);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers(category) {
    clearMarkers(category);
}