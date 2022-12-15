//Current Time Feature
let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[currentTime.getMonth()];
let year = currentTime.getFullYear();
let milliseconds = currentTime.getMilliseconds();
let seconds = currentTime.getSeconds();
let time = currentTime.getTime();
let date = currentTime.getDate();
let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let heading = document.querySelector("#current-time");
heading.innerHTML = `${hour}:${minutes}`;

let secondHeading = document.querySelector("#current-date");
secondHeading.innerHTML = `${day}, ${date} ${month} ${year}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

//Forecast predictions
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" width="40" />
              <div class="forecast-temp">
                <span class="forecast-temp-max">${Math.round(
                  forecastDay.temp.max
                )}°C </span>
                <span class="forecast-temp-min"> ${Math.round(
                  forecastDay.temp.min
                )}°C</span>
              </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "aa09763d916df0424c840d55bfc2d2c9";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//Open Weather Map Feature
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let paragraph = document.querySelector("#current-city");
  paragraph.innerHTML = `${cityInput.value}`;
  let apiKey = "aa09763d916df0424c840d55bfc2d2c9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let weather = response.data.weather[0].description;
  let humidity = document.querySelector("#humid");
  let degrees = document.querySelector("#current-temp");
  let wind = document.querySelector("#windy");
  let location = document.querySelector("#current-city");
  let iconElement = document.querySelector("#icon");
  let description = document.querySelector("#current-weather");

  celsiusTemperature = response.data.main.temp;

  degrees.innerHTML = `${temperature}`;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  location.innerHTML = `${city}`;
  description.innerHTML = `${weather}`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

//Current Location Feature
function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "aa09763d916df0424c840d55bfc2d2c9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//Change Temperature Units Feature
let celsiusTemperature = null;

function showCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let celsiusLink = document.querySelector("#current-temp");
  celsiusLink.innerHTML = Math.round(celsiusTemperature);
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelsius);

function showFahrenheit(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitLink = document.querySelector("#current-temp");
  fahrenheitLink.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheit);
