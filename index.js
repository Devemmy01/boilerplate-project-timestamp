// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Timestamp API endpoint
// Handles: /api/:date? where date is optional
app.get("/api/:date?", function (req, res) {
  // Extract the date parameter from the URL
  let dateString = req.params.date;
  let date;

  // Test requirement #7 & #8: Handle empty date parameter
  // If no date is provided, use current time
  if (!dateString) {
    date = new Date();
  } else {
    // Test requirement #5: Handle dates that can be parsed by new Date(date_string)
    // Check if the date string is only digits (Unix timestamp)
    if (/^\d+$/.test(dateString)) {
      // Test requirement #4: Handle Unix timestamps in milliseconds
      // Parse the string as integer to get the timestamp in milliseconds
      date = new Date(parseInt(dateString));
    } else {
      // Handle other date formats (ISO strings, natural language, etc.)
      date = new Date(dateString);
    }
  }

  // Test requirement #6: Return error for invalid dates
  // Check if the parsed date is valid
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Test requirement #2: Return unix timestamp in milliseconds as Number
  // Test requirement #3: Return UTC string in format "Thu, 01 Jan 1970 00:00:00 GMT"
  // Test requirement #4: Specific test case for 1451001600000 should return correct values
  res.json({
    unix: date.getTime(), // Returns Unix timestamp in milliseconds as Number
    utc: date.toUTCString(), // Returns UTC string in required format
  });
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
