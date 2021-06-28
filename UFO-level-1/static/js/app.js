// Importing from data.js
var tableData = data;

// Selecting 
var dateInput = d3.select("#filters");
var filterButton = d3.select("#filter-btn");
var allButton = d3.select("#all-btn");
var clearButton = d3.select("#clear-btn");
var cityDropdown = d3.select("#city-dropdown");
var stateDropdown = d3.select("#state-dropdown");
var countryDropdown = d3.select("#country-dropdown");
var shapeDropdown = d3.select("#shape-dropdown");

// Adding dropdown lists
var cities = tableData.map(ufo => ufo.city);
var uniqueCities = cities.filter(uniqueFilter).sort();
uniqueCities.forEach(cityName => {
    cityDropdown.append("li").append("a").attr("id", "city-dropdown-item").text(cityName);
});

var states = tableData.map(ufo => ufo.state);
var uniqueStates = states.filter(uniqueFilter).sort();
uniqueStates.forEach(stateName => {
    stateDropdown.append("li").append("a").attr("id", "state-dropdown-item").text(stateName);
});

var countries = tableData.map(ufo => ufo.country);
var uniqueCountries = countries.filter(uniqueFilter).sort();
uniqueCountries.forEach(countryName => {
    countryDropdown.append("li").append("a").attr("id", "country-dropdown-item").text(countryName);
});

var shapes = tableData.map(ufo => ufo.shape);
var uniqueShapes = shapes.filter(uniqueFilter).sort();
uniqueShapes.forEach(shapeName => {
    shapeDropdown.append("li").append("a").attr("id", "shape-dropdown-item").text(shapeName);
});

// Selecting all
var cityDropdownItem = d3.selectAll("#city-dropdown-item");
var stateDropdownItem = d3.selectAll("#state-dropdown-item");
var countryDropdownItem = d3.selectAll("#country-dropdown-item");
var shapeDropdownItem = d3.selectAll("#shape-dropdown-item");

// Event handlers
dateInput.on("submit", runFilter);
filterButton.on("click", runFilter);
allButton.on("click", runAll);
clearButton.on("click", runClear);
cityDropdownItem.on("click", runCities)
stateDropdownItem.on("click", runStates)
countryDropdownItem.on("click", runCountries)
shapeDropdownItem.on("click", runShapes)

// Adding functions 
function runFilter() {
  //  d3.event.preventDefault();
    var textInput = d3.select("#datetime").property("value");
    var cityInput = d3.select("#city-button").text();
    var stateInput = d3.select("#state-button").text();
    var countryInput = d3.select("#country-button").text();
    var shapeInput = d3.select("#shape-button").text();
    var filterItems = {"datetime":textInput, "city":cityInput, "state":stateInput, "country":countryInput, "shape":shapeInput};
    var filteredResults = tableData;
    Object.entries(filterItems).forEach(([key, value]) => {
        if (value !== 0 && value !== "" && value !== "City" && value !== "State" && value !== "Country" && value !== "Shape") {
            filteredResults = filteredResults.filter(ufo => ufo[key] === value);
        }
    })
    if ( filteredResults === tableData) {
        filterButton.attr("class", "btn-warning");
        var ufoTbody = d3.select("#ufo-tbody");
        ufoTbody.html("");
        ufoTbody.append("h3").text(`It looks like you have not selected any filters...`);    
        allButton.attr("class", "btn-default");
    } else if ( filteredResults.length !== 0 ) {
        filterButton.attr("class", "btn-success");
        dataPrinter(filteredResults);
    } else {
        runError();
    }
};

function runError() {
    filterButton.attr("class", "btn-danger");
    var ufoTbody = d3.select("#ufo-tbody");
    ufoTbody.html("");
    ufoTbody.append("h3").text(`There is no data for the filters selected.`);    
}

function runAll() {
    dataPrinter(tableData);
    clearFilters();
    allButton.attr("class", "btn-info");

};

function runClear() {
    var ufoTbody = d3.select("#ufo-tbody");
    ufoTbody.html("");
    clearFilters();
};

function runCities() {
    var inputSelected = d3.select(this);
    var selectedCity = inputSelected.text();
    d3.select("#city-button").text(selectedCity).style("text-transform", "capitalize").attr("class", "btn-info");
    allButton.attr("class", "btn-default");
};

function runStates() {
    var inputSelected = d3.select(this);
    var selectedState = inputSelected.text();
    d3.select("#state-button").text(selectedState).style("text-transform", "capitalize").attr("class", "btn-info");
    allButton.attr("class", "btn-default");
};

function runCountries() {
    var inputSelected = d3.select(this);
    var selectedCountry = inputSelected.text();
    d3.select("#country-button").text(selectedCountry).style("text-transform", "capitalize").attr("class", "btn-info");
    allButton.attr("class", "btn-default");
};

function runShapes() {
    var inputSelected = d3.select(this);
    var selectedShape = inputSelected.text();
    d3.select("#shape-button").text(selectedShape).style("text-transform", "capitalize").attr("class", "btn-info");
    allButton.attr("class", "btn-default");
};

function uniqueFilter(value, index, self) {
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
    d3.select('#datetime').property("value", "");
};

function dataPrinter(list) {
    var ufoTbody = d3.select("#ufo-tbody");
    ufoTbody.html("");
    list.forEach(ufo => {
        var row = ufoTbody.append("tr");
        row.append("td").text(ufo.datetime);
        row.append("td").text(ufo.city);
        row.append("td").text(ufo.state);
        row.append("td").text(ufo.country);
        row.append("td").text(ufo.shape);
        row.append("td").text(ufo.durationMinutes);
        row.append("td").text(ufo.comments);
    })    
};

clearFilters();

