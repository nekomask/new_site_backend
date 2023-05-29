const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

const bodyParser = require('body-parser');

const app = express();

// Configure cors to allow requests from domain
var corsOptions = {
    origin: 'https://brandonkiefer.net',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions)); 

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