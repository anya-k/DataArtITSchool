/**
 * Created by Anya on 08.10.2015.
 */
var users = [
  { id: '1', name: 'Restaurant 1', latitude: "46.428172",
    longitude: "30.745471",
  text:'about1' },
  { id: '2', name: 'Restaurant 2', latitude: "46.463183",
    longitude: "30.725386", text:'about2' },
  { id: '3', name: 'Restaurant 3', latitude: "46.427938",
    longitude: "30.735733", text:'about3' },
  { id: '4', name: 'Restaurant 4', latitude: "46.427698",
    longitude: "30.7571443", text:'about4' },
  { id: '5', name: 'Restaurant 5', latitude: "46.480917",
    longitude: "30.713885", text:'about5' },
  { id: '6', name: 'Restaurant 6', latitude: "46.474533",
    longitude: "30.757659", text:'about6' }
];
//46.427698, 30.757144
function getLocation() {
  var map = document.getElementById("mapholder");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    map.innerHTML = "Geolocation is not supported by this browser.";
  }
}
var curPos;
function getCurrentPosition() {
  curPos = { latitude: "46.455733", longitude: "30.729416"};
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}
function multiplyMarker() {
  var mapholder = document.getElementById('mapholder');
  // map options
  getCurrentPosition();
  var options = {
    zoom: 13,
    center: new google.maps.LatLng(curPos.latitude, curPos.longitude), // centered US
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    mapTypeControl: false
  };

  // init map
  var map = new google.maps.Map(mapholder, options);

  // NY and CA sample Lat / Lng
  var southWest = new google.maps.LatLng(40.744656, -74.005966);
  var northEast = new google.maps.LatLng(34.052234, -118.243685);
  var lngSpan = northEast.lng() - southWest.lng();
  var latSpan = northEast.lat() - southWest.lat();

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
        infowindow = new google.maps.InfoWindow({
          content: 'Hello, World!!'
        });
        infowindow.open(map, marker);
      });
    })(marker, i);
  }
}


function showPosition(position) {
  curPos = position.coords;
}

function generateRating() {
  var ulRating = document.getElementById("list").getElementsByTagName('ul')[0];

  function updateUlRaiting() {
    var i;
    //return;
    ulRating.innerHTML = '';
    for (i = 0; i < users.length; i++) {
      var el = document.createElement('li');
      var divItem = document.createElement('div');
      divItem.classList.add("item-title");
      var h2 = document.createElement('h4');
      //h2.innerHTML = users[i].name;

      var a1 = document.createElement('a');
      a1.setAttribute('href', "#home");
      a1.innerHTML = users[i].name;

      h2.appendChild(a1);
      divItem.appendChild(h2);
      el.appendChild(divItem);
      ulRating.appendChild(el);

    }
  }
  updateUlRaiting();
}

function onLoad() {
  'use strict';
  //getLocation();
  multiplyMarker();
  //tryMultiplayMarker();
  generateRating();

}

window.addEventListener('load', onLoad);
