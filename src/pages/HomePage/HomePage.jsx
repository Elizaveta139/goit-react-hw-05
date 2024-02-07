import { useState, useEffect } from 'react';
import { fetchTrending } from '../../Api';
import MoviesList from '../../components/MoviesList/MoviesList';
import css from './HomePage.module.css';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function Home() {
  const [moviesHome, setMoviesHome] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function componentUpdate() {
      try {
        setLoading(true);
        setError(false);

        const fetchedData = await fetchTrending();
        setMoviesHome(fetchedData.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    componentUpdate();
  }, []);

  return (
    <>
      <h1 className={css.title}>Trending today</h1>
      {moviesHome.length > 0 && <MoviesList movies={moviesHome} />}
      {loading && <Loader onLoading={loading} />}
      {error && <ErrorMessage />}
    </>
  );
}
