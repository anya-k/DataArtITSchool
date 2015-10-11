/**
 * Created by Anya on 11.10.2015.
 */
function AddInfoWidnow(marker,message)
{
  var infowindow = new google.maps.InfoWindow({ content: message });

  google.maps.event.addListener(marker, 'click', function() {

    infowindow.open(marker.get('map'), marker);

  });

}


function ShowOnMap(ContainerId, mapItems) {

  var DefaultLatLng= new google.maps.LatLng('12.967461', '79.941824');

  var mapOptions = {
    center: DefaultLatLng,
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    marker: true
  };

  var mapCust = new google.maps.Map(document.getElementById(ContainerId), mapOptions);

  var arrJsonObject = JSON.parse(mapItems);

  for (var y = 1; y <= arrJsonObject.length; y++)
  {

    var myLatLng1 = new google.maps.LatLng(arrJsonObject[y - 1].Latitude, arrJsonObject[y - 1].Lonngitude);

    var marker = new google.maps.Marker({
      position: myLatLng1,
      map: mapCust,
      title: 'Marked at '+ arrJsonObject[y - 1].markedDate
    });

    addInfoWindows(marker,y-1,arrJsonObject);


    marker.setMap(mapCust);

  }
}