import { useState, useEffect } from 'react';
import { fetchTrending } from '../../Api';
import MoviesList from '../../components/MoviesList/MoviesList';
import css from './HomePage.module.css';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function componentUpdate() {
      try {
        const fetchedData = await fetchTrending();
        setMovies(fetchedData.results);
      } catch (error) {
        console.error(error);
      }
      //   fetchTrending()
      //     .then(({ response }) => setMovies(response))
      //     .catch(err => console.error(err));
    }
    componentUpdate();
  }, []);

  return (
    <>
      <h1 className={css.title}>Trending today</h1>
      <MoviesList movies={movies} />
    </>
  );
}
