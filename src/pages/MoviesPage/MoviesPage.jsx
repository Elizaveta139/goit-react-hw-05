import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MoviesList from '../../components/MoviesList/MoviesList';
import SearchBox from '../../components/SearchBox/SearchBox';
import { fetchSearchMovies } from '../../Api';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
// import NoMovies from '../../components/NoMovies/NoMovies';

export default function MoviesPage() {
  // const receivedMovies = fetchSearchMovies();
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const movieName = searchParams.get('query') ?? '';

  // const visibleMovies = receivedMovies.filter(movie =>
  //   movie.query.toLowerCase().includes(movieName.toLowerCase())
  // );

  function updateQueryString(query) {
    const nextParams = query !== '' ? { query } : {};
    setSearchParams(nextParams);
  }

  useEffect(() => {
    if (!movieName) return;

    async function componentUpdate() {
      try {
        setLoading(true);
        setError(false);

        const fetchedData = await fetchSearchMovies(movieName);
        setMovies(fetchedData.results);
        console.log('fetchedData.results', fetchedData.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    componentUpdate();
  }, [movieName]);

  console.log('movies', movies);
  return (
    <>
      <SearchBox value={movieName} onChange={updateQueryString} />
      {/* {movies.length === 0 && <NoMovies />} */}
      {movies.length > 0 && <MoviesList movies={movies} />}
      {loading && <Loader onLoading={loading} />}
      {error && <ErrorMessage />}
    </>
  );
}
