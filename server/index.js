const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 5000;

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, '../client'))); // Adjusted path

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'index.html')); // Adjusted path
});

// Example API route for weather
app.get('/api/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.API_KEY; // Access the API key from environment variables

    // Make a request to the OpenWeather API
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

    if (!response.ok) {
        return res.status(404).json({ error: 'City not found' });
    }

    const data = await response.json();
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
