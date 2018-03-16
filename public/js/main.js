var spot = {};

//Passes Spot Mongoose object to play JS
function passSpot(passedSpot) {
    spot = passedSpot;
    console.log("Spot Object passed to JS");
}

//Intializes Google Map
function initMap() {

    var myLatLng = {lat: parseFloat(spot.lat), lng: parseFloat(spot.lng)};

    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 13
    });
    
    //Content for Clickable box on Map Marker
    var infoContent = '<h1>'+ spot.name + '</h1>';

    var infowindow = new google.maps.InfoWindow({
        content: infoContent
    });
    
    // Create a marker and set its position.
    var marker = new google.maps.Marker({
      map: map,
      position: myLatLng,
      title: 'Hello World!'
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
  }