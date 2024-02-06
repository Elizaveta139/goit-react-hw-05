import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MoviesList from '../../components/MoviesList/MoviesList';
import SearchBox from '../../components/SearchBox/SearchBox';
import { fetchSearchMovies } from '../../Api';

export default function MoviesPage() {
  // const receivedMovies = fetchSearchMovies();
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);

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
        const fetchedData = await fetchSearchMovies(movieName);
        setMovies(fetchedData.results);
      } catch (error) {
        console.error(error);
      }
    }
    componentUpdate();
  }, [movieName]);

  return (
    <>
      <SearchBox value={movieName} onChange={updateQueryString} />
      {movies.length > 0 && <MoviesList movies={movies} />}
    </>
  );
}
