import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMovieReviews } from '../../Api';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const [moviesReviews, setMovieReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;

    async function componentUpdate() {
      try {
        const fetchedData = await fetchMovieReviews(movieId);
        setMovieReviews(fetchedData.results);
      } catch (error) {
        console.error(error);
      }
    }
    componentUpdate();
  }, [movieId]);

  return (
    <section>
      {moviesReviews.length > 0 ? (
        <ul className={css.list}>
          {moviesReviews.map(({ id, author, content }) => {
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
      ) : (
        <p className={css.author}>We don`t have any review for this movie.</p>
      )}
    </section>
  );
}
