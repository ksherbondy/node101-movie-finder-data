<<<<<<< HEAD
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const app = express();
app.use(morgan('dev'));


const cache = {};
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

app.get('/', async (req, res) => {

    const query = req.query;
    const now = Date.now();
    const cacheKey = query.i || query.t;
 
    if (cache[cacheKey] && cache[cacheKey].timestamp) {
        const timeElapsed = now - cache[cacheKey].timestamp;
        if (timeElapsed > ONE_DAY_IN_MS) {
            console.log('Fetching data from cache.');
            return res.status(200).json(cache[cacheKey].date);
        } else {
            console.log('Cache Expired: Fetching updated data.');
        }
    }

    try {
        const myKey = process.env.API_KEY;
        const url = `http://www.omdbapi.com/?apikey=${myKey}&i=${query.i || ''}&t=${query.t || ''}`;
        const response = await axios.get(url);

        cache[cacheKey] = {
            data: response.data,
            timestamp: now
        };

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).send('Mission Failure: External API unreachable.');
    }
});

module.exports = app;
=======
// import files and packages up here
const express = require('express');
const morgan = require('morgan');
const data = require('./data.json');




// create your express server below
/*
Withough Express we have to write it like:
import http from 'http';
const PORT = 8000;
const server = http.createServer((req, res) => {
    //res.setHeader('Content-Type', 'text/html');
    //res.statusCode = 404;
    res.writeHead(500, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Server Error'}));
});
In the standard Node http way, you have to manually build the engine ie http.createServer(..)
With Express the const app IS the server logic.
*/
const app = express();



// add your routes and middleware below
app.use(morgan('dev'));
app.get('/', (req, res) =>{
    res.status(200).send("It's working");
});

app.get('/data', (req, res) =>{
    res.status(200).json(data);
});
// finally export the express application
//Hands the entire logic bundle over index.js
module.exports = app;
>>>>>>> 0877097fcc5c4e5bdff2e5338cad321dddcc38c3
