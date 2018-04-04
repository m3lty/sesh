
// ===================================================================================
// Contains all functions and methods associated with the Google Maps api elements.
//
// ===================================================================================
var markers = [{}];
var singleSpot = {};
var content;
var latLng;
var geoCoder;
var codedMarker = [];

//Passes Spot Mongoose object to play JS

    //Geocoded User Readable address and places marker


//Intializes Full Page Google Map
//Called on HOME PAGE only.
function initMap() {
    var minZoom = 8;
    var paCenter = {lat:40.925999, lng: -77.594152}; //Initial location for map placement
    geoCoder = new google.maps.Geocoder(); 
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: paCenter,
        zoom: minZoom,
        disableDefaultUI: true,
    });
  
    //===================================================
    //draws the window - 300px wide
    var infowindow = new google.maps.InfoWindow({
        maxWidth: 300,
    });
    function geoCodeAddress(spot) {
        var address = spot.address.geo;
        console.log("Geocode called");
        console.log(address + "??");
        var loc = [];
        var returner;
        geoCoder.geocode({'address': address}, function(results, status){
            if (status == 'OK'){
                markers = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map
                }) ; 
        google.maps.event.addListener(markers, "click", (function(markers, i) {
                return function() {
                        // content = contentAdd(spot[i]);
                        // infowindow.setContent(content);
                        // infowindow.open(map, markers);
                    console.log("Clicked?");
                    contentAdd(spot);
                }
                })(markers, i));   
            
            } else {
                console.log(status);
                console.log("Geocode slipped on " + spot.address.addr1);
                
            }
        }); 
    }

    //using Jquery to add style to whole InfoWindow
    google.maps.event.addListenerOnce(map, 'idle', function(){
        jQuery('.gm-style-iw').prev('div').remove();
    });
    //sets minimum zoom level
    google.maps.event.addListener(map, 'zoom_changed', function () {
        if (map.getZoom() < minZoom) map.setZoom(minZoom);
    });

    //loop calling Geocode and Placement of markers
    for(var i = 0; i < spot.length; i++ ){
        geoCodeAddress(spot[i]);
    }
}
//Calls the Small Single Marker map for Spot page.
function initSmallMap(){
    var minZoom = 13;
    var address = spot.address.geo;
    geoCoder = new google.maps.Geocoder(); 
    var mapCenter ;
    geoCoder.geocode({'address': address}, function(results, status){
        if (status == 'OK'){
            console.log("Geocoded OK");
            var map = new google.maps.Map(document.getElementById("singleMap"),{
                center: results[0].geometry.location,
                zoom: minZoom
            });
            function geoCodeAddress(spot) {
                var address = spot.address.geo;
                console.log("Geocode called");
                console.log(address + "??");
                geoCoder.geocode({'address': address}, function(results, status){
                    if (status == 'OK'){
                        markers = new google.maps.Marker({
                            position: results[0].geometry.location,
                            map: map
                        }) ; 
                   
                    } else {
                        console.log("Geocode could not display spot: " + spot.name);
                    }
                }); 
            }
            geoCodeAddress(spot);  
        }}) ; 



    
}





//===================================
//
//     Populates Modal for Spot information on Home page.
//

function contentAdd(spot){
    var modalRating = spot.ratings.avg;
    var spotModal = 
        '<div class="spotModal">'+
            '<div class="spotModalContent">' +
            '<span class="close">&times;</span>' +
                '<h2 class="modalText">' + spot.name + '</h2>' +
                '<img class="modalImg" src="'+spot.mainImg+'">' +
                '<div class="modalOverlay">' +
                '<h2 class="text-center hoverText"><a href="spots/' + spot._id + '">' + spot.name + '</a></h2>' +
                '<div class="starRating"></div>' +
                '</div>'+

            '</div>'+
        '</div>';    
    $("body").prepend(spotModal);

    for (var i = 0 ; i < Math.floor(modalRating); i++){
        $(".starRating").append("<i class='fa fa-star'></i>");        
    }
    var closeSpot = document.getElementsByClassName("close")[0];
    var modalSpot = document.getElementsByClassName("spotModal")[0];
    
    window.onclick = function(e) {
        if (e.target == modalSpot ){
            $(".spotModal").remove();
        }
    }

    closeSpot.onclick = function(){
        $(".spotModal").remove();
    }
}

document.onload = function(){
    console.log("It is connected");
}