
$(document).ready(function(){/* google maps -----------------------------------------------------*/
google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {
    multiplyMarker();
}
});

var users = [
  { id: '1', name: 'Restaurant 1', latitude: "46.408882",
    longitude: "30.715387",  text:'about1' },
  { id: '2', name: 'Restaurant 2', latitude: "46.463183",
    longitude: "30.725386", text:'about2' },
];

function showPosition(position) {
  curPos = position.coords;
  console.log("showPosition");
  if (map) {
    console.log("map find");
    map.setCenter(new google.maps.LatLng(curPos.latitude, curPos.longitude));
    console.log("map.center ", map.center);
  }
}
var curPos;
function getCurrentPosition() {
  curPos = { latitude: "46.471526", longitude: "30.740570"};
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    mapholder.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            mapholder.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            mapholder.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            mapholder.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            mapholder.innerHTML = "An unknown error occurred."
            break;
    }
}
var map;
var mapholder;
function multiplyMarker() {
  mapholder = $('#map-canvas')[0]; //document.getElementById('map-canvas');
  // map options
  getCurrentPosition();
  var options = {
    zoom: 13,
    center: new google.maps.LatLng(curPos.latitude, curPos.longitude), // centered US
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    mapTypeControl: false
  };

  // init map
  map = new google.maps.Map(mapholder, options);
  console.log("map.center init", map.center);
  // set multiple marker
  for (var i = 0; i < users.length; i++) {
    // init markers
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(users[i].latitude, users[i].longitude),
      map: map,
      title: users[i].name
    });

    // process multiple info windows
    (function(marker, i) {
      // add click event
      google.maps.event.addListener(marker, 'click', function() {
        window.location.href = "information.html";
        infowindow.open(map, marker);
      });
    })(marker, i);
  }
}

/* end google maps -----------------------------------------------------*/

