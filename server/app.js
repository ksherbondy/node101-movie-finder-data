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
