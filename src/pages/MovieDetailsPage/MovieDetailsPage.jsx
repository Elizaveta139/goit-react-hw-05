import { useState, useEffect, Suspense } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { BackLink } from '../../components/BackLink/BackLink';
import { fetchMovieDetails } from '../../Api';

export default function MovieDetailsPage() {
  const [moviesDetails, setMoviesDetails] = useState({});
  const { movieId } = useParams();
  const movie = fetchMovieDetails(movieId);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/movies';

  useEffect(() => {
    if (!movieId) return;

    async function componentUpdate() {
      try {
        const fetchedData = await fetchMovieDetails(movieId);
        setMoviesDetails(fetchedData);
      } catch (error) {
        console.error(error);
      }
    }
    componentUpdate();
  }, [movieId]);

  const { genres, poster_path, overview, release_date, vote_average, title } = moviesDetails;

  return (
    <div>
      <BackLink to={backLinkHref}>Back to movies</BackLink>
      <div>
        <img src={`https://image.tmdb.org/t/p/w300/${poster_path}`} alt={title} />
      </div>
      <div>
        {' '}
        {title && (
          <h2>
            {title} ({release_date.slice(0, 4)})
          </h2>
        )}
        <p>{Math.round(vote_average * 10)}%</p>
        <h3>Overview</h3>
        <p>{overview}</p>
        <h3>Genres</h3>
        {genres && <p>{genres.map(({ name }) => name).join(', ')}</p>}
      </div>

      <div>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>

      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
