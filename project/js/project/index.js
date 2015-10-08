/**
 * Created by Anya on 08.10.2015.
 */
var users = [
  { id: '1', name: 'Restaurant 1', text:'about1' },
  { id: '2', name: 'Restaurant 2', text:'about2' },
  { id: '3', name: 'Restaurant 3', text:'about3' }
];

function getLocation() {
  var map = document.getElementById("mapholder");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    map.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  var latlon = new google.maps.LatLng(lat, lon);
  var mapholder = document.getElementById('mapholder');

  mapholder.style.height = '250px';
  mapholder.style.width = '1000px';

  var myOptions = {
    center:latlon,zoom:14,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    mapTypeControl:false,
    navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
  }

  var map = new google.maps.Map(mapholder, myOptions);
  var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      map.innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      map.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      map.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      map.innerHTML = "An unknown error occurred.";
      break;
  }
}

function generateRating() {
  var ulRating = document.getElementById("price").getElementsByTagName('ul')[0];

  function updateUlRaiting() {
    var i;
    ulRating.innerHTML = '';
    for (i = 0; i < users.length; i++) {
      var el = document.createElement('li');
      el.classList.add("wow");
      el.classList.add("fadeInUp");
      //el.classList.add("animated");
      el.setAttribute("data-wow-duration", "300ms");
      //el.setAttribute("style", "visibility: visible; animation-duration: 300ms; animation-delay: "+delay+"ms; animation-name: fadeInUp;");
      var delay = 300 + i*100;
      el.setAttribute("data-wow-delay", delay+"ms");
      el.setAttribute("animation-name", "fadeInUp");
      var divItem = document.createElement('div');
      divItem.classList.add("item");
      var divItemTitle = document.createElement('div');
      divItemTitle.classList.add("item-title");
      var h2 = document.createElement('h2');
      h2.innerHTML = users[i].name;
      divItemTitle.appendChild(h2);
      divItem.appendChild(divItemTitle);
      el.appendChild(divItem);
      ulRating.appendChild(el);

    }
  }
  updateUlRaiting();
}

function onLoad() {
  'use strict';
  getLocation();
  generateRating();
}

window.addEventListener('load', onLoad);
