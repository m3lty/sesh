var spot = {};
var markers = [{}];
var singleSpot = {};
var content;
var latLng;
var geoCoder;
var codedMarker = [];
//Passes Spot Mongoose object to play JS
function passSpot(passedSpot) {
    spot = passedSpot;
    console.log("Spot Object passed to JS");
    console.log(spot);
}
    //Geocoded User Readable address and places marker


//Intializes Full Page Google Map
function initMap() {
    var minZoom = 5;
    var paCenter = {lat:40.925999, lng: -77.594152} //Initial location for map placement
    geoCoder = new google.maps.Geocoder(); 
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: paCenter,
        zoom: minZoom,
    });
    //draws the window - 300px wide
    var infowindow = new google.maps.InfoWindow({
        maxWidth: 300,
    });
    function geoCodeAddress(spot) {
        var address = spot.address.geo
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
                console.log("Geocode fucked up! Sorry!");
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
                        console.log("Geocode fucked up! Sorry!");
                    }
                }); 
            }
            geoCodeAddress(spot);  
        }}) ; 



    
}





//===================================
//
//     Info Window contents
//

function contentAdd(spot){
//   var iwContent = document.createElement("div");
//   $(iwContent).append($(".lol").removeClass("hidden"));
    var spotModal = 
        '<div class="spotModal">'+
            '<div class="spotModalContent">' +
            '<span class="close">&times;</span>' +
                '<h2 class="modalText">' + spot.name + '</h2>' +
                '<img class="modalImg" src="'+spot.mainImg+'">' +
                '<div class="modalOverlay">' +
                '<h2 class="text-center hoverText"><a href="spots/' + spot._id + '">' + spot.name + '</a></h2>' +
                '</div>'+
                

            '</div>'+
        '</div>';    
    $("body").prepend(spotModal);
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

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};