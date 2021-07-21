'use strict';

const weather = require('./data/weather.json');
const cors = require('cors');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 3001;


app.get('/weather', (req, res) => {
  class Forecast {
    constructor (date, description) {
      this.date = date;
      this.description = description;
    }
  }
  let searchQuery = req.query.key;
  let queryData = weather.find(value => value.city_name === searchQuery);

  let days = [];
  console.log(queryData);
  queryData.data.map((value) => days.push(new Forecast(value.datetime, `Low of ${value.low_temp}, High of ${value.high_temp}, with ${value.weather.description}`)
  ));
  res.send(days);
});

// let latLon = [weather[0].lat, weather[0].lon, weather[0].city_name];
// app.get('/weather', (req, res) => {
//   res.send(latLon);
// });

app.listen(PORT, () => console.log(`Running Server on ${PORT}`));
