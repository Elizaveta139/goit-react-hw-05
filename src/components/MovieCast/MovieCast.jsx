import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { fetchMovieCast } from '../../Api';
import css from './MovieCast.module.css';

const defaultImg =
  'https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352158-stock-illustration-default-placeholder-profile-icon.jpg';

export default function MovieCast() {
  const [movieCast, setMovieCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;

    async function componentUpdate() {
      try {
        setLoading(true);
        setError(false);

        const fetchedData = await fetchMovieCast(movieId);
        setMovieCast(fetchedData.cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    componentUpdate();
  }, [movieId]);

  return (
    <section>
      {movieCast.length > 0 && !loading && (
        <ul className={css.list}>
          {movieCast.map(({ id, name, character, profile_path }) => {
            return (
              <li key={id} className={css.item}>
                {profile_path ? (
                  <img src={`https://image.tmdb.org/t/p/w200/${profile_path}`} alt={name} />
                ) : (
                  <img src={defaultImg} alt={name} width="200" height="300" />
                )}
                <b className={css.info}>{name}</b>
                {character && (
                  <p className={css.info}>
                    {' '}
                    <b>Character:</b> {character}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {movieCast.length === 0 && !loading && (
        <p className={css.info}>We don`t have any cast for this movie.</p>
      )}

      {loading && <Loader onLoading={loading} />}
      {error && <ErrorMessage />}
    </section>
  );
}
