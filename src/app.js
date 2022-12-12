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

let heading = document.querySelector("#current-time");
heading.innerHTML = `${hour}:${minutes}`;

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

  let degrees = document.querySelector("#current-temp");
  degrees.innerHTML = `${temperature}`;
  let location = document.querySelector("#current-city");
  location.innerHTML = `${city}`;
  let description = document.querySelector("#current-weather");
  description.innerHTML = `${weather}`;
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
