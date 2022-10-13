//required imports
var express = require("express");
var cors = require("cors");

//create an instance of express for the app and instantiate bodyParser and cors
var app = module.exports = express();
app.use(cors());

/*set view/index.html to display by default and link to assets in public i.e. .js and .css files*/
app.use(express.static('public'));
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
/**/

/*Date parser*/
function parseDate(date) {
  if(isNaN(date)) {
  // Handle natural date string
    var milliseconds = Date.parse(date);
    //check for invalid date strings. milliseconds: no of milliseconds from 01.01.1970.
    if (isNaN(milliseconds)) {
      return false;
    } else {
      return new Date(milliseconds);
    }
  } else {
    // Handle as unix epoch time. Converting our unix timestamp from seconds to millis (millis expected);
    return new Date(parseInt(date) * 1000);
  }
}
/* --End date parser-- */

//GET call to return JSON that formats natural and unix dates
app.get("/:dateVal", function(req,res,next) {
  var dateVal = req.params.dateVal;
  dateVal = dateVal.length == 0 ? new Date() : dateVal;
  var parsedDate = parseDate(dateVal);
  
  if(parsedDate) {
    var unixDate = (parsedDate.getTime() / 1000);
    var naturalTime = parsedDate.toUTCString();
    res.json({"unix": unixDate, "utc" : naturalTime });
  } else {
    res.json({"error" : "Invalid Date" });
  }
});

//npm install --save -g nodemon
//Installed nodemon package for debugging. Changes updated in code are run automatically on terminal once file is saved
app.listen(3000, function(req,res,next) {
    console.log("/\\.. Working");
});
