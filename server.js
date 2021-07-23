'use strict';


const cors = require('cors');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();
app.use(cors());


const PORT = process.env.PORT || 3001;

const getWeather = require('./routes/weather.js');
const getMovies = require('./routes/movies.js');

app.get('/weather', getWeather);
app.get('/movies', getMovies);


app.listen(PORT, () => console.log(`Running Server on ${PORT}`));
