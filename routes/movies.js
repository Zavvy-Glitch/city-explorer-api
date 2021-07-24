'use strict';

const axios = require('axios');
const cache = require('./cache.js');

async function getMovies(req, res) {
  console.log(req.query, 'movies');
  const searchQuery = req.query.searchQuery;
  const key = 'movies-' + searchQuery;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEKEY}&language=en-US&query=${searchQuery}&page=1`;

  try {
    console.log(cache);
    if(!cache[key]) {
      cache[key] = {};
      cache[key].timestamp = Date.now();
      axios.get(url)
        .then(data => {
        // const movie = await axios.get(url);
          console.log(data);
          const topMovies = data.data.results;
          const sortedTopMovies = topMovies.sort((a, b) => b.popularity - a.popularity);

          const newMovieArray = [];

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
          for(let i=0; i<20; i++){
            newMovieArray.push(new Movie(sortedTopMovies[i].title, sortedTopMovies[i].overview, sortedTopMovies[i].vote_average, sortedTopMovies[i].vote_count, sortedTopMovies[i].poster_path, sortedTopMovies[i].popularity, sortedTopMovies[i].release_date ));
          }
          cache[key].data = newMovieArray;
          // getMovies(data.data);
          res.send(newMovieArray);
        });

    }
    else{
      // console.log(newMovieArray.length);
      res.send(cache[key].data);}
  }
  catch(err){
    res.send(500).send(err);
  }
}

module.exports = getMovies;
