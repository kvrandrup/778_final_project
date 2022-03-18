/*778 Final Project*/
//function to initialize the Leaflet map
function createMap(){
    //create the map
    var mymap = L.map('mapid', {
        center: [47.508761, -121.883762],
       zoom: 10
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
    getTractData(mymap);
    //getParkDistData(mymap);
    getTrailDistData(mymap);
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
    //console.log(attributes);

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
function handleParkClick(checkbox){
    if(checkbox.checked){
        console.log(checkbox.value+"True")
    }
    else{
        console.log(checkbox.value+"False")
    };
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
    //console.log(attributes);

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
function handleTrailClick(checkbox){
    if(checkbox.checked){
        console.log(checkbox.value+"True")
    }
    else{
        console.log(checkbox.value+"False")
    };
};

//KING COUNTY CENSUS TRACT DATA FUNCTIONS
function processTractData(data){
    //empty array to hold attributes
    var attributes = [];

    //properties of the first feature in the dataset
    for (var i=0; i<427; i++){
        attributes.push(data.features[i].properties);
    }
    //console.log(properties);

    //attributes.push(properties);
    //check result
    console.log(attributes);
    return attributes;
};

//Add markers for features to the map
function createTractSymbols(data, mymap, attributes){
    //create a Leaflet GeoJSON layer and add it to the map
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
    var properties = [data.features[0].properties, data.features[1].properties,
                      data.features[2].properties, data.features[3].properties,
                      data.features[4].properties, data.features[5].properties,
                      data.features[6].properties, data.features[7].properties,
                      data.features[8].properties];
    attributes = properties

    //check result
    console.log(attributes);
    return attributes;
};

function pointToLayer(feature, attributes) {
    var attribute = attributes[1];
    console.log(attribute);
}

//Add markers for features to the map
function createParkDistSymbols(data, mymap, attributes){
    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
        style: diststyle
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
    var properties = [data.features[0].properties, data.features[1].properties,
                      data.features[2].properties, data.features[3].properties,
                      data.features[4].properties, data.features[5].properties,
                      data.features[6].properties, data.features[7].properties,
                      data.features[8].properties];
    attributes = properties;

    //check result
    console.log(attributes);
    return attributes;
};

//Add markers for features to the map
function createTrailDistSymbols(data, mymap, attributes){
    var attribute = attributes[0];
    console.log(attribute["dist"]);
    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
        style: diststyle
    }).addTo(mymap);
};

//function to retrieve the park data and place it on the map
function getTrailDistData(mymap){
    //load the data
    $.ajax("data/trail_distance.geojson", {
        dataType: "json",
        success: function(response){
            //create an attributes array
            var attributes = processTrailDistData(response);

            //call function to add map add-ons
            createTrailDistSymbols(response, mymap, attributes);
        }
    });
};


//FEATURE STYLE FUNCTIONS

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

//get color function for distance layers
function getColor(d) {
    return d == "9" ? "#D73027" :
        d == "8" ? "#F46D43" :
            d == "7" ? "#FDAE61" :
                d == "6" ? "#FEE090" :
                    d == "5" ? "#FFFFBF" :
                        d == "4" ? "#E0F3F8" :
                            d == "3" ? "#ABD9E9" :
                                d == "2" ? "#74ADD1" :
                                    "#4575B4" ;
}
//END OF STYLE FUNCTIONS

function onEachFeature(feature, layer, geojson, mymap) {
    layer.on({
        mouseover: function highlightFeature(e) {
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
        },
        mouseout: function resetHighlight(e){
            geojson.resetStyle(e.target);
        },
        click: function zoomToFeature(e) {
            mymap.fitBounds(e.target.getBounds());
        }
    });
}


$(document).ready(() => {
    $('#modal').modal('show');
    $('#MybtnModal').click(function(){
	$('#modal').modal('show')
	});
    $('#parks').click(function(){
        alert("It Clicked!");
    });
    $('#trails').click(function(){
        alert("It Clicked!");
    });
    createMap();
});