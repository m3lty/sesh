var spotLat = 0;
var spotLng = 0;
var spotName =0;
// document.addEventListener('DOMContentLoaded', function () {
//     if (document.querySelectorAll('#map').length > 0)
//     {
//       if (document.querySelector('html').lang)
//         lang = document.querySelector('html').lang;
//       else
//         lang = 'en';
  
//       var js_file = document.createElement('script');
//       js_file.type = 'text/javascript';
//       js_file.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBaJ5R-GLdIW9KPG1fQWm2LyjQC77x0Dk4&callback=initMap';
//       document.getElementsByTagName('head')[0].appendChild(js_file);
//       console.log("It did something");
//     }
//   });

function initLoc(lat, lng, name){
    spotLat = parseFloat(lat);
    spotLng = parseFloat(lng);
    spotName = name;

}

function passSpot(spot) {
    console.log(spot);
}
function initMap() {

    var myLatLng = {lat: spotLat, lng: spotLng};

    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 13
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