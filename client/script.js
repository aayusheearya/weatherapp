const apiKey = '';
let isCelsius = true; 

// Function to fetch weather data
const getWeather = async (city) => {
    try {
        const response = await fetch(`http://localhost:5000/api/weather?city=${city}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weatherResult').innerText = error.message;
    }
};

// Function to display weather data
const displayWeather = (data) => {
    const weatherResult = document.getElementById('weatherResult');
    if (!data || !data.weather || !data.weather.length) {
        weatherResult.innerText = "Weather data unavailable.";
        return;
    }
    
    const icon = getWeatherIcon(data.weather[0].main);
    const temperature = isCelsius ? data.main.temp : (data.main.temp * 9/5) + 32;
    const unit = isCelsius ? '°C' : '°F';

    weatherResult.innerHTML = `
        <h2>${data.name} <i class="${icon} weather-icon"></i></h2>
        <p id="temperature">Temperature: ${temperature.toFixed(1)} ${unit}</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity} %</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;

    // Set background based on weather condition
    setBackground(data.weather[0].main);
};

// Function to get Font Awesome icon based on weather condition
const getWeatherIcon = (condition) => {
    switch (condition) {
        case 'Clear':
            return 'fas fa-sun';
        case 'Clouds':
            return 'fas fa-cloud';
        case 'Rain':
            return 'fas fa-cloud-rain';
        case 'Thunderstorm':
            return 'fas fa-bolt';
        case 'Snow':
            return 'fas fa-snowflake';
        case 'Drizzle':
            return 'fas fa-umbrella';
        default:
            return 'fas fa-smog'; // Fallback icon
    }
};

// Function to set background image based on weather condition
const setBackground = (condition) => {
    const body = document.body;
    switch (condition) {
        case 'Clear':
            body.style.backgroundImage = "url('images/sunny.jpg')";
            break;
        case 'Clouds':
            body.style.backgroundImage = "url('images/cloudy.jpg')";
            break;
        case 'Rain':
            body.style.backgroundImage = "url('images/rainy.jpg')";
            break;
        case 'Snow':
            body.style.backgroundImage = "url('images/snowy.jpg')";
            break;
        default:
            body.style.backgroundImage = "url('images/default.jpg')";
    }
};

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeather(city);
    }
});

// Toggle temperature unit
const unitToggleBtn = document.getElementById('unitToggle');
if (unitToggleBtn) {
    unitToggleBtn.addEventListener('click', () => {
        isCelsius = !isCelsius;
        const city = document.getElementById('cityInput').value;
        if (city) {
            getWeather(city); // Re-fetch the weather for the current city
        }
    });
}