const express = require('express');
const fetch = require('node-fetch'); // Use node-fetch v2
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// OpenWeatherMap API Key
const API_KEY = '64ecc4d8bdc30d607f7eb9d9ca586bfa';

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Weather API route
app.get('/weather', async (req, res) => {
  const city = req.query.city || 'Delhi';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      return res.status(data.cod).json({ error: data.message });
    }

    res.json({
      location: data.name,
      temp: data.main.temp,
      feelslike: data.main.feels_like,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      uv: '--', // UV not available from this endpoint
      condition: data.weather[0].description
    });

  } catch (err) {
    console.error('Weather fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch weather data.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
});
