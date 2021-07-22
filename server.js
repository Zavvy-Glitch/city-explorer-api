'use strict';

// const weather = require('./data/weather.json');
const cors = require('cors');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/weather', getWeather);
async function getWeather(req, res) {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let searchQuery = req.query.searchQuery;

  let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHERKEY}&city=${searchQuery}`;

  class Forecast {
    constructor (city, date, temp, description, uv ) {
      this.city = city;
      this.date = date;
      this.temprature = temp;
      this.description = description;
      this.uv = uv;
    }
  }
  try {
    let weather = await axios.get(url);
    // console.log(weather);
    let weatherArray = [];
    weather.data.data.map((value, idx) => {
      weatherArray.push(new Forecast(value.city_name, `Date:${value.datetime}`, `Temp of ${value.temp}`, `Sky Conditions: ${value.weather.description}`, `UV index: ${value.uv}`));
    });

    res.send(weatherArray);
  }
  catch(err) {
    console.log('Error: Something Went Wrong!', err);
  }

}

app.get('/movies', getMovies);
async function getMovies(req, res) {
  let searchQuery = req.query.searchQuery;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEKEY}&language=en-US&query=${searchQuery}&page=1&include_adult=true`;
  console.log(url.data);
  class Movie {
    constructor (title, overView, averageVotes, totalVotes, imageUrl, popularity, releasedOn){
      this.title = title;
      this.overView = overView;
      this.averageVotes = averageVotes;
      this.totalVotes = totalVotes;
      this.imageUrl = imageUrl;
      this.popularity = popularity;
      this.releasedOn = releasedOn;
    }
  }
  try {
    let movie = await axios.get(url);
    // console.log(movie);
    // let movieArray = [];
    // movie.data.results.map((value, idx) => {
    //   movieArray.push(new Movie(value.title, value.overview, value.vote_average, value.vote_count, value.poster_path, value.popularity, value.release_date));
    // });
    let topMovies = movie.data.results;
    let sortedTopMovies = topMovies.sort((a, b) => b.popularity - a.popularity);

    let newMovieArray = [];
    for(let i=0; i<20; i++){
      newMovieArray.push(new Movie(sortedTopMovies[i].title, sortedTopMovies[i].overview, sortedTopMovies[i].vote_average, sortedTopMovies[i].vote_count, sortedTopMovies[i].poster_path, sortedTopMovies[i].popularity, sortedTopMovies[i].release_date ));
    }
    console.log(newMovieArray.length);
    res.send(newMovieArray);
  }
  catch(err){
    console.log('ERROR: Unable to Process!', err);
  }
}

app.listen(PORT, () => console.log(`Running Server on ${PORT}`));
