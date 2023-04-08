const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const geolocationController = require('./controllers/geolocationController');
const contactController = require('./controllers/contactController');


app.use(express.static('../new_site'));

app.use('/api/geolocation', geolocationController);
app.use('/api/contact', contactController);


const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})