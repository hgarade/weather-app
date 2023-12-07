// openweather API Key
const APIKey = "cfb74893bec99a1db1e45447a50b11de";

const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

// get entered city
function getCity() {
  const city = document.querySelector(".search-box input").value;
  this.fetchWeatherData(city);
}

// call API
function fetchWeatherData(city) {
  if (city === "") {
    return;
  } else {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((jsonResponse) => {
        this.checkForInvalidCity(jsonResponse);
      });
  }
}

// update info and animation
function checkForInvalidCity(jsonResponse) {
  if (jsonResponse.cod === "404") {
    container.style.height = "400px";
    weatherBox.style.display = "none";
    weatherDetails.style.display = "none";
    error404.style.display = "block";
    error404.classList.add("fadeIn");
    return;
  } else {
    this.showWeatherInfo();
    const image = document.querySelector(".weather-box img");
    const temperature = document.querySelector(".weather-box .temperature");
    const description = document.querySelector(".weather-box .description");
    const humidity = document.querySelector(".weather-details .humidity span");
    const wind = document.querySelector(".weather-details .wind span");
    temperature.innerHTML = `${parseInt(
      jsonResponse.main.temp
    )}<span>°C</span>`;
    description.innerHTML = `${jsonResponse.weather[0].description}`;
    humidity.innerHTML = `${jsonResponse.main.humidity}%`;
    wind.innerHTML = `${parseInt(jsonResponse.wind.speed)}Km/h`;
    this.displayImage(jsonResponse, image);
  }
}

// Animation
function showWeatherInfo() {
  error404.style.display = "none";
  error404.classList.remove("fadeIn");
  weatherBox.style.display = "";
  weatherDetails.style.display = "";
  weatherBox.classList.add("fadeIn");
  weatherDetails.classList.add("fadeIn");
  container.style.height = "590px";
}

// update image according to weather
function displayImage(jsonResponse, image) {
  switch (jsonResponse.weather[0].main) {
    case "Clear":
      image.src = "images/clear.png";
      break;

    case "Rain":
      image.src = "images/rain.png";
      break;

    case "Snow":
      image.src = "images/snow.png";
      break;

    case "Clouds":
      image.src = "images/cloud.png";
      break;

    case "Mist":
      image.src = "images/mist.png";
      break;
    case "Drizzle":
      image.src = "images/drizzle.png";
      break;
    default:
      image.src = "";
  }
}
