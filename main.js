const api = {
  key: "a01fee2d80b973ab3b18ce1990905e04",
  base: "https://api.openweathermap.org/data/2.5/",
  fiveDay: "https://api.openweathermap.org/data/2.5/forecast/"
}

const defaultCity = "Austin"

const stateSelector = document.getElementById("state");
const state = stateSelector.value;

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

const showDefault5day = document.querySelector('.title');
showDefault5day.addEventListener('click', defaultFiveDay);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    getFiveDay(searchbox.value);
  }
}

function getResults(cityName) {
  fetch(`${api.base}weather?q=${cityName}&units=imperial&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function loadDefaultCity() {
  fetch(`${api.base}weather?q=${defaultCity}&units=imperial&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function getFiveDay(cityName) {
  fetch(`${api.fiveDay}?q=${cityName},${state}&units=imperial&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
      console.log(weather);
      console.log(state);
      console.log("THIS WORKED");
    }).then(displayFiveDay);
}

function defaultFiveDay(cityName) {
  fetch(`${api.fiveDay}?q=${defaultCity}&units=imperial&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayFiveDay);
}

loadDefaultCity()

function displayFiveDay(weather) {
  console.log(state);
  let forecast = document.querySelector('.fiveDayForecast');
  forecast.innerHTML = `
  <h4 class="title">5 Day Forecast</h4>
      <div class="container">
        <div class="days">
          <div class="temp">${Math.round(weather.list[0].main.temp)}°F</div>
          <div class="weather">${weather.list[0].weather[0].description}</div>
          <div class="hi-low">${Math.round(weather.list[0].main.temp_min)}°F / ${Math.round(weather.list[0].main.temp_max)}°F</div>
        </div>
      
        <div class="days">
          <div class="temp">${Math.round(weather.list[1].main.temp)}°F</div>
          <div class="weather">${weather.list[1].weather[0].description}°F</div>
          <div class="hi-low">${Math.round(weather.list[1].main.temp_min)}°F / ${Math.round(weather.list[0].main.temp_max)}°F</div>
        </div>
      
        <div class="days">
          <div class="temp">${Math.round(weather.list[2].main.temp)}°F</div>
          <div class="weather">${weather.list[2].weather[0].description}</div>
          <div class="hi-low">${Math.round(weather.list[2].main.temp_min)}°F / ${Math.round(weather.list[0].main.temp_max)}°F</div>
        </div>
      
        <div class="days">
          <div class="temp">${Math.round(weather.list[3].main.temp)}°F</div>
          <div class="weather">${weather.list[3].weather[0].description}</div>
          <div class="hi-low">${Math.round(weather.list[3].main.temp_min)}°F / ${Math.round(weather.list[0].main.temp_max)}°F</div>
        </div>
      
        <div class="days">
          <div class="temp">${Math.round(weather.list[4].main.temp)}°F</div>
          <div class="weather">${weather.list[4].weather[0].description}</div>
          <div class="hi-low">${Math.round(weather.list[4].main.temp_min)}°F / ${Math.round(weather.list[0].main.temp_max)}°F</div>
        </div>
    </div>
  
  `
}

function displayResults(weather) {
  // console.log(weather);
  let city = document.querySelector('.location .country');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp')
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

  let humidity = document.querySelector('.current .humidity');
  humidity.innerHTML = `${weather.main.humidity}<span>% humidity</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;
}


function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
