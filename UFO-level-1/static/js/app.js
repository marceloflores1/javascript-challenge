// Importing from data.js
var tableData = data;

// Selecting 
var form = d3.select("#filters");
var filterButton = d3.select("#filter-btn");
var allButton = d3.select("#all-btn");
var clearButton = d3.select("#clear-btn");

// Event handlers
form.on("submit", runFilter);
filterButton.on("click", runFilter);
allButton.on("click", runAll);
clearButton.on("click", runClear);


// Function runFilter
function runFilter() {
    // d3.event.preventDefault();

    var inputElement = d3.select("#datetime");

    var inputValue = inputElement.property("value");

    console.log(inputValue);

    var filteredUfo = tableData.filter(date => (date.datetime === inputValue));

    if ( filteredUfo.length !== 0 ) {
        console.log(filteredUfo);
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
        console.log(`Not found`);
        var ufoTbody = d3.select("#ufo-tbody");
        ufoTbody.html("");
    }
}

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
}

function runClear() {
    console.log(`Clear screen`);
    var ufoTbody = d3.select("#ufo-tbody");
    ufoTbody.html("");
}
