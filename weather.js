// Replace 'YOUR_API_KEY' with your actual OpenWeather API key
const apiKey = "1910355777e11d67031ac84f82b3f302";

function getWeather() {
    const city = document.getElementById("city").value;
    const weatherResult = document.getElementById("weather-result");

    if (city === "") {
        weatherResult.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                weatherResult.innerHTML = `<p>City not found. Please try again.</p>`;
            } else {
                const temp = data.main.temp;
                const description = data.weather[0].description;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;

                weatherResult.innerHTML = `
                    <h3>Weather in ${city}</h3>
                    <p>Temperature: ${temp}°C</p>
                    <p>Condition: ${description}</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                `;
            }
        })
        .catch(error => {
            weatherResult.innerHTML = `<p>Error fetching weather data. Please try again.</p>`;
            console.error("Error:", error);
        });
}
