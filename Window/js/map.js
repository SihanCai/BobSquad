let map;
const videoIcon = "img/video_Icon_small.png";
const imageIcon = "img/camera_Icon_small.png";
const clusterImagePath = "img/";

let siteData={"data":[]};

// map settings to turn off unecessary default markers
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

// Set different catagory icons for markers
function setIcons() {
    siteData.data.forEach(element => {
        if (element.pin === "Image") {
            element.icon = imageIcon;
        } else if (element.pin === "Video") {
            element.icon = videoIcon;
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

    // creating markers from json data
    let markers = [];
    siteData.data.forEach(element => {
        let position = {lat: element.latitude, lng: element.longitude};
        let marker = new google.maps.Marker({position, map, icon: element.icon, title: element.title});
        google.maps.event.addListener(marker, 'click', (function (marker) {
            return function () {
                window.location.href = "videoList.html?location=" + element.location;
            }
        })(marker));
        markers.push(marker);
    });

    // set marker clustering
    new MarkerClusterer(map, markers, {imagePath: `${clusterImagePath}/m`, averageCenter: true});
}