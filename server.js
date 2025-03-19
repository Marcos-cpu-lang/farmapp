const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB (update the URI as needed)
const mongoURI = 'mongodb://localhost:27017/agriapp';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- MongoDB Schemas ---

// Crop Schema
const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  yield: { type: Number, default: 0 },
  cost: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
const Crop = mongoose.model('Crop', cropSchema);

// Farmer Schema
const farmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Farmer = mongoose.model('Farmer', farmerSchema);

// Recommendation Schema for sustainable practices
const recommendationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Recommendation = mongoose.model('Recommendation', recommendationSchema);

// --- Authentication Middleware ---
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access Denied' });
  try {
    const verified = jwt.verify(token, 'secretkey'); // Replace 'secretkey' with an env variable in production
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

// --- API Endpoints ---

// Home route
app.get('/', (req, res) => {
  res.send('Agricultural App Backend is Running');
});

// Register a new farmer
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if farmer already exists
    const existingFarmer = await Farmer.findOne({ email });
    if (existingFarmer) {
      return res.status(400).json({ message: 'Farmer already exists' });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newFarmer = new Farmer({ name, email, password: hashedPassword });
    await newFarmer.save();
    res.status(201).json({ message: 'Farmer registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Farmer Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const farmer = await Farmer.findOne({ email });
    if (!farmer) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const validPassword = await bcrypt.compare(password, farmer.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    // Create and assign a token
    const token = jwt.sign({ _id: farmer._id }, 'secretkey'); // Use environment variables for production secrets
    res.header('Authorization', token).json({ token, message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all crops (protected route)
app.get('/api/crops', authMiddleware, async (req, res) => {
  try {
    const crops = await Crop.find();
    res.json(crops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new crop (protected route)
app.post('/api/crops', authMiddleware, async (req, res) => {
  try {
    const newCrop = new Crop(req.body);
    await newCrop.save();
    res.status(201).json(newCrop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get sustainable agriculture recommendations
app.get('/api/recommendations', async (req, res) => {
  try {
    const recommendations = await Recommendation.find();
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Simulated weather data endpoint
app.get('/api/weather', (req, res) => {
  res.json({
    location: "Your Farm",
    temperature: "28°C",
    condition: "Sunny"
  });
});

// Simulated market prices endpoint
app.get('/api/market-prices', (req, res) => {
  res.json([
    { crop: "Maize", price: "$200 per ton" },
    { crop: "Wheat", price: "$250 per ton" },
    { crop: "Rice", price: "$300 per ton" }
  ]);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
