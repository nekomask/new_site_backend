const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const axios = require('axios');

app.use(express.static('../new_site'));

app.get('/api/geolocation', async (req, res) => {
    try {
    const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.MY_GEO_API_KEY}`);
    const { city, state_prov } = response.data;
    res.json({ city, state_prov });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching geolocation data' });
}
})

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})