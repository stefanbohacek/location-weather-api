/*
  yourapp.glitch.me/weather
*/

var express = require("express"),
  router = express.Router(),
  request = require("request"),
  authMiddleware = require("../middleware/authentication.js");

router.get("/", authMiddleware(), function (req, res) {
  let returnData = {
      weather: {},
      location: {},
    },
    ipAddress = req.headers["x-forwarded-for"] || req.connection.remoteAddress,
    tempUnits = req.query.units || req.body.units || "imperial";

  if (ipAddress.indexOf(",") > -1) {
    ipAddress = ipAddress.split(",")[0];
  }

  console.log(`Loading weather information for ${ipAddress}...`);

  const ipApiUrl = `http://ip-api.com/json/${ipAddress}`;

  request(ipApiUrl, function (ipApiErr, ipApiRes, ipApiBody) {
    if (!ipApiErr) {
      try {
        const ipInfo = JSON.parse(ipApiBody),
          lat = ipInfo.lat,
          lon = ipInfo.lon;

        returnData.location = ipInfo;

        const owmApiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${ipInfo.lat}&lon=${ipInfo.lon}&units=${tempUnits}&APPID=${process.env.OWM_APP_ID}`;

        request(owmApiUrl, function (owmApiErr, owmApiRes, owmApiBody) {
          if (!owmApiErr) {
            try {
              returnData.weather = JSON.parse(owmApiBody);
            } catch (err) {
              /* noop */
            }
          }
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(returnData));
        });
      } catch (err) {
        res.setHeader("Content-Type", "application/json");
        res.status(500);
        res.end(
          JSON.stringify({
            error: err,
          })
        );
      }
    }
  });
});

module.exports = router;
