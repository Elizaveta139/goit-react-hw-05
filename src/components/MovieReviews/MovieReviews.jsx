import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { fetchMovieReviews } from '../../Api';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const [movieReviews, setMovieReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;

    async function componentUpdate() {
      try {
        setLoading(true);
        setError(false);

        const fetchedData = await fetchMovieReviews(movieId);
        setMovieReviews(fetchedData.results);
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
      {movieReviews.length > 0 && !loading && (
        <ul className={css.list}>
          {movieReviews.map(({ id, author, content }) => {
            return (
              <li key={id} className={css.item}>
                <p className={css.author}>
                  <b>AUTHOR: </b>
                  {author}
                </p>
                <p className={css.content}> {content}</p>
              </li>
            );
          })}
        </ul>
      )}
      {movieReviews.length === 0 && !loading && (
        <p className={css.author}>We don`t have any review for this movie.</p>
      )}
      {loading && <Loader onLoading={loading} />}
      {error && <ErrorMessage />}
    </section>
  );
}
