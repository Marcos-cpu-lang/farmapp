function getSoilInfo() {
    const soilType = document.getElementById("soil-type").value.toLowerCase();
    const soilResult = document.getElementById("soil-result");

    if (soilType === "") {
        soilResult.innerHTML = "<p>Please enter a soil type.</p>";
        return;
    }

    let recommendations = "";

    switch (soilType) {
        case "sandy":
            recommendations = `
                <h3>Soil Type: Sandy</h3>
                <p>✅ Best Crops: Carrots, Potatoes, Peanuts, Watermelon</p>
                <p>💧 Irrigation: Requires frequent watering due to poor water retention.</p>
                <p>🌱 Fertilization: Add organic matter (compost, manure) to improve soil structure.</p>
            `;
            break;
        case "clay":
            recommendations = `
                <h3>Soil Type: Clay</h3>
                <p>✅ Best Crops: Rice, Broccoli, Cabbage, Lettuce</p>
                <p>💧 Irrigation: Retains water well; avoid overwatering.</p>
                <p>🌱 Fertilization: Add sand and compost to improve drainage.</p>
            `;
            break;
        case "loam":
            recommendations = `
                <h3>Soil Type: Loam</h3>
                <p>✅ Best Crops: Almost all crops (Corn, Wheat, Tomatoes, Peppers)</p>
                <p>💧 Irrigation: Well-balanced; adjust based on crop needs.</p>
                <p>🌱 Fertilization: Maintain with compost and crop rotation.</p>
            `;
            break;
        case "silty":
            recommendations = `
                <h3>Soil Type: Silty</h3>
                <p>✅ Best Crops: Rice, Beans, Tomatoes, Cucumbers</p>
                <p>💧 Irrigation: Holds moisture well; good for farming.</p>
                <p>🌱 Fertilization: Add organic matter to improve drainage.</p>
            `;
            break;
        default:
            recommendations = "<p>Sorry, no data available for this soil type. Try 'sandy', 'clay', 'loam', or 'silty'.</p>";
    }

    soilResult.innerHTML = recommendations;
}
