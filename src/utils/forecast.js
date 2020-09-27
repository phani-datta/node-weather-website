const request = require("postman-request");

const forecast = (lat, lon, callback) => {
  const url =
    "http://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=7ff4ddfc0bbfb121bbfd38bbf572eb62&units=metric";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to the location services", undefined);
    } else if (body.message) {
      callback(
        "Unable to find the coordinates. Try another search.",
        undefined
      );
    } else {
      callback(undefined, {
        weather: body.weather[0].description,
        current_temp: body.main.temp,
        feels_like_temp: body.main.temp_min,
      });
    }
  });
};

module.exports = forecast;
