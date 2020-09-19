const api = {
  key: "a01fee2d80b973ab3b18ce1990905e04",
  base: "https://api.openweathermap.org/data/2.5/",
  fiveDay: "https://api.openweathermap.org/data/2.5/forecast/"
}

const defaultCity = "Austin"

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

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
  fetch(`${api.fiveDay}?q=${cityName}&units=imperial&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayFiveDay);
}

loadDefaultCity()

function displayFiveDay(weather) {
  console.log(weather);
  console.log(weather.list[0].main.temp_max)

  let forecast = document.querySelector('.container');
  forecast.innerHTML = `
    <div class="days">
      <div class="temp">${Math.round(weather.list[0].main.temp)}</div>
      <div class="weather">${weather.list[0].weather[0].description}</div>
      <div class="hi-low">${Math.round(weather.list[0].main.temp_min)} / ${Math.round(weather.list[0].main.temp_max)}</div>
    </div>
  
    <div class="days">
      <div class="temp">${Math.round(weather.list[1].main.temp)}</div>
      <div class="weather">${weather.list[1].weather[0].description}</div>
      <div class="hi-low">${Math.round(weather.list[1].main.temp_min)} / ${Math.round(weather.list[0].main.temp_max)}</div>
    </div>
  
    <div class="days">
      <div class="temp">${Math.round(weather.list[2].main.temp)}</div>
      <div class="weather">${weather.list[2].weather[0].description}</div>
      <div class="hi-low">${Math.round(weather.list[2].main.temp_min)} / ${Math.round(weather.list[0].main.temp_max)}</div>
    </div>
  
    <div class="days">
      <div class="temp">${Math.round(weather.list[3].main.temp)}</div>
      <div class="weather">${weather.list[3].weather[0].description}</div>
      <div class="hi-low">${Math.round(weather.list[3].main.temp_min)} / ${Math.round(weather.list[0].main.temp_max)}</div>
    </div>
  
    <div class="days">
      <div class="temp">${Math.round(weather.list[4].main.temp)}</div>
      <div class="weather">${weather.list[4].weather[0].description}</div>
      <div class="hi-low">${Math.round(weather.list[4].main.temp_min)} / ${Math.round(weather.list[0].main.temp_max)}</div>
    </div>
  
  `

  // let temp = document.querySelector('.days .zero .temp')
  // temp.innerHTML = `${Math.round(weather.list[0].main.temp)}<span>°F</span>`;

  // let weather_el = document.querySelector('.current .weather');
  // weather_el.innerText = weather.weather[0].main;

  // let hilow = document.querySelector('.hi-low');
  // hilow.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;
}

function displayResults(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp')
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

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
