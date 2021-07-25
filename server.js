'use strict';


const cors = require('cors');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const getWeather = require('./routes/weather.js');
const getMovies = require('./routes/movies.js');

app.get('/weather', getWeather);
app.get('/movies', getMovies);
app.use('*', errorHandler);

function errorHandler(req, res) {
  res.status(500).send('Error: Something is Missing. Please Check Your URL');
}

app.listen(PORT, () => console.log(`Running Server on ${PORT}`));
