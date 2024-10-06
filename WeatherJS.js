// Array of locations with their latitude and longitude
const locations = [
    { name: "Tokyo, Japan", latitude: 35.6895, longitude: 139.6917 },
    { name: "New York, USA", latitude: 40.7128, longitude: -74.0060 },
    { name: "London, UK", latitude: 51.5074, longitude: -0.1278 },
    { name: "Paris, France", latitude: 48.8566, longitude: 2.3522 },
    { name: "Sydney, Australia", latitude: -33.8688, longitude: 151.2093 }
];

// Function to fetch weather data for each location
function fetchWeatherData() {
    locations.forEach(location => {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`;

        // AJAX request to Open-Meteo API
        const xhr = new XMLHttpRequest();
        xhr.open('GET', apiUrl, true);
        xhr.onload = function () {
            if (this.status === 200) {
                const weatherData = JSON.parse(this.responseText).current_weather;
                updateWeatherCard(location.name, weatherData);
            }
        };
        xhr.send();
    });
}

// Function to update the weather card for each location
function updateWeatherCard(locationName, weatherData) {
    const weatherContainer = document.getElementById('weather-container');
    
    // Check if the card for the location already exists
    let weatherCard = document.querySelector(`.weather-card[data-location="${locationName}"]`);
    
    if (!weatherCard) {
        // Create new weather card if it doesn't exist
        weatherCard = document.createElement('div');
        weatherCard.classList.add('weather-card');
        weatherCard.setAttribute('data-location', locationName);
        weatherCard.innerHTML = `
            <h3>${locationName}</h3>
            <p>Temperature: <span class="temp">${weatherData.temperature}°C</span></p>
            <p>Wind Speed: <span class="wind-speed">${weatherData.windspeed} km/h</span></p>
        `;
        weatherContainer.appendChild(weatherCard);
    } else {
        // Update existing weather card
        weatherCard.querySelector('.temp').textContent = `${weatherData.temperature}°C`;
        weatherCard.querySelector('.wind-speed').textContent = `${weatherData.windspeed} km/h`;
    }
}

// Function to refresh weather data every 5 minutes (300,000 milliseconds)
setInterval(fetchWeatherData, 300000);

// Initial fetch when the page loads
window.onload = function () {
    fetchWeatherData();
};
