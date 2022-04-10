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
function resetTractHighlight(e) {
    var layer = e.target
    layer.setStyle({
        fillColor: "#d3d3d3",
        weight: .2,
        opacity: 1,
        color: "#000000",
        fillOpacity: 0.3
    });
}
function resetDensHighlight(e) {
    var layer = e.target
    layer.setStyle({
        fillColor: getDensColor(layer.feature.properties.log_dens),
        weight: .2,
        opacity: 1,
        color: "#000000",
        fillOpacity: 0.7
    });
}
function resetWhiteHighlight(e) {
    var layer = e.target
    layer.setStyle({
        fillColor: getWhiteColor(layer.feature.properties.PercWhite),
        weight: .2,
        opacity: 1,
        color: "#000000",
        fillOpacity: 0.7
    });
}
function resetMaleHighlight(e) {
    var layer = e.target
    layer.setStyle({
        fillColor: getMaleColor(layer.feature.properties.PercMale),
        weight: .2,
        opacity: 1,
        color: "#000000",
        fillOpacity: 0.7
    });
}
function resetPopHighlight(e) {
    var layer = e.target
    layer.setStyle({
        fillColor: getPopColor(layer.feature.properties.POP2010),
        weight: .2,
        opacity: 1,
        color: "#000000",
        fillOpacity: 0.7
    });
}
function createPopup(e) {
    var percMaleVal = Math.round(e.target.feature.properties.PercMale * 100)/100;
    var percWhiteVal = Math.round(e.target.feature.properties.PercWhite * 100)/100;
    var popDensVal = Math.round(e.target.feature.properties.PopDens * 1000000)/1000000;
    var totalArea = Math.round(e.target.feature.properties.area * 0.00000038610 * 100 * 100)/100;
    var parkArea = Math.round(e.target.feature.properties.park_area * 100)/100;
    var trailDist = Math.round(e.target.feature.properties.tr_length * 100)/100;
    var popupContent = "<p><b>Census Tract: </b>" + e.target.feature.properties.TRACT
    + "</p><p>Total Population:  " + e.target.feature.properties.POP2010 +"</p>"
        + "</p><p>Percent Male:  " + percMaleVal +"%</p>"
        + "</p><p>Percent White:  " + percWhiteVal +"%</p>"
        + "</p><p>Population Density:  " + popDensVal.toExponential() +" people/sq mi</p>"
        + "</p><p>Total Area:  " + totalArea +" sq mi</p>"
        + "</p><p>Park Area:  " + parkArea +" sq mi</p>"
        + "</p><p>Trail Length:  " + trailDist +" mi</p>";
    e.target.bindPopup(popupContent).openPopup()
}
function onEachTractFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetTractHighlight,
        click: createPopup
    });
}
function onEachDensFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetDensHighlight,
        click: createPopup
    });
}
function onEachWhiteFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetWhiteHighlight,
        click: createPopup
    });
}
function onEachMaleFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetMaleHighlight,
        click: createPopup
    });
}
function onEachPopFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetPopHighlight,
        click: createPopup
    });
}

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
	    onEachFeature: onEachTractFeature
    }).addTo(mymap);
    var densLayer = L.geoJson(data, {
        style: densstyle,
        onEachFeature: onEachDensFeature
    });
    var whiteLayer = L.geoJson(data, {
        style: whitestyle,
        onEachFeature: onEachWhiteFeature
    });
    var maleLayer = L.geoJson(data, {
        style: malestyle,
        onEachFeature: onEachMaleFeature
    });
    var popLayer = L.geoJson(data, {
        style: popstyle,
        onEachFeature: onEachPopFeature
    });
    $('#popdens').change(function() {
        if (document.getElementById("popdens").checked == true) {
            tractLayer.remove();
            densLayer.remove();
            whiteLayer.remove();
            maleLayer.remove();
            popLayer.remove();
            densLayer.addTo(mymap);
        } else if (document.getElementById("popdens").checked == false) {
            densLayer.remove();
        };
    });
    $('#popwhite').change(function() {
        if (document.getElementById("popwhite").checked == true) {
            tractLayer.remove();
            densLayer.remove();
            whiteLayer.remove();
            maleLayer.remove();
            popLayer.remove();
            whiteLayer.addTo(mymap);
        } else if (document.getElementById("popwhite").checked == false) {
            whiteLayer.remove();
        };
    });
    $('#popmale').change(function() {
        if (document.getElementById("popmale").checked == true) {
            tractLayer.remove();
            densLayer.remove();
            whiteLayer.remove();
            maleLayer.remove();
            popLayer.remove();
            maleLayer.addTo(mymap);
        } else if (document.getElementById("popmale").checked == false) {
            maleLayer.remove();
        };
    });
    $('#POP2010').change(function() {
        if (document.getElementById("POP2010").checked == true) {
            tractLayer.remove();
            densLayer.remove();
            whiteLayer.remove();
            maleLayer.remove();
            popLayer.remove();
            popLayer.addTo(mymap);
        } else if (document.getElementById("POP2010").checked == false) {
            popLayer.remove();
        };
    });
    $('#default').change(function() {
        if (document.getElementById("default").checked == true) {
            tractLayer.remove();
            densLayer.remove();
            whiteLayer.remove();
            maleLayer.remove();
            popLayer.remove();
            tractLayer.addTo(mymap);
        } else if (document.getElementById("default").checked == false) {
            tractLayer.remove();
        };
    });
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
        fillColor: "#238B45",
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
        color: "#000000",
        fillOpacity: 0.3
    };
}
function densstyle(feature) {
    return {
        fillColor: getDensColor(feature.properties.log_dens),
        weight: .2,
        opacity: 1,
        color: "#000000",
        fillOpacity: 0.7
    };
}
function whitestyle(feature) {
    return {
        fillColor: getWhiteColor(feature.properties.PercWhite),
        weight: .2,
        opacity: 1,
        color: "#000000",
        fillOpacity: 0.7
    };
}
function malestyle(feature) {
    return {
        fillColor: getMaleColor(feature.properties.PercMale),
        weight: .2,
        opacity: 1,
        color: "#000000",
        fillOpacity: 0.7
    };
}
function popstyle(feature) {
    return {
        fillColor: getPopColor(feature.properties.POP2010),
        weight: .2,
        opacity: 1,
        color: "#000000",
        fillOpacity: 0.7
    };
}
function diststyle(feature) {
    return {
        fillColor: getDistColor(feature.properties.dist),
        weight: .2,
        opacity: 1,
        color: "#000000",
        fillOpacity: 0.7
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
    return d <= -6.198 ? "#1A9850" :
        d <= -4.301 ? "#66BD63" :
            d <= -3.356 ? "#A6D96A" :
                d <= -2.677 ? "#D9EF8B" :
                    d <= -2.273 ? "#FFFFBF" :
                        d <= -1.684 ? "#FEE08B" :
                            d <= -0.514 ? "#FDAE61" :
                                d <= 1.843 ? "#F46D43" :
                                    "#D73027" ;
}
//Male
function getMaleColor(d) {
    return d <= 46.96 ? "#FFFFD9" :
        d <= 48.23 ? "#EDF8B1" :
            d <= 49.14 ? "#C7E9B4" :
                d <= 49.92 ? "#7FCDBB" :
                    d <= 50.75 ? "#41B6C4" :
                        d <= 52.05 ? "#1D91C0" :
                            d <= 59.29 ? "#225EA8" :
                                d <= 67.34 ? "#253494" :
                                    "#081D58" ;
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
    return d <= 2690 ? "#FFFFCC" :
        d <= 3385 ? "#FFEDA0" :
            d <= 3971 ? "#FED976" :
                d <= 4513 ? "#FEB24C" :
                    d <= 5017 ? "#FD8D3C" :
                        d <= 5495 ? "#FC4E2A" :
                            d <= 6198 ? "#E31A1C" :
                                d <= 7323 ? "#BD0026" :
                                    "#800026" ;
}
//END OF STYLE FUNCTIONS

$(document).ready(() => {
    $('#modal').modal('show');
    $('#MybtnModal').click(function(){
	$('#modal').modal('show')
    });
    createMap();
});