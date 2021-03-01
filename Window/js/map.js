let map;
const sportsIcon = "img/baseline_sports_tennis_black_18dp.png";
const AttractionsIcon = "img/baseline_local_see_black_18dp.png";
const CultureIcon = "img/baseline_museum_black_18dp.png";
const infoIcon = "img/info_icon_18dp.png";

let AttractionsMarkers = [];
let CultureMarkers = [];
let SportsMarkers = [];
let InfoMarkers = [];
let dummyData={"data":[]};
let myStyles =[
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
              { visibility: "off" }
        ]
    },
    {
        featureType: "transit",
        stylers: [
            { visibility: "off" }
      ]
    }
];
function setIcons() {
    dummyData.data.forEach(element => {
        if (element.category === "Sports") {
            element.icon = sportsIcon;
        } else if (element.category === "Culture") {
            element.icon=CultureIcon;
        } else if (element.category === "Attractions") {
            element.icon = AttractionsIcon;
        } else if (element.category === "Info") {
            element.icon = infoIcon;
        }
    })
}

function initMap() {
    dummyData.data=JSON.parse(sessionStorage.getItem("videos"));
    setIcons();
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 38.638821, lng: -90.284174},
        zoom: 12,
        styles: myStyles
    });
    dummyData.data.forEach(element => {
        let position = {lat: element.latitude, lng: element.longitude};
        let marker = new google.maps.Marker({position, map, icon: element.icon, title: element.title});

        // Open infowindow on mouse hover
        marker.addListener('mouseover', function() {
            element.info_window.open(map, this);
        });
        
        // Closing infowindow on mouse out
        marker.addListener('mouseout', function() {
            element.info_window.close();
        });
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
            case "Info":
                InfoMarkers.push(marker);
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
    } else if (category === "info") {
        for (let i = 0; i < InfoMarkers.length; i++) {
            InfoMarkers[i].setMap(map);
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