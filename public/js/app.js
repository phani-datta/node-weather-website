const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const locationData = document.querySelector("#locationDataID");
const weatherSky = document.querySelector("#weatherSkyID");
const weatherSkyData = document.querySelector("#weatherSkyDataID");
const currentTemp = document.querySelector("#currentTempID");
const currentTempData = document.querySelector("#currentTempDataID");
const feelsLikeTemp = document.querySelector("#feelsLikeTempID");
const feelsLikeTempData = document.querySelector("#feelsLikeTempDataID");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  locationData.textContent = "Loading...";

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        locationData.textContent = data.error;
      } else {
        locationData.textContent = data.location;
        weatherSky.textContent = "Weather";
        weatherSkyData.textContent =
          ": " + data.weather.charAt(0).toUpperCase() + data.weather.slice(1);
        currentTemp.textContent = "Current";
        currentTempData.textContent = ": " + data.current_temp + "\xB0C";
        feelsLikeTemp.textContent = "Feels like";
        feelsLikeTempData.textContent = ": " + data.feels_like_temp + "\xB0C";
      }
    });
  });
});
