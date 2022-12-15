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
let hour = currentTime.getHours();
let minutes = currentTime.getMinutes();
let year = currentTime.getFullYear();
let date = currentTime.getDate();
let milliseconds = currentTime.getMilliseconds();
let seconds = currentTime.getSeconds();
let time = currentTime.getTime();

let heading = document.querySelector("#current-time");
heading.innerHTML = `${hour}:${minutes}:${seconds}`;

let secondHeading = document.querySelector("#current-date");
secondHeading.innerHTML = `${day}, ${date} ${month} ${year}`;

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
navigator.geolocation.getCurrentPosition(retrievePosition);

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
