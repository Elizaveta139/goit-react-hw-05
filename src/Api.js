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
  try {
    const response = await axios.get(url, options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
