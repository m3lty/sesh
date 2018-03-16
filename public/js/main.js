var spot = {};
var markers = [{}];
var latLng, content

//Passes Spot Mongoose object to play JS
function passSpot(passedSpot) {
    spot = passedSpot;
    console.log("Spot Object passed to JS");
    console.log(spot);
}

//Intializes Google Map
function initMap() {
    var paCenter = {lat:40.925999, lng: -77.594152} //Initial location for map placement
    
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
      center: paCenter,
      zoom: 8
    });
    var infowindow = new google.maps.InfoWindow({
        maxWidth: 300
    });
    //Placing Markers for each Spot in database
    for(var i = 0; i < spot.length; i++ ){
        latLng = {lat: parseFloat(spot[i].lat), lng: parseFloat(spot[i].lng)};

        markers = new google.maps.Marker({
            position: latLng,
            map: map
        });          
        
        google.maps.event.addListener(markers, "click", (function(markers, i) {
            return function() {
                content = contentAdd(spot[i]);
                infowindow.setContent(content);
                infowindow.open(map, markers);
                
            }
        })(markers, i));
    }
}
//===================================
function contentAdd(spot){
    return ('<div class="infoContainer">'+
                   '<h2>'+ spot.name + '</h2>' +
                    '<img src=' + spot.img + '>' +   
            '</div>')
}