const express = require('express');
const path = require('path'); 
const dotenv = require('dotenv');
const cors = require('cors');
const fetch = require('node-fetch'); // Make sure to install node-fetch

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'https://aayusheearya.github.io/weatherapp/'
}));
app.use(express.static(path.join(__dirname, '../')));

// Serve the index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
});

// API route for weather
app.get('/api/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

        if (!response.ok) {
            return res.status(404).json({ error: 'City not found' });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
