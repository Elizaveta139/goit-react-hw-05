import { useState, useEffect, Suspense, useRef } from 'react';
import { useParams, useLocation, NavLink, Outlet } from 'react-router-dom';
import { FaArrowDown } from 'react-icons/fa';
import clsx from 'clsx';
import { BackLink } from '../../components/BackLink/BackLink';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { fetchMovieDetails } from '../../Api';
import css from './MovieDetailsPage.module.css';

const defaultImg =
  'https://st2.depositphotos.com/2498595/6610/v/600/depositphotos_66109523-stock-illustration-blank-photo-outline-symbol-dark.jpg';

export default function MovieDetailsPage() {
  const [moviesDetails, setMoviesDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const movie = fetchMovieDetails(movieId);
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? '/movies');

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  useEffect(() => {
    if (!movieId) return;

    async function componentUpdate() {
      try {
        setLoading(true);
        setError(false);

        const fetchedData = await fetchMovieDetails(movieId);
        setMoviesDetails(fetchedData);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    componentUpdate();
  }, [movieId]);

  const { genres, poster_path, overview, release_date, vote_average, title } = moviesDetails;

  return (
    <div>
      <BackLink to={backLinkHref.current}>Back to movies</BackLink>
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
          {genres && (
            <div>
              <h3>Genres</h3>
              <p className={css.text}>{genres.map(({ name }) => name).join(', ')}</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className={css.titleInfo}>Additional information</h3>
        <ul className={css.info}>
          <li>
            <NavLink to="cast" className={buildLinkClass}>
              Cast <FaArrowDown className={css.icon} />
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={buildLinkClass}>
              Reviews <FaArrowDown className={css.icon} />
            </NavLink>
          </li>
        </ul>
      </div>

      {loading && <Loader onLoading={loading} />}
      {error && <ErrorMessage />}

      <Suspense fallback={<Loader onLoading={loading} />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
