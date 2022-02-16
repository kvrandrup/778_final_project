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

//load GeoJSON file
function getWAData(mymap){
    $.ajax("data/wa_boundary.geojson", {
	dataType: "json", 
	success: function(response){
	    //create boundary options
	    var wamarkeroptions = {
		fillColor: "#ffffff",
		color: "#000000", 
		fillOpacity: 0,
	    }    
	//create a Leaflet GeoJSON layer and add it to map
	L.geoJson(response).addTo(mymap);
	}	
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