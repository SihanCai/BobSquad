let map;
const sportsIcon = "img/baseline_sports_tennis_black_18dp.png";
const AttractionsIcon = "img/baseline_local_see_black_18dp.png";
const CultureIcon = "img/baseline_museum_black_18dp.png";
const infoIcon = "img/info_icon_18dp.png";
const videoIcon = "img/video_Icon_small.png";
const imageIcon = "img/camera_Icon_small.png";

//Pre-1900s
let time1Markers = [];
//1900-1930
let time2Markers = [];
//1940-1960
let time3Markers = [];
//1960 to present
//let time4Markers = [];
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
        if (element.pin === "Image") {
            element.icon = imageIcon;
        } else if (element.pin === "Video") {
            element.icon = videoIcon;
        } else if (element.pin === "Info") {
            element.icon = infoIcon;
        }
    })
}


//get height of map for zoom value
let mapHeight =  getComputedStyle(document.documentElement)
                .getPropertyValue('--mapHeight');
//get user's window height to have a good zoom starting value
var percentage = parseInt(mapHeight, 10)*$(window).height()/100;

function initMap() {
    dummyData.data=JSON.parse(sessionStorage.getItem("videos"));
    setIcons();
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 38.6814, lng: -90.28267},
        //values chosen by trial and error
        zoom: 10 + 2.4*percentage/600,
        styles: myStyles
    });
    // Define the LatLng coordinates for the greaterVille polygon path.
    const greaterVilleCoords = [
        { lat: 38.67307, lng: -90.24424 },
        { lat: 38.66375, lng: -90.22274 },
        { lat: 38.65072, lng: -90.23201 },
        { lat: 38.66013, lng: -90.25355 },
        { lat: 38.67307, lng: -90.24424 },
    ];
    // Construct the greaterVille polygon.
    const greaterVilleArea = new google.maps.Polygon({
        paths: greaterVilleCoords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.25,
    });
    greaterVilleArea.setMap(map);

    // Define the LatLng coordinates for the kinloch polygon path.
    const kinlochCoords = [
        { lat: 38.74571, lng: -90.32981 },
        { lat: 38.74563, lng: -90.31902 },
        { lat: 38.74421, lng: -90.31902 },
        { lat: 38.74416, lng: -90.31814 },
        { lat: 38.73177, lng: -90.31801 },
        { lat: 38.72952, lng: -90.3229 },
        { lat: 38.72915, lng: -90.32252 },
        { lat: 38.72878, lng: -90.32308 },
        { lat: 38.73404, lng: -90.32951 },
        { lat: 38.73505, lng: -90.33131 },
        { lat: 38.7403, lng: -90.33479 },
        { lat: 38.74115, lng: -90.33468 },
        { lat: 38.74089, lng: -90.33275 },
        { lat: 38.74322, lng: -90.33273 },
        { lat: 38.74327, lng: -90.32984 },
        { lat: 38.74571, lng: -90.32981 },
    ];
    // Construct the kinloch polygon.
    const kinlochArea = new google.maps.Polygon({
        paths: kinlochCoords,
        strokeColor: "#0F9D58",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0F9D58",
        fillOpacity: 0.25,
    });
    kinlochArea.setMap(map);

    // Define the LatLng coordinates for the millCreekValley polygon path.
    const millCreekValleyCoords = [
        { lat: 38.63734, lng: -90.23291 },
        { lat: 38.63526, lng: -90.2241 },
        { lat: 38.63481, lng: -90.22332 },
        { lat: 38.63198, lng: -90.20843 },
        { lat: 38.62715, lng: -90.20996 },
        { lat: 38.62746, lng: -90.21144 },
        { lat: 38.62396, lng: -90.21272 },
        { lat: 38.62588, lng: -90.22212 },
        { lat: 38.62697, lng: -90.22259 },
        { lat: 38.62601, lng:  -90.22349 },
        { lat: 38.6266, lng:  -90.22544 },
        { lat: 38.62789, lng:  -90.22606 },
        { lat: 38.62943, lng: -90.22564 },
        { lat: 38.63043, lng: -90.23115 },
        { lat: 38.62867, lng: -90.23167 },
        { lat: 38.63, lng: -90.23517 },
        { lat: 38.63734, lng: -90.23291 },
    ];
    // Construct the millCreekValley polygon.
    const millCreekValleyArea = new google.maps.Polygon({
        paths: millCreekValleyCoords,
        strokeColor: "#0F9D58",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0F9D58",
        fillOpacity: 0.25,
    });
    millCreekValleyArea.setMap(map);

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
            case "Time1":
                time1Markers.push(marker);
                break;
            case "Time2":
                time2Markers.push(marker);
                break;
            case "Time3":
                time3Markers.push(marker);
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
    if (category === "time1") {
        for (let i = 0; i < time1Markers.length; i++) {
            time1Markers[i].setMap(map);
        }
    } else if (category === "time2") {
        for (let i = 0; i < time2Markers.length; i++) {
            time2Markers[i].setMap(map);
        }
    } else if (category === "time3") {
        for (let i = 0; i < time3Markers.length; i++) {
            time3Markers[i].setMap(map);
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