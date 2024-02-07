import { useState, useEffect, Suspense } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { BackLink } from '../../components/BackLink/BackLink';
import { fetchMovieDetails } from '../../Api';
import css from './MovieDetailsPage.module.css';

const defaultImg =
  'https://st2.depositphotos.com/2498595/6610/v/600/depositphotos_66109523-stock-illustration-blank-photo-outline-symbol-dark.jpg';

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
      <div className={css.wrap}>
        <div>
          {poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
              alt={title}
              width="300"
              height="400"
            />
          ) : (
            <img src={defaultImg} alt={title} width="300" height="400" />
          )}
        </div>
        <div>
          {' '}
          {title && (
            <h2 className={css.title}>
              {title} ({release_date.slice(0, 4)})
            </h2>
          )}
          <p className={css.text}> User Score: {Math.round(vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p className={css.text}>{overview}</p>
          <h3>Genres</h3>
          {genres && <p className={css.text}>{genres.map(({ name }) => name).join(', ')}</p>}
        </div>
      </div>

      <div>
        <h3 className={css.titleInfo}>Additional information</h3>
        <ul className={css.info}>
          <li>
            <Link to="cast" className={css.active}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" className={css.active}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
