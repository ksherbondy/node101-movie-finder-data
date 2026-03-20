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
