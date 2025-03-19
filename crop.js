function getCropInfo() {
    const cropType = document.getElementById("crop-type").value.toLowerCase();
    const cropResult = document.getElementById("crop-result");

    if (cropType === "") {
        cropResult.innerHTML = "<p>Please enter a crop name.</p>";
        return;
    }

    let recommendations = "";

    switch (cropType) {
        case "maize":
            recommendations = `
                <h3>Crop: Maize 🌽</h3>
                <p>💧 <strong>Irrigation:</strong> Needs moderate watering; increase during flowering.</p>
                <p>🌱 <strong>Fertilization:</strong> Use nitrogen-rich fertilizers (e.g., urea).</p>
                <p>🐛 <strong>Pest Control:</strong> Watch out for armyworms; use biological pesticides.</p>
            `;
            break;
        case "rice":
            recommendations = `
                <h3>Crop: Rice 🌾</h3>
                <p>💧 <strong>Irrigation:</strong> Requires flooded fields during early growth.</p>
                <p>🌱 <strong>Fertilization:</strong> Apply phosphorus and potassium-rich fertilizers.</p>
                <p>🐛 <strong>Pest Control:</strong> Control rice blast disease with fungicides.</p>
            `;
            break;
        case "tomatoes":
            recommendations = `
                <h3>Crop: Tomatoes 🍅</h3>
                <p>💧 <strong>Irrigation:</strong> Water regularly; avoid wetting leaves to prevent disease.</p>
                <p>🌱 <strong>Fertilization:</strong> Use compost and potassium-rich fertilizers.</p>
                <p>🐛 <strong>Pest Control:</strong> Protect from aphids and whiteflies using neem oil.</p>
            `;
            break;
        case "wheat":
            recommendations = `
                <h3>Crop: Wheat 🌾</h3>
                <p>💧 <strong>Irrigation:</strong> Requires water at germination and flowering stages.</p>
                <p>🌱 <strong>Fertilization:</strong> Use nitrogen and phosphorus fertilizers.</p>
                <p>🐛 <strong>Pest Control:</strong> Monitor for rust disease; use fungicide if needed.</p>
            `;
            break;
        default:
            recommendations = "<p>Sorry, no data available for this crop. Try 'maize', 'rice', 'tomatoes', or 'wheat'.</p>";
    }

    cropResult.innerHTML = recommendations;
}
