import { Link, useLocation } from 'react-router-dom';
import css from './MoviesList.module.css';

const defaultImg =
  'https://st2.depositphotos.com/2498595/6610/v/600/depositphotos_66109523-stock-illustration-blank-photo-outline-symbol-dark.jpg';

export default function MoviesList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map(({ id, title, poster_path }) => {
        return (
          <li key={id} className={css.item}>
            <Link to={`/movies/${id}`} state={{ from: location }}>
              {poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
                  alt={title}
                  width="200"
                  height="300"
                />
              ) : (
                <img src={defaultImg} alt={title} width="200" height="300" />
              )}

              <b className={css.name}>{title}</b>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
