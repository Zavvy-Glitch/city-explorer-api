'use strict';

const axios = require('axios');
const cache = require('./cache.js');

async function getWeather(req, res) {
  let lat = req.query.lat;
  let lon = req.query.lon;
  const searchQuery = req.query.searchQuery;
  const key = 'weather-' + searchQuery;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHERKEY}&city=${searchQuery}&lat=${lat}&lon=${lon}`;

  try {
    if(!cache[key]) {
      cache[key] = {};
      cache[key].timestamp = Date.now();
      axios.get(url)
        .then(data => {

          class Forecast {
            constructor (date, temp, description, uv ) {
              this.date = date;
              this.temprature = temp;
              this.description = description;
              this.uv = uv;
            }
          }

          let weather = data;
          let weatherArray = weather.data.data.map((value, idx) => {
            return new Forecast(`Date:${value.datetime}`, `Temp of ${value.temp}`, `Sky Conditions: ${value.weather.description}`, `UV index: ${value.uv}`);});
          cache[key].data = weatherArray;
          console.log(cache[key].data);
          res.send(weatherArray);
        });
    }
    else{
      res.send(cache[key].data);}
  }
  catch(err) {
    res.send('Error: Something Went Wrong!', err);
  }
}


module.exports = getWeather;

