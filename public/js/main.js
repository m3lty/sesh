var spot = {};
var markers = [{}];
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

//Intializes Google Map
function initMap() {
    var paCenter = {lat:40.925999, lng: -77.594152} //Initial location for map placement
    geoCoder = new google.maps.Geocoder(); 
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
      center: paCenter,
      zoom: 8
    });
    //draws the window - 300px wide
    var infowindow = new google.maps.InfoWindow({
        maxWidth: 300,
    });

    //using Jquery to add style to whole InfoWindow
    google.maps.event.addListenerOnce(map, 'idle', function(){
        jQuery('.gm-style-iw').prev('div').remove();
    });

    //Geocoded User Readable address and places marker
    function geoCodeAddress(spot) {
        var address = spot.address.addr1
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

    

    
    for(var i = 0; i < spot.length; i++ ){
        geoCodeAddress(spot[i]);
        //Placing Markers for each Spot in database
      
        // adding listeners to each marker for launch and info window when clicked

    }

    
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
                '<img class="modalImg" src="'+spot.img+'">' +
                '<div class="modalOverlay">' +
                '<h2 class="text-center hoverText">'+ spot.name + '</h2>' +
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

