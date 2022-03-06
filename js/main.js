/*778 Final Project*/

//universal variables
var WAdata = "data/wa_boundary.geojson"
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

    //add WA data to map
    L.geoJson(WAdata, {style: style}).addTo(mymap);
};

function WAstyle(feature) {
    return {
        fillColor: #98FB98,
        weight: 1,
        opacity: 1,
        color: #000000,
        //dashArray: '3',
        fillOpacity: 0
    };
}

function Kingstyle(feature) {
    return {
        fillColor: #98FB98,
        weight: 1,
        opacity: 1,
        color: #000000,
        //dashArray: '3',
        fillOpacity: 0
    };
}

function parkstyle(feature) {
    return {
        fillColor: #98FB98,
        weight: .2,
        opacity: 1,
        color: #006400,
        //dashArray: '3',
        fillOpacity: 0.4
    };
}

function trailstyle(feature) {
    return {
        color: #8b4513, 
	  width: 1
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