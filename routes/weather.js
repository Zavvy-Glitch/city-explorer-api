'use strict';

const axios = require('axios');

async function getWeather(req, res) {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let searchQuery = req.query.searchQuery;

  let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHERKEY}&city=${searchQuery}`;

  class Forecast {
    constructor (date, temp, description, uv ) {
      this.date = date;
      this.temprature = temp;
      this.description = description;
      this.uv = uv;
    }
  }
  try {
    let weather = await axios.get(url);
    console.log(weather.data);
    let weatherArray = weather.data.data.map((value, idx) => {
      return new Forecast(`Date:${value.datetime}`, `Temp of ${value.temp}`, `Sky Conditions: ${value.weather.description}`, `UV index: ${value.uv}`)});
    res.send(weatherArray);
  }
  catch(err) {
    res.send('Error: Something Went Wrong!', err);
  }
}


module.exports = getWeather;

