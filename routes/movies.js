'use strict';

const axios = require('axios');

async function getMovies(req, res) {
  const searchQuery = req.query.searchQuery;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEKEY}&language=en-US&query=${searchQuery}&page=1`;
  try {
    const movie = await axios.get(url);
    const topMovies = movie.data.results;
    const sortedTopMovies = topMovies.sort((a, b) => b.popularity - a.popularity);

    const newMovieArray = [];
    for(let i=0; i<20; i++){
      newMovieArray.push(new Movie(sortedTopMovies[i].title, sortedTopMovies[i].overview, sortedTopMovies[i].vote_average, sortedTopMovies[i].vote_count, sortedTopMovies[i].poster_path, sortedTopMovies[i].popularity, sortedTopMovies[i].release_date ));
    }
    console.log(newMovieArray.length);
    res.send(newMovieArray);
  }
  catch(err){
    res.send(500).send(err);
  }
}

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
module.exports = getMovies;
