const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Calling the express function
const app = express();
const port = process.env.PORT || 3000;

// Defining paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine & views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Phani Datta Reddy YH",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Phani Datta Reddy YH",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Phani Datta Reddy YH",
    helpText: "Please contact the service operator",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(
        latitude,
        longitude,
        (error, { weather, current_temp, feels_like_temp } = {}) => {
          if (error) {
            return res.send({ error });
          }
          res.send({
            // forecast: forecastData,
            weather,
            current_temp,
            feels_like_temp,
            location,
            address: req.query.address,
          });
        }
      );
    }
  );

  // res.send({
  //   address: req.query.address,
  // });
});

app.get("", (req, res) => {});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Phani Datta Reddy YH",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
