let map;
const videoIcon = "img/video_Icon_small.png";
const imageIcon = "img/camera_Icon_small.png";
const infoIcon = "img/info_icon_18dp.png";
const clusterImagePath = "img/";


let time1Markers = [];  //Pre-1900s
let time2Markers = [];  //1900-1930
let time3Markers = [];  //1940-present
let markers = [];

let siteData={"data":[]};
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
    siteData.data.forEach(element => {
        if (element.pin === "Image") {
            element.icon = imageIcon;
        } else if (element.pin === "Video") {
            element.icon = videoIcon;
        } else if (element.pin === "Info") {
            element.icon = infoIcon;
        }
    })
}

// The mapping between latitude, longitude and pixels is defined by the web
// mercator projection.
const TILE_SIZE = 256;
function project(latLng) {
    let siny = Math.sin((latLng.lat() * Math.PI) / 180);
    // Truncating to 0.9999 effectively limits latitude to 89.189. This is
    // about a third of a tile past the edge of the world tile.
    siny = Math.min(Math.max(siny, -0.9999), 0.9999);
    return new google.maps.Point(
      TILE_SIZE * (0.5 + latLng.lng() / 360),
      TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI))
    );
  }


//Bottom y coord: 38.631494277480485, -90.25106836419666
//Top y coord: 38.75079132515602, -90.32725639266114

function initMap() {
    siteData.data=JSON.parse(sessionStorage.getItem("videos"));
    setIcons();

    var heightPix = document.getElementById("map").offsetHeight;
    //lng coords don't matter
    const bottomLatLng = new google.maps.LatLng(38.631494277480485, -90.2);
    let bottomGlobalCoord = project(bottomLatLng);

    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 38.6864, lng: -90.28267},
        //values chosen by trial and error
        //zoom: 10 + 2.4*percentage/600,
        zoom: Math.floor(Math.log(heightPix*550/bottomGlobalCoord.x)/Math.log(2)),
        //zoom: 11,
        styles: myStyles
    });

    // Define the LatLng coordinates for the Evans Howard Place polygon path.
    const evansHowardCoords = [
        { lat: 38.629127489606134, lng: -90.33520636882098 },
        { lat: 38.62462044036806, lng: -90.33514729864528 },
        { lat: 38.623282115227845, lng: -90.33459597700543},
        { lat: 38.62287938274139, lng: -90.3348548336343 },
        { lat: 38.622817592726555, lng: -90.33618352932704},
        { lat: 38.62247156765951, lng: -90.33784439894302},
        { lat: 38.62344784840055, lng: -90.3416881257749},
        { lat: 38.62405338290816, lng: -90.34251065167358 },
        { lat: 38.62418931853646, lng: -90.34663909906544 },
        { lat: 38.62407809850301, lng: -90.34752489619395 },
        { lat: 38.625449800193394, lng: -90.34663909906544 },
        { lat: 38.628156053614106, lng: -90.34611711141746 },
        { lat: 38.62909518617491, lng: -90.3429060968266},
    ];
    // Construct the Evans Howard Place polygon.
    const evansHowardArea = new google.maps.Polygon({
        paths: evansHowardCoords,
        strokeColor: "#271360",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#271360",
        fillOpacity: 0.25,
    });
    evansHowardArea.setMap(map);

    // Define the LatLng coordinates for the McRee town polygon path.
    const mcReeCoords = [
        { lat: 38.6270648775109, lng: -90.24218137619881 },
        { lat: 38.62337686014339, lng: -90.24346883648255 },
        { lat: 38.62180101306912, lng: -90.24441297402397 },
        { lat: 38.6173750446089, lng: -90.24507816183723 },
        { lat: 38.618665980289656, lng: -90.25975520907195 },
        { lat: 38.62615965444914, lng: -90.2508288177713 },
        { lat: 38.62817171819877, lng: -90.24764473540219 },
    ];
    // Construct the McRee town polygon.
    const mcReeArea = new google.maps.Polygon({
        paths: mcReeCoords,
        strokeColor: "#2D301B",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#2D301B",
        fillOpacity: 0.25,
    });
    mcReeArea.setMap(map);

    // Define the LatLng coordinates for the The Hill polygon path.
    const theHillCoords = [
        { lat: 38.625748320944, lng: -90.26518242128392 },
        { lat: 38.61263799376305, lng: -90.26775734185141 },
        { lat: 38.61106191074134, lng: -90.27453796601249 },
        { lat: 38.6121685258454, lng: -90.28762714556392 },
        { lat: 38.61682953542768, lng: -90.28711216145041 },
        { lat: 38.61957905372825, lng: -90.28835670639137 },
        { lat: 38.622261409032106, lng: -90.28805629899183 },
    ];
    // Construct the The Hill polygon.
    const theHillArea = new google.maps.Polygon({
        paths: theHillCoords,
        strokeColor: "#40818E",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#40818E",
        fillOpacity: 0.25,
    });
    theHillArea.setMap(map);

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
        strokeColor: "#1A237E",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#1A237E",
        fillOpacity: 0.25,
    });
    millCreekValleyArea.setMap(map);

    siteData.data.forEach(element => {
        let position = {lat: element.latitude, lng: element.longitude};
        let marker = new google.maps.Marker({position, map, icon: element.icon, title: element.title});

        // // Open infowindow on mouse hover
        // marker.addListener('mouseover', function() {
        //     element.info_window.open(map, this);
        // });
        
        // // Closing infowindow on mouse out
        // marker.addListener('mouseout', function() {
        //     element.info_window.close();
        // });
        // switch (element.category) {
        //     case "Time1":
        //         time1Markers.push(marker);
        //         break;
        //     case "Time2":
        //         time2Markers.push(marker);
        //         break;
        //     case "Time3":
        //         time3Markers.push(marker);
        //         break;
        //     default:
        //         break;
        // }
        google.maps.event.addListener(marker, 'click', (function (marker) {
            return function () {
                window.location.href = "videoList.html?location=" + element.location;
            }
        })(marker));
        markers.push(marker);
    });
    var mc = new MarkerClusterer(map, markers, {imagePath: `${clusterImagePath}/m`, averageCenter: true});
    $('#refresh').click(function() {
        refreshMap()
    })
    $('#clear').click(function() {
            clearClusters()
    })
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

function refreshMap() {
    if (markerClusterer) {
            markerClusterer.clearMarkers();
            // 				markerClusterer.addMarkers(markers,true)
            markerClusterer.addMarkers(markers)
    }
}

function clearClusters(e) {
    e.preventDefault();
    e.stopPropagation();
    markerClusterer.clearMarkers();
}