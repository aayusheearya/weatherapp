const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname, '../')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
});

app.get('/api/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;

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
