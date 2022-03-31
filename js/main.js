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
    getTrailData(mymap)
    getTractData(mymap);
    getParkDistData(mymap);
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
    return attributes;
};
//Add markers for features to the map
function createParkSymbols(data, mymap, attributes){
     var parkLayer = L.geoJson(data, {
           style: parkstyle
        }).addTo(mymap);
    $('#parks').click(function() {
        if (document.getElementById("parks").checked == true) {
            parkLayer.addTo(mymap);
        } else if (document.getElementById("parks").checked == false) {
            parkLayer.remove();
        };
    });
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
    return attributes;
};
//Add markers for features to the map
function createTrailSymbols(data, mymap, attributes){
    var trailLayer = L.geoJson(data, {
        style: trailstyle
    }).addTo(mymap);
    $('#trails').click(function() {
        if (document.getElementById("trails").checked == true) {
            trailLayer.addTo(mymap);
        } else if (document.getElementById("trails").checked == false) {
            trailLayer.remove();
        };
    });
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
    for (var i=0; i<427; i++){
        attributes.push(data.features[i].properties);
    }
    console.log(attributes);
    return attributes;
};

//Add markers for features to the map
function createTractSymbols(data, mymap, attributes){
    //create a Leaflet GeoJSON layer and add it to the map
    var tractLayer = L.geoJson(data, {
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

//Add markers for features to the map
function createParkDistSymbols(data, mymap, attributes){
    var parkDistLayer = L.geoJson(data, {
        style: diststyle
    }).addTo(mymap);
    parkDistLayer.remove();
    $('#distpark').click(function() {
        if (document.getElementById("distpark").checked == false) {
            parkDistLayer.remove();
        } else if (document.getElementById("distpark").checked == true) {
            parkDistLayer.addTo(mymap);
        };
    });
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
    var trailDistLayer = L.geoJson(data, {
        style: diststyle
    }).addTo(mymap);
    trailDistLayer.remove();
    $('#disttrail').click(function() {
        if (document.getElementById("disttrail").checked == false) {
            trailDistLayer.remove();;
        } else if (document.getElementById("disttrail").checked == true) {
            trailDistLayer.addTo(mymap);
        };
    });
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
        fillOpacity: 0.7
    };
}

function trailstyle(feature) {
    return {
        color: "#8b4513", 
	  weight: .7
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

function densstyle(feature) {
    return {
        fillColor: getDensColor(feature.properties.log_dens),
        weight: .2,
        opacity: 1,
        color: "#006400",
        fillOpacity: 0.7
    };
}
function malestyle(feature) {
    return {
        fillColor: getMaleColor(feature.properties.PercMale),
        weight: .2,
        opacity: 1,
        color: "#006400",
        fillOpacity: 0.7
    };
}
function whitestyle(feature) {
    return {
        fillColor: getWhiteColor(feature.properties.PercWhite),
        weight: .2,
        opacity: 1,
        color: "#006400",
        fillOpacity: 0.7
    };
}
function popstyle(feature) {
    return {
        fillColor: getPopColor(feature.properties.POP2010),
        weight: .2,
        opacity: 1,
        color: "#006400",
        fillOpacity: 0.7
    };
}

function diststyle(feature) {
    return {
        fillColor: getDistColor(feature.properties.dist),
        weight: .2,
        opacity: 1,
        color: "black",
        fillOpacity: 0.4
    };
}

//get color function for layers
//Distance
function getDistColor(d) {
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
//Density
function getDensColor(d) {
    return d <= -6.198 ? "#D73027" :
        d <= -4.301 ? "#F46D43" :
            d <= -3.356 ? "#FDAE61" :
                d <= -2.677 ? "#FEE08B" :
                    d <= -2.273 ? "#FFFFBF" :
                        d <= -1.684 ? "#D9EF8B" :
                            d <= -0.514 ? "#A6D96A" :
                                d <= 1.843 ? "#66BD63" :
                                    "#1A9850" ;
}
//Male
function getMaleColor(d) {
    return d <= 46.96 ? "#D73027" :
        d <= 48.23 ? "#F46D43" :
            d <= 49.14 ? "#FDAE61" :
                d <= 49.92 ? "#FEE08B" :
                    d <= 50.75 ? "#FFFFBF" :
                        d <= 52.05 ? "#D9EF8B" :
                            d <= 59.29 ? "#A6D96A" :
                                d <= 67.34 ? "#66BD63" :
                                    "#1A9850" ;
}
//White
function getWhiteColor(d) {
    return d <= 30.88 ? "#D73027" :
        d <= 47.33 ? "#F46D43" :
            d <= 57.26 ? "#FDAE61" :
                d <= 65.59 ? "#FEE08B" :
                    d <= 75.07 ? "#FFFFBF" :
                        d <= 80.98 ? "#D9EF8B" :
                            d <= 87.07 ? "#A6D96A" :
                                d <= 94.78 ? "#66BD63" :
                                    "#1A9850" ;
}
//POP2010
function getPopColor(d) {
    return d <= 2690 ? "#D73027" :
        d <= 3385 ? "#F46D43" :
            d <= 3971 ? "#FDAE61" :
                d <= 4513 ? "#FEE08B" :
                    d <= 5017 ? "#FFFFBF" :
                        d <= 5495 ? "#D9EF8B" :
                            d <= 6198 ? "#A6D96A" :
                                d <= 7323 ? "#66BD63" :
                                    "#1A9850" ;
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
    createMap();
});