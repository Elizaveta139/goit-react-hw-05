import { Link, useLocation } from 'react-router-dom';
import css from './MoviesList.module.css';

const defaultImg = '<https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700>';

export default function MoviesList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map(({ id, title, poster_path }) => {
        return (
          <li key={id} className={css.item}>
            <Link to={`${id}`} state={{ from: location }}>
              {poster_path ? (
                <img src={`https://image.tmdb.org/t/p/w200/${poster_path}`} alt={title} />
              ) : (
                <img src={defaultImg} alt={title} width="200" />
              )}

              <p>{title}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
