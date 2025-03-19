function getMarketPrice() {
    const cropName = document.getElementById("crop-name").value.toLowerCase();
    const priceResult = document.getElementById("price-result");

    if (cropName === "") {
        priceResult.innerHTML = "<p>Please enter a crop name.</p>";
        return;
    }

    let prices = {
        maize: "$200 per ton",
        rice: "$300 per ton",
        wheat: "$250 per ton",
        tomatoes: "$1.50 per kg",
        potatoes: "$2.00 per kg"
    };

    if (prices[cropName]) {
        priceResult.innerHTML = `<p>The current market price for <strong>${cropName}</strong> is <strong>${prices[cropName]}</strong>.</p>`;
    } else {
        priceResult.innerHTML = "<p>Sorry, price data is not available for this crop.</p>";
    }
}
