const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const validator = require('validator');
dotenv.config();


const bodyParser = require('body-parser');

const app = express();

// Configure cors to allow requests from domain
var allowedOrigins = ['https://brandonkiefer.net', 'http://localhost:3000'];

var corsOptions = {
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions)); 

app.use(bodyParser.json());

const geolocationController = require('./controllers/geolocationController');
const contactController = require('./controllers/contactController');


app.use(express.static('../new_site'));


app.use((req, res, next) => {
    const forwarded = req.headers['x-forwarded-for'];
    let ip = '';

    if (forwarded) {
        // extract the first IP if multiple IPs are present
        ip = forwarded.split(',')[0];
    } else {
        ip = req.socket.remoteAddress;
    }

    req.clientIp = validator.isIP(ip) ? ip : undefined;
    next();
});

app.use('/api/geolocation', geolocationController);
app.use('/api/contact', contactController);


const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})