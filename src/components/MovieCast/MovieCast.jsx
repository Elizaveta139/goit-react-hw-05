import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMovieCast } from '../../Api';
import css from './MovieCast.module.css';

const defaultImg = '../../assets/default-placeholder-profile-icon-vector-14065264.png';

export default function MovieCast() {
  const [moviesCast, setMovieCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;

    async function componentUpdate() {
      try {
        const fetchedData = await fetchMovieCast(movieId);
        setMovieCast(fetchedData.cast);
      } catch (error) {
        console.error(error);
      }
    }
    componentUpdate();
  }, [movieId]);

  return (
    <section>
      <ul className={css.list}>
        {moviesCast.map(({ id, name, character, profile_path }) => {
          return (
            <li key={id} className={css.item}>
              {profile_path ? (
                <img src={`https://image.tmdb.org/t/p/w200/${profile_path}`} alt={name} />
              ) : (
                <img src={defaultImg} alt={name} width="200" />
              )}
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
