// Function to fetch weather data
function fetchWeather() {
    const weatherSection = document.getElementById('weather');

    // Simulated weather data (Replace with API integration)
    const weatherData = {
        temperature: "28°C",
        condition: "Sunny",
        location: "Your Farm"
    };

    weatherSection.innerHTML = `
        <h2>Weather Updates</h2>
        <p><strong>Location:</strong> ${weatherData.location}</p>
        <p><strong>Temperature:</strong> ${weatherData.temperature}</p>
        <p><strong>Condition:</strong> ${weatherData.condition}</p>
    `;
}

// Function to fetch market prices (Simulated Data)
function fetchMarketPrices() {
    const marketSection = document.getElementById('market-prices');

    // Simulated market data
    const prices = [
        { crop: "Maize", price: "$200 per ton" },
        { crop: "Wheat", price: "$250 per ton" },
        { crop: "Rice", price: "$300 per ton" }
    ];

    let priceList = "<h2>Market Prices</h2><ul>";
    prices.forEach(item => {
        priceList += `<li><strong>${item.crop}:</strong> ${item.price}</li>`;
    });
    priceList += "</ul>";

    marketSection.innerHTML = priceList;
}

// Call functions when the page loads
window.onload = function() {
    fetchWeather();
    fetchMarketPrices();
};
