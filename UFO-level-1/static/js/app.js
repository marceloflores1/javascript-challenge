// Importing from data.js
var tableData = data;

// Selecting 
var form = d3.select("#filters");
var filterButton = d3.select("#filter-btn");
var allButton = d3.select("#all-btn");
var clearButton = d3.select("#clear-btn");
var cityDropdown = d3.select("#city-dropdown");
var stateDropdown = d3.select("#state-dropdown");
var countryDropdown = d3.select("#country-dropdown");
var shapeDropdown = d3.select("#shape-dropdown");

// Adding dropdown lists

var cities = tableData.map(ufo => ufo.city);
var uniqueCities = cities.filter(onlyUnique).sort();
uniqueCities.forEach(cityName => {
    cityDropdown.append("li").append("a").attr("id", "city-dropdown-item").text(cityName);
});

var states = tableData.map(ufo => ufo.state);
var uniqueStates = states.filter(onlyUnique).sort();
uniqueStates.forEach(stateName => {
    stateDropdown.append("li").append("a").attr("id", "state-dropdown-item").text(stateName);
});

var countries = tableData.map(ufo => ufo.country);
var uniqueCountries = countries.filter(onlyUnique).sort();
uniqueCountries.forEach(countryName => {
    countryDropdown.append("li").append("a").attr("id", "country-dropdown-item").text(countryName);
});

var shapes = tableData.map(ufo => ufo.shape);
var uniqueShapes = shapes.filter(onlyUnique).sort();
uniqueShapes.forEach(shapeName => {
    shapeDropdown.append("li").append("a").attr("id", "shape-dropdown-item").text(shapeName);
});

// Selecting 
var cityDropdownItem = d3.selectAll("#city-dropdown-item");
var stateDropdownItem = d3.selectAll("#state-dropdown-item");
var countryDropdownItem = d3.selectAll("#country-dropdown-item");
var shapeDropdownItem = d3.selectAll("#shape-dropdown-item");

// Event handlers
form.on("submit", runFilter);
filterButton.on("click", runFilter);
allButton.on("click", runAll);
clearButton.on("click", runClear);
cityDropdownItem.on("click", runCities)
stateDropdownItem.on("click", runStates)
countryDropdownItem.on("click", runCountries)
shapeDropdownItem.on("click", runShapes)

// Adding functions 

function runFilter() {
    // d3.event.preventDefault();
    var inputElement = d3.select("#datetime");
    var inputValue = inputElement.property("value");
    console.log(inputValue);
    var filteredUfo = tableData.filter(date => (date.datetime === inputValue));
    if ( filteredUfo.length !== 0 ) {
        console.log(filteredUfo);
        clearFilters();
        filterButton.attr("class", "btn-info");
        var ufoTbody = d3.select("#ufo-tbody");
        ufoTbody.html("");
        filteredUfo.forEach(ufo => {
            var row = ufoTbody.append("tr");
            row.append("td").text(ufo.datetime);
            row.append("td").text(ufo.city);
            row.append("td").text(ufo.state);
            row.append("td").text(ufo.country);
            row.append("td").text(ufo.shape);
            row.append("td").text(ufo.durationMinutes);
            row.append("td").text(ufo.comments);
        })
    } else {
        clearFilters();
        filterButton.attr("class", "btn-danger");
        console.log(`Not found`);
        var ufoTbody = d3.select("#ufo-tbody");
        ufoTbody.html("");
        ufoTbody.append("h3").text(`The date selected ( ${inputValue} ) was not found. Please try the following dates:`);
        var firstOne = 0;
        var lastOne = 0;
        tableData.forEach(ufo => {
            firstOne += 1;
            if ( firstOne === 1 ) {
                ufoTbody.append("h5").text(ufo.datetime);
            } else if ( lastOne !== ufo.datetime ) {
                ufoTbody.append("h5").text(ufo.datetime);
            }
            lastOne = ufo.datetime;
        })
    }
};

function runAll() {
    console.log(`Returning all values`);
    console.log(tableData);
    var ufoTbody = d3.select("#ufo-tbody");
    ufoTbody.html("");
    tableData.forEach(ufo => {
        var row = ufoTbody.append("tr");
        row.append("td").text(ufo.datetime);
        row.append("td").text(ufo.city);
        row.append("td").text(ufo.state);
        row.append("td").text(ufo.country);
        row.append("td").text(ufo.shape);
        row.append("td").text(ufo.durationMinutes);
        row.append("td").text(ufo.comments);
    })
    clearFilters();
    allButton.attr("class", "btn-info");
};

function runClear() {
    console.log(`Clear screen`);
    var ufoTbody = d3.select("#ufo-tbody");
    ufoTbody.html("");
    clearFilters();
};

function runCities() {
    console.log(`Filtering by city`);
    var ufoTbody = d3.select("#ufo-tbody");
    ufoTbody.html("");
    var inputSelected = d3.select(this);
    var selectedCity = inputSelected.text();
    var filteredCity = tableData.filter(ufo => (ufo.city === selectedCity))
    console.log(selectedCity);
    var ufoTbody = d3.select("#ufo-tbody");
    ufoTbody.html("");
    filteredCity.forEach(ufo => {
        var row = ufoTbody.append("tr");
        row.append("td").text(ufo.datetime);
        row.append("td").text(ufo.city);
        row.append("td").text(ufo.state);
        row.append("td").text(ufo.country);
        row.append("td").text(ufo.shape);
        row.append("td").text(ufo.durationMinutes);
        row.append("td").text(ufo.comments);
    })  
    clearFilters();
    d3.select("#city-button").text(selectedCity).style("text-transform", "capitalize").attr("class", "btn-info");
};

function runStates() {
    console.log(`Filtering by state`);
    var ufoTbody = d3.select("#ufo-tbody");
    ufoTbody.html("");
    var inputSelected = d3.select(this);
    var selectedState = inputSelected.text();
    var filteredState = tableData.filter(ufo => (ufo.state === selectedState))
    console.log(selectedState);
    var ufoTbody = d3.select("#ufo-tbody");
    ufoTbody.html("");
    filteredState.forEach(ufo => {
        var row = ufoTbody.append("tr");
        row.append("td").text(ufo.datetime);
        row.append("td").text(ufo.city);
        row.append("td").text(ufo.state);
        row.append("td").text(ufo.country);
        row.append("td").text(ufo.shape);
        row.append("td").text(ufo.durationMinutes);
        row.append("td").text(ufo.comments);
    })    
    clearFilters();
    d3.select("#state-button").text(selectedState).style("text-transform", "capitalize").attr("class", "btn-info");
};

function runCountries() {
    console.log(`Filtering by country`);
    var ufoTbody = d3.select("#ufo-tbody");
    ufoTbody.html("");
    var inputSelected = d3.select(this);
    var selectedCountry = inputSelected.text();
    var filteredCountry = tableData.filter(ufo => (ufo.country === selectedCountry))
    console.log(selectedCountry);
    var ufoTbody = d3.select("#ufo-tbody");
    ufoTbody.html("");
    filteredCountry.forEach(ufo => {
        var row = ufoTbody.append("tr");
        row.append("td").text(ufo.datetime);
        row.append("td").text(ufo.city);
        row.append("td").text(ufo.state);
        row.append("td").text(ufo.country);
        row.append("td").text(ufo.shape);
        row.append("td").text(ufo.durationMinutes);
        row.append("td").text(ufo.comments);
    })    
    clearFilters();
    d3.select("#country-button").text(selectedCountry).style("text-transform", "capitalize").attr("class", "btn-info");
};

function runShapes() {
    console.log(`Filtering by shape`);
    var ufoTbody = d3.select("#ufo-tbody");
    ufoTbody.html("");
    var inputSelected = d3.select(this);
    var selectedShape = inputSelected.text();
    var filteredShape = tableData.filter(ufo => (ufo.shape === selectedShape))
    console.log(selectedShape);
    var ufoTbody = d3.select("#ufo-tbody");
    ufoTbody.html("");
    filteredShape.forEach(ufo => {
        var row = ufoTbody.append("tr");
        row.append("td").text(ufo.datetime);
        row.append("td").text(ufo.city);
        row.append("td").text(ufo.state);
        row.append("td").text(ufo.country);
        row.append("td").text(ufo.shape);
        row.append("td").text(ufo.durationMinutes);
        row.append("td").text(ufo.comments);
    })    
    clearFilters();
    d3.select("#shape-button").text(selectedShape).style("text-transform", "capitalize").attr("class", "btn-info");
};

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
};

function clearFilters() {
    d3.select("#city-button").text("City").attr("class", "btn-default");
    d3.select("#state-button").text("State").attr("class", "btn-default");
    d3.select("#country-button").text("Country").attr("class", "btn-default");
    d3.select("#shape-button").text("Shape").attr("class", "btn-default");
    allButton.attr("class", "btn-default");
    filterButton.attr("class", "btn-default");
    clearButton.attr("class", "btn-default");
};

clearFilters();