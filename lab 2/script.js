
const GEO_API = "https://geocoding-api.open-meteo.com/v1/search"; //api urls
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";


function log(msg, type = "sync") {
  const consoleBox = document.getElementById("consoleOutput");

  const line = document.createElement("div");
  line.className = "log-" + type;
  line.textContent = msg;

  consoleBox.appendChild(line);
  console.log(msg);
}

function clearConsole() {
  document.getElementById("consoleOutput").innerHTML = "";
}

function getHistory() {
  return JSON.parse(localStorage.getItem("weatherHistory")) || [];
}

function saveHistory(city) {
  const history = getHistory();

  if (!history.includes(city)) {
    history.unshift(city);
    if (history.length > 5) history.pop();
    localStorage.setItem("weatherHistory", JSON.stringify(history));
  }

  renderHistory();
}

function renderHistory() {
  const container = document.getElementById("historyContainer");
  container.innerHTML = "";

  getHistory().forEach(city => {
    const btn = document.createElement("button");
    btn.className = "history-tag";
    btn.textContent = city;

    btn.onclick = () => {
      document.getElementById("cityInput").value = city;
      searchWeather();
    };

    container.appendChild(btn);
  });
}

async function getCoordinates(city) {
  const res = await fetch(`${GEO_API}?name=${city}&count=1`);
  const data = await res.json();

  if (!data.results) throw new Error("City not found");

  const c = data.results[0];

  return {
    name: c.name,
    country: c.country,
    lat: c.latitude,
    lon: c.longitude
  };
}

async function getWeather(lat, lon) {
  const res = await fetch(
    `${WEATHER_API}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
  );

  const data = await res.json();
  return data.current;
}

function weatherText(code) {

  if (code === 0) return "Clear Sky";
  if (code <= 2) return "Partly Cloudy";
  if (code === 3) return "Overcast";
  if (code <= 69) return "Rain";
  if (code <= 84) return "Rain Showers";
  if (code <= 99) return "Thunderstorm";

  return "Unknown";
}

async function fetchWeather(city) {

  log("Sync Start");
  log("Sync End");

  log("Async Fetch Started", "async");

  Promise.resolve().then(() =>
    log("Promise.then (Microtask)", "promise")
  );

  setTimeout(() =>
    log("setTimeout (Macrotask)", "macro"), 0
  );

  try {

    const location = await getCoordinates(city);
    const weather = await getWeather(location.lat, location.lon);

    log("Weather Data Received", "async");

    displayWeather(location, weather);
    saveHistory(location.name);

  } catch (err) {

    log("Error: " + err.message, "error");
    showError(err.message);

  }
}

function displayWeather(loc, w) {

  const box = document.getElementById("weatherOutput");

  box.innerHTML = `
  <div class="weather-row">
    <span>City</span>
    <span>${loc.name}, ${loc.country}</span>
  </div>

  <div class="weather-row">
    <span>Temperature</span>
    <span>${w.temperature_2m} °C</span>
  </div>

  <div class="weather-row">
    <span>Condition</span>
    <span>${weatherText(w.weather_code)}</span>
  </div>

  <div class="weather-row">
    <span>Humidity</span>
    <span>${w.relative_humidity_2m}%</span>
  </div>

  <div class="weather-row">
    <span>Wind Speed</span>
    <span>${w.wind_speed_10m} m/s</span>
  </div>
  `;
}

function showError(msg) {
  document.getElementById("weatherOutput").innerHTML =
    `<span class="error-msg">${msg}</span>`;
}

function searchWeather() {

  const city = document.getElementById("cityInput").value.trim();

  if (!city) {
    showError("Please enter a city name.");
    return;
  }

  clearConsole();

  document.getElementById("weatherOutput").innerHTML =
    `<span class="placeholder-msg">Loading...</span>`;

  fetchWeather(city);
}

document.getElementById("cityInput").addEventListener("keydown", e => {
  if (e.key === "Enter") searchWeather();
});

window.onload = renderHistory;