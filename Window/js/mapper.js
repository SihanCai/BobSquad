var dummyData = { 
    "data": [
            {lat: 38.637860, lng:-90.299484}, //FP
            {lat: 38.640809, lng:-90.293239}, //FP
        ]
}   



var map;
var markerArray = [];
function initialize() 
{
    var mapOptions = {center: new google.maps.LatLng(38.638821, -90.284174), zoom: 16};
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    dummyData.data.forEach(element => {
        new google.maps.Marker({position: element, map})
    });
}

function placeMarker(){
    
  //
}


google.maps.event.addDomListener(window, 'load', initialize);