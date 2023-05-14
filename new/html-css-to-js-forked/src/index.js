import axios from "axios";

const cityInput = document.querySelector("#city-input");
const cityElement = document.querySelector("#city");
const temperatureElement = document.querySelector("#temperature");
const dateElement = document.querySelector("#date");

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();

  cityElement.innerHTML = cityInput.value;
  showTemperatureWithSearch();
}

function convertToFahrenheit(event) {
  event.preventDefault();
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  temperatureElement.innerHTML = 19;
}

// Feature #1
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Feature #2
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let searchFormWithCurrent = document.querySelector("#current-location-button");
searchFormWithCurrent.addEventListener("click", showTemperatureWithCurrent);

// Bonus Feature
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

////////////////////////////////

const url = "https://api.openweathermap.org/data/2.5/weather";

let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
let latitude = "";
let longitude = "";
let temperature = "";

async function showTemperatureWithSearch() {
  if (!cityInput.value) {
    return;
  }
  const response = await axios.get(url, {
    params: {
      q: cityInput.value,
      appid: apiKey,
      units: "metric"
    }
  });
  temperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(temperature);
}

function handleCoordinates(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  showTemperatureWithCurrent();
}

navigator.geolocation.getCurrentPosition(handleCoordinates);

async function showTemperatureWithCurrent(event) {
  const response = await axios.get(url, {
    params: {
      lat: latitude,
      lon: longitude,
      appid: apiKey,
      units: "metric"
    }
  });
  temperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.name;
}
