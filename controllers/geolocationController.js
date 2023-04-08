const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    try {
    const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.MY_GEO_API_KEY}`);
    const { city, state_prov } = response.data;
    res.json({ city, state_prov });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching geolocation data' });
}
})

module.exports = router;