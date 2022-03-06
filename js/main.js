/*778 Final Project*/

//function to initialize the Leaflet map
function createMap(){
    //create the map
    var mymap = L.map('mapid', {
        center: [47.508761, -121.883762],
        zoom: 9.25
    });

    //add base tilelayer -- grey basemap, grey reference map
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
    }).addTo(mymap);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
    }).addTo(mymap);

    //add WA boundary to map
    L.geoJson(wa_boundary).addTo(mymap);

    //add King County boundary to map
    //KinggetData(mymap);
};


//function to get WA boundary and place it on the map
function WAgetData(maymap){
    $.ajax("data/wa_boundary.geojson", {
	  dataType: "json", 
	  success: function(response) {
		L.geoJson(response, {style: WAstyle}).addTo(mymap);
	  }
   });
}

//function to get King County boundary and place it on the map
function KinggetData(maymap){
    $.ajax("data/king_county.geojson", {
	  dataType: "json", 
	  success: function(response) {
		L.geoJson(response, {style: Kingstyle}).addTo(mymap);
	  }
    });
}

function WAstyle(feature) {
    return {
        fillColor: "#98FB98",
        weight: 1,
        opacity: 1,
        color: "#000000",
        fillOpacity: 0
    };
}

function Kingstyle(feature) {
    return {
        fillColor: "#98FB98",
        weight: 1,
        opacity: 1,
        color: "#000000",
        fillOpacity: 0
    };
}

function parkstyle(feature) {
    return {
        fillColor: "#98FB98",
        weight: .2,
        opacity: 1,
        color: "#006400",
        fillOpacity: 0.4
    };
}

function trailstyle(feature) {
    return {
        color: "#8b4513", 
	  width: 1
    };
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}


$(document).ready(() => {
    $('#MybtnModal').click(function(){
	$('#modal').modal('show')
	});
    //indicator = $('input[name=flexRadioDefault]:checked')[0].id.replace('Radio','');
    //initListeners();
    createMap();
});