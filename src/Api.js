import axios from 'axios';

// axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = '1d9b0d759aac8263cc76739d9f18ff2d';

const options = {
  params: {
    api_key: API_KEY,
  },
};

export async function fetchTrending() {
  const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
  const response = await axios.get(url, options);
  return response.data;
}

export async function fetchSearchMovies(query) {
  const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&query=${query}`;
  const response = await axios.get(url, options);
  return response.data;
}

export async function fetchMovieDetails(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const response = await axios.get(url, options);
  return response.data;
}

export async function fetchMovieCast(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
  const response = await axios.get(url, options);
  console.log(response.data);
  return response.data;
}

export async function fetchMovieReviews(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`;
  const response = await axios.get(url, options);
  console.log(response.data);
  return response.data;
}
