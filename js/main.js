/*778 Final Project*/

//universal variables
var wa_boundary;
var king_boundary;
var all_parks;
var all_trails;
var tracts;

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

    //call getData function
    getWAData(mymap);
};

//define layer styles for each static feature
function waStyle(feature) {
    return {
	fillColor: #0000ffff, 
	color: #000000, 
	fillOpacity: 0, 
    };
}

function kingStyle(feature) {
    return {
	fillColor: #0000ffff, 
	color: #000000, 
	fillOpacity: 0,
    };
}

funtion parkStyle(feature) {
    return {
	fillColor: #98FB98
	color: #006400
	fillOpacity: 0.33,
    };
}

//load GeoJSON file
function getWAData(mymap) {
    $.getJSON("data/wa_boundary.geojson", function(data) {
	L.geoJson(data).addTo(mymap);
    };
}

$(document).ready(() => {
    $('#MybtnModal').click(function(){
	$('#modal').modal('show')
	});
    //indicator = $('input[name=flexRadioDefault]:checked')[0].id.replace('Radio','');
    //initListeners();
    createMap();
});