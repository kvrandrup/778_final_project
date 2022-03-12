/*778 Final Project*/

//function to initialize the Leaflet map
function createMap(){
    //create the map
    var mymap = L.map('mapid', {
        center: [47.508761, -121.883762],
        zoom: 9.3
    });

    //add base tilelayer -- grey basemap, grey reference map
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
    }).addTo(mymap);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
    }).addTo(mymap);

    //call functions to get data and add it to the map
    getParkData(mymap);
    getTrailData(mymap);
    getKingData(mymap);
    getTractData(mymap);
    getParkDistData(mymap);
    //getTrailDistData(mymap);

};

//KING COUNTY BOUNDARY DATA FUNCTIONS
function processKingData(data){
    //empty array to hold attributes
    var attributes = [];

    //properties of the first feature in the dataset
    var properties = data.features[0].properties;

    //push each attribute name into attributes array
    for (var attribute in properties){
        //take all attributes
            attributes.push(attribute);
    };

    //check result
    console.log(attributes);

    return attributes;
};

//Add markers for features to the map
function createKingSymbols(data, mymap, attributes){
    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
	    style: kingstyle
    }).addTo(mymap);
};

//function to retrieve the park data and place it on the map
function getKingData(mymap){
    //load the data
    $.ajax("data/king_county.geojson", {
        dataType: "json",
        success: function(response){
	    //create an attributes array
	    var attributes = processKingData(response);

	    //call function to add map add-ons
          createKingSymbols(response, mymap, attributes);
        }
    });
};


//KING COUNTY PARK DATA FUNCTIONS
function processParkData(data){
    //empty array to hold attributes
    var attributes = [];

    //properties of the first feature in the dataset
    var properties = data.features[0].properties;

    //push each attribute name into attributes array
    for (var attribute in properties){
        //take all attributes
            attributes.push(attribute);
    };

    //check result
    console.log(attributes);

    return attributes;
};

//Add markers for features to the map
function createParkSymbols(data, mymap, attributes){
    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
	    style: parkstyle
    }).addTo(mymap);
};

//function to retrieve the park data and place it on the map
function getParkData(mymap){
    //load the data
    $.ajax("data/all_parks.geojson", {
        dataType: "json",
        success: function(response){
	    //create an attributes array
	    var attributes = processParkData(response);

	    //call function to add map add-ons
          createParkSymbols(response, mymap, attributes);
        }
    });
};

//KING COUNTY TRAIL DATA FUNCTIONS
function processTrailData(data){
    //empty array to hold attributes
    var attributes = [];

    //properties of the first feature in the dataset
    var properties = data.features[0].properties;

    //push each attribute name into attributes array
    for (var attribute in properties){
        //take all attributes
            attributes.push(attribute);
    };

    //check result
    console.log(attributes);

    return attributes;
};

//Add markers for features to the map
function createTrailSymbols(data, mymap, attributes){
    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
	    style: trailstyle
    }).addTo(mymap);
};

//function to retrieve the park data and place it on the map
function getTrailData(mymap){
    //load the data
    $.ajax("data/all_trails.geojson", {
        dataType: "json",
        success: function(response){
	    //create an attributes array
	    var attributes = processTrailData(response);

	    //call function to add map add-ons
          createTrailSymbols(response, mymap, attributes);
        }
    });
};

//KING COUNTY CENSUS TRACT DATA FUNCTIONS
function processTractData(data){
    //empty array to hold attributes
    var attributes = [];

    //properties of the first feature in the dataset
    var properties = data.features[0].properties;

    //push each attribute name into attributes array
    for (var attribute in properties){
        //take all attributes
            attributes.push(attribute);
    };

    //check result
    console.log(attributes);

    return attributes;
};

//Add markers for features to the map
function createTractSymbols(data, mymap, attributes){
    //create a Leaflet GeoJSON layer and add it to the map
    var geojson = L.geoJson(data);
    L.geoJson(data, {
	    style: style,
	    onEachFeature: onEachFeature
    }).addTo(mymap);
};

//function to retrieve the park data and place it on the map
function getTractData(mymap){
    //load the data
    $.ajax("data/census_tract.geojson", {
        dataType: "json",
        success: function(response){
	    //create an attributes array
	    var attributes = processTractData(response);

	    //call function to add map add-ons
          createTractSymbols(response, mymap, attributes);
        }
    });
};

//KING COUNTY DISTANCE FROM PARK DATA FUNCTIONS
function processParkDistData(data){
    //empty array to hold attributes
    var attributes = [];

    //properties of the first feature in the dataset
    var properties = data.features[0].properties;

    //push each attribute name into attributes array
    for (var attribute in properties){
        //take all attributes
            attributes.push(attribute);
    };

    //check result
    console.log(attributes);

    return attributes;
};

//Add markers for features to the map
function createParkDistSymbols(data, mymap, attributes){
    //create a Leaflet GeoJSON layer and add it to the map
    var geojson = L.geoJson(data);
    L.geoJson(data, {
	    style: diststyle,
    }).addTo(mymap);
};

//function to retrieve the park data and place it on the map
function getParkDistData(mymap){
    //load the data
    $.ajax("data/park_distance.geojson", {
        dataType: "json",
        success: function(response){
	    //create an attributes array
	    var attributes = processParkDistData(response);

	    //call function to add map add-ons
          createParkDistSymbols(response, mymap, attributes);
        }
    });
};

//KING COUNTY DISTANCE FROM TRAIL DATA FUNCTIONS
function processTrailDistData(data){
    //empty array to hold attributes
    var attributes = [];

    //properties of the first feature in the dataset
    var properties = data.features[0].properties;

    //push each attribute name into attributes array
    for (var attribute in properties){
        //take all attributes
            attributes.push(attribute);
    };

    //check result
    console.log(attributes);

    return attributes;
};

//Add markers for features to the map
function createTrailDistSymbols(data, mymap, attributes){
    //create a Leaflet GeoJSON layer and add it to the map
    var geojson = L.geoJson(data);
    L.geoJson(data, {
	    style: diststyle,
    }).addTo(mymap);
};

//function to retrieve the park data and place it on the map
function getTrailDistData(mymap){
    //load the data
    $.ajax("data/trail_distance.geojson", {
        dataType: "json",
        success: function(response){
	    //create an attributes array
	    var attributes = processTractData(response);

	    //call function to add map add-ons
          createTrailDistSymbols(response, mymap, attributes);
        }
    });
};

//FEATURE STYLE FUNCTIONS
function WAstyle(feature) {
    return {
        fillColor: "#98FB98",
        weight: 1,
        opacity: 1,
        color: "#000000",
        fillOpacity: 0
    };
}

function kingstyle(feature) {
    return {
        fillColor: "#98FB98",
        weight: 1,
        opacity: 1,
        color: "black",
        fillOpacity: 0.1
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
	  weight: .5
    };
}

function style(feature) {
    return {
        fillColor: "#d3d3d3",
        weight: .2,
        opacity: 1,
        color: "#006400",
        fillOpacity: 0.3
    };
}

function diststyle(feature) {
    return {
        fillColor: getColor(feature.properties.dist),
        weight: .2,
        opacity: 1,
        color: "black",
        fillOpacity: 0.5
    };
}

//END OF STYLE FUNCTIONS 

//get color function for distance layers
function getColor(d) {
	return d == 9 ? "D73027" :
		 d == 8 ? "F46D43" :
		 d == 7 ? "FDAE61" :
		 d == 6 ? "FEE090" :
		 d == 5 ? "FFFFBF" :
		 d == 4 ? "E0F3F8" :
		 d == 3 ? "ABD9E9" :
		 d == 2 ? "74ADD1" :
		 	   "4575B4" ;
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 1,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.5
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: function(){geojson.resetStyle()},
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