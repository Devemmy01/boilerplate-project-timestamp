const express = require("express");
const path = require("path");
const app = express();

// Serve static files from public
app.use(express.static(path.join(__dirname, "public")));

// API endpoint for timestamp conversion
// Handles: /api/:date? where date is optional
app.get("/api/:date?", (req, res) => {
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

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
