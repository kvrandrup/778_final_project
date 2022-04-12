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

//functions for within each onEachFeature function
//highlight selected feature -- same for all
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
//resetting highlight
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
function resetIncomeHighlight(e) {
    var layer = e.target
    layer.setStyle({
        fillColor: getIncomeColor(layer.feature.properties.med_income),
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
//differentiating popups for each display choice
function createPopup(e) {
    var percMaleVal = Math.round(e.target.feature.properties.PercMale * 100)/100;
    var percWhiteVal = Math.round(e.target.feature.properties.PercWhite * 100)/100;
    var popDensVal = Math.round(e.target.feature.properties.PopDens * 1000000)/1000000;
    var totalArea = Math.round(e.target.feature.properties.area * 0.00000038610 * 100 * 100)/100;
    var parkArea = Math.round(e.target.feature.properties.park_area * 100)/100;
    var trailDist = Math.round(e.target.feature.properties.tr_length * 100)/100;
    var medIncome = e.target.feature.properties.med_income;
    var popupContent = "<p><b>Census Tract ID: </b>" + e.target.feature.properties.TRACT
    + "</p><p>Total Population:  " + e.target.feature.properties.POP2010 +"</p>"
        + "</p><p>Percent Male:  " + percMaleVal +"%</p>"
        + "</p><p>Percent White:  " + percWhiteVal +"%</p>"
        + "</p><p>Population Density:  " + popDensVal.toExponential() +" people/sq mi</p>"
        + "</p><p>Median Income:  " + medIncome +" $/person/year"
        + "</p><p>Total Area:  " + totalArea +" sq mi</p>"
        + "</p><p>Park Area:  " + parkArea +" sq mi</p>"
        + "</p><p>Trail Length:  " + trailDist +" mi</p>";
    e.target.bindPopup(popupContent).openPopup()
}
function createDensPopup(e) {
    var popDensVal = Math.round(e.target.feature.properties.PopDens * 1000000)/1000000;
    var totalArea = Math.round(e.target.feature.properties.area * 0.00000038610 * 100 * 100)/100;
    var parkArea = Math.round(e.target.feature.properties.park_area * 100)/100;
    var trailDist = Math.round(e.target.feature.properties.tr_length * 100)/100;
    var popupContent = "<p><b>Census Tract ID: </b>" + e.target.feature.properties.TRACT
        + "</p><p>Total Population:  " + e.target.feature.properties.POP2010 +"</p>"
        + "</p><p>Population Density:  " + popDensVal.toExponential() +" people/sq mi</p>"
        + "</p><p>Total Area:  " + totalArea +" sq mi</p>"
        + "</p><p>Park Area:  " + parkArea +" sq mi</p>"
        + "</p><p>Trail Length:  " + trailDist +" mi</p>";
    e.target.bindPopup(popupContent).openPopup()
}
function createWhitePopup(e) {
    var percWhiteVal = Math.round(e.target.feature.properties.PercWhite * 100)/100;
    var totalArea = Math.round(e.target.feature.properties.area * 0.00000038610 * 100 * 100)/100;
    var parkArea = Math.round(e.target.feature.properties.park_area * 100)/100;
    var trailDist = Math.round(e.target.feature.properties.tr_length * 100)/100;
    var popupContent = "<p><b>Census Tract ID: </b>" + e.target.feature.properties.TRACT
        + "</p><p>Total Population:  " + e.target.feature.properties.POP2010 +"</p>"
        + "</p><p>Percent White:  " + percWhiteVal +"%</p>"
        + "</p><p>Total Area:  " + totalArea +" sq mi</p>"
        + "</p><p>Park Area:  " + parkArea +" sq mi</p>"
        + "</p><p>Trail Length:  " + trailDist +" mi</p>";
    e.target.bindPopup(popupContent).openPopup()
}
function createMalePopup(e) {
    var percMaleVal = Math.round(e.target.feature.properties.PercMale * 100)/100;
    var totalArea = Math.round(e.target.feature.properties.area * 0.00000038610 * 100 * 100)/100;
    var parkArea = Math.round(e.target.feature.properties.park_area * 100)/100;
    var trailDist = Math.round(e.target.feature.properties.tr_length * 100)/100;
    var popupContent = "<p><b>Census Tract ID: </b>" + e.target.feature.properties.TRACT
        + "</p><p>Total Population:  " + e.target.feature.properties.POP2010 +"</p>"
        + "</p><p>Percent Male:  " + percMaleVal +"%</p>"
        + "</p><p>Total Area:  " + totalArea +" sq mi</p>"
        + "</p><p>Park Area:  " + parkArea +" sq mi</p>"
        + "</p><p>Trail Length:  " + trailDist +" mi</p>";
    e.target.bindPopup(popupContent).openPopup()
}
function createIncomePopup(e) {
    var medIncome = e.target.feature.properties.med_income;
    var totalArea = Math.round(e.target.feature.properties.area * 0.00000038610 * 100 * 100)/100;
    var parkArea = Math.round(e.target.feature.properties.park_area * 100)/100;
    var trailDist = Math.round(e.target.feature.properties.tr_length * 100)/100;
    var popupContent = "<p><b>Census Tract ID: </b>" + e.target.feature.properties.TRACT
        + "</p><p>Total Population:  " + e.target.feature.properties.POP2010 +"</p>"
        + "</p><p>Median Income:  " + medIncome +" $/person/year</p>"
        + "</p><p>Total Area:  " + totalArea +" sq mi</p>"
        + "</p><p>Park Area:  " + parkArea +" sq mi</p>"
        + "</p><p>Trail Length:  " + trailDist +" mi</p>";
    e.target.bindPopup(popupContent).openPopup()
}
function createPopPopup(e) {
    var totalArea = Math.round(e.target.feature.properties.area * 0.00000038610 * 100 * 100)/100;
    var parkArea = Math.round(e.target.feature.properties.park_area * 100)/100;
    var trailDist = Math.round(e.target.feature.properties.tr_length * 100)/100;
    var popupContent = "<p><b>Census Tract ID: </b>" + e.target.feature.properties.TRACT
        + "</p><p>Total Population:  " + e.target.feature.properties.POP2010 +"</p>"
        + "</p><p>Total Area:  " + totalArea +" sq mi</p>"
        + "</p><p>Park Area:  " + parkArea +" sq mi</p>"
        + "</p><p>Trail Length:  " + trailDist +" mi</p>";
    e.target.bindPopup(popupContent).openPopup()
}
//individual onEachFeature functions
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
        click: createDensPopup
    });
}
function onEachWhiteFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetWhiteHighlight,
        click: createWhitePopup
    });
}
function onEachMaleFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetMaleHighlight,
        click: createMalePopup
    });
}
function onEachIncomeFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetIncomeHighlight,
        click: createIncomePopup
    });
}
function onEachPopFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetPopHighlight,
        click: createPopPopup
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
function createParkSymbols(data, mymap){
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
function createTrailSymbols(data, mymap){
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

//create legends -- no legend for default display
var densLegend = L.control({position: 'bottomright'});
densLegend.onAdd = function (mymap) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [-10, -6.198, -4.301, -3.356, -2.677, -2.273, -1.684, -0.514, 1.843],
        labels = ['<strong> Population Density </strong>' + '<br>' + 'expressed as the log of raw denisty'];
    div.innerHTML = labels.join('<br>') + ' <br>';
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getDensColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? " "+'&ndash;' + " " + grades[i + 1] + ' <br>' : '+');
    }
    return div;
};
//white legend
var whiteLegend = L.control({position: 'bottomright'});
whiteLegend.onAdd = function (mymap) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 30.88, 47.33, 57.26, 65.59, 75.07, 80.98, 87.07, 94.78],
        labels = ['<strong> % White Population </strong>'];
    div.innerHTML = labels.join('<br>') + ' <br>';
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getWhiteColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? " "+'&ndash;' + " " + grades[i + 1] + ' <br>' : '+');
    }
    return div;
};
//male legend
var maleLegend = L.control({position: 'bottomright'});
maleLegend.onAdd = function (mymap) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 46.96, 48.23, 49.14, 49.92, 50.75, 52.05, 59.29, 67.34],
        labels = ['<strong> % Male Population </strong>'];
    div.innerHTML = labels.join('<br>') + ' <br>';
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getMaleColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? " "+'&ndash;' + " " + grades[i + 1] + ' <br>' : '+');
    }
    return div;
};
//median income legend
var incomeLegend = L.control({position: 'bottomright'});
incomeLegend.onAdd = function (mymap) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [10000, 20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000, 180000],
        labels = ['<strong> Median Annual Income </strong>' + '<br>' + '$/person' + '<br>' + 'no-data tracts represented in red'];
    div.innerHTML = labels.join('<br>') + ' <br>';
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getIncomeColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? " "+'&ndash;' + " " + grades[i + 1] + ' <br>' : '+');
    }
    return div;
};
//raw population legend
var popLegend = L.control({position: 'bottomright'});
popLegend.onAdd = function (mymap) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 2690, 3385, 3971, 4513, 5017, 5495, 6198, 7323],
        labels = ['<strong> 2010 Tract Population </strong>'];
    div.innerHTML = labels.join('<br>') + ' <br>';
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getPopColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? " "+'&ndash;' + " " + grades[i + 1] + ' <br>' : '+');
    }
    return div;
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
function createTractSymbols(data, mymap){
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
    var incomeLayer = L.geoJson(data, {
        style: incomestyle,
        onEachFeature: onEachIncomeFeature
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
            incomeLayer.remove();
            popLayer.remove();
            densLayer.addTo(mymap);
            densLegend.remove();
            whiteLegend.remove();
            maleLegend.remove();
            incomeLegend.remove();
            popLegend.remove();
            densLegend.addTo(mymap);
        } else if (document.getElementById("popdens").checked == false) {
            densLayer.remove();
            densLegend.remove();
        };
    });
    $('#popwhite').change(function() {
        if (document.getElementById("popwhite").checked == true) {
            tractLayer.remove();
            densLayer.remove();
            whiteLayer.remove();
            maleLayer.remove();
            incomeLayer.remove();
            popLayer.remove();
            whiteLayer.addTo(mymap);
            densLegend.remove();
            whiteLegend.remove();
            maleLegend.remove();
            incomeLegend.remove();
            popLegend.remove();
            whiteLegend.addTo(mymap);
        } else if (document.getElementById("popwhite").checked == false) {
            whiteLayer.remove();
            whiteLegend.remove();
        };
    });
    $('#popmale').change(function() {
        if (document.getElementById("popmale").checked == true) {
            tractLayer.remove();
            densLayer.remove();
            whiteLayer.remove();
            maleLayer.remove();
            incomeLayer.remove();
            popLayer.remove();
            maleLayer.addTo(mymap);
            densLegend.remove();
            whiteLegend.remove();
            maleLegend.remove();
            incomeLegend.remove();
            popLegend.remove();
            maleLegend.addTo(mymap);
        } else if (document.getElementById("popmale").checked == false) {
            maleLayer.remove();
            maleLegend.remove();
        };
    });
    $('#medincome').change(function() {
        if (document.getElementById("medincome").checked == true) {
            tractLayer.remove();
            densLayer.remove();
            whiteLayer.remove();
            maleLayer.remove();
            incomeLayer.remove();
            popLayer.remove();
            incomeLayer.addTo(mymap);
            densLegend.remove();
            whiteLegend.remove();
            maleLegend.remove();
            incomeLegend.remove();
            popLegend.remove();
            incomeLegend.addTo(mymap);
        } else if (document.getElementById("POP2010").checked == false) {
            incomeLayer.remove();
            incomeLegend.remove();
        };
    });
    $('#POP2010').change(function() {
        if (document.getElementById("POP2010").checked == true) {
            tractLayer.remove();
            densLayer.remove();
            whiteLayer.remove();
            maleLayer.remove();
            incomeLayer.remove();
            popLayer.remove();
            popLayer.addTo(mymap);
            densLegend.remove();
            whiteLegend.remove();
            maleLegend.remove();
            incomeLegend.remove();
            popLegend.remove();
            popLegend.addTo(mymap);
        } else if (document.getElementById("POP2010").checked == false) {
            popLayer.remove();
            popLegend.remove();
        };
    });
    $('#default').change(function() {
        if (document.getElementById("default").checked == true) {
            tractLayer.remove();
            densLayer.remove();
            whiteLayer.remove();
            maleLayer.remove();
            incomeLayer.remove();
            popLayer.remove();
            tractLayer.addTo(mymap);
            densLegend.remove();
            whiteLegend.remove();
            maleLegend.remove();
            incomeLegend.remove();
            popLegend.remove();
        } else if (document.getElementById("default").checked == false) {
            tractLayer.remove();
        };
    });
};

//function to retrieve the park data and place it on the map
function getTractData(mymap){
    //load the data
    $.ajax("data/census_tract_formatted.geojson", {
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
function createParkDistSymbols(data, mymap){
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
function incomestyle(feature) {
    return {
        fillColor: getIncomeColor(feature.properties.med_income),
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
    return d <= 30.88 ? "#4D004B" :
        d <= 47.33 ? "#810F7C" :
            d <= 57.26 ? "#88419D" :
                d <= 65.59 ? "#8C6BB1" :
                    d <= 75.07 ? "#8C96C6" :
                        d <= 80.98 ? "#9EBCDA" :
                            d <= 87.07 ? "#BFD3E6" :
                                d <= 94.78 ? "#E0ECF4" :
                                    "#F7FCFD" ;
}
//Median Income
function getIncomeColor(d) {
    return d == 0 ? "#CB181D" :
        d <= 20000 ? "#FFFFE5" :
            d <= 40000 ? "#F7FCB9" :
                d <= 60000 ? "#D9F0A3" :
                    d <= 80000 ? "#ADDD8E" :
                        d <= 100000 ? "#78C679" :
                            d <= 120000 ? "#41AB5D" :
                                d <= 140000 ? "#238443" :
                                    d<= 160000 ? "#006837" :
                                        d <= 180000 ? "#004529" :
                                            "#000000" ;
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
    $('#MybtnInfoModal').click(function(){
        $('#infomodal').modal('show')
    });
    createMap();
});