/**
 * Created by Anya on 08.10.2015.
 */
var users = [
  { id: '1', name: 'Restaurant 1', latitude: "46.408882",
    longitude: "30.715387",  text:'about1' },
  { id: '2', name: 'Restaurant 2', latitude: "46.463183",
    longitude: "30.725386", text:'about2' },
  { id: '3', name: 'Restaurant 3', latitude: "46.427938",
    longitude: "30.735733", text:'about3' },
  { id: '4', name: 'Restaurant 4', latitude: "46.427698",
    longitude: "30.7571443", text:'about4' },
  { id: '5', name: 'Restaurant 5', latitude: "46.480917",
    longitude: "30.713885", text:'about5' },
  { id: '6', name: 'Restaurant 6', latitude: "46.474533",
    longitude: "30.757659", text:'about6' },
  { id: '7', name: 'Restaurant 7', latitude: "46.454551",
    longitude: "30.686720", text:'about7' },
  { id: '8', name: 'Restaurant 8', latitude: "46.408290",
    longitude: "30.736501", text:'about8' },
  { id: '9', name: 'Restaurant 9', latitude: "46.421072",
    longitude: "30.758989", text:'about9' },
  { id: '10', name: 'Restaurant 10', latitude: "46.396571",
    longitude: "30.731866", text:'about10' },
  { id: '11', name: 'Restaurant 11', latitude: "46.433969",
    longitude: "30.717275", text:'about11' }
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
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}
var map;
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
      a1.setAttribute('href', "information.html");
      a1.innerHTML = users[i].name;// + " - " + (users[i].id * Math.random()).toFixed(2);

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
