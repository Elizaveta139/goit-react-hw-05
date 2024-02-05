import css from './MoviesList.module.css';

export default function MoviesList({ movies }) {
  return (
    <ul className={css.list}>
      {movies.map(({ id, title, poster_path }) => {
        return (
          <li key={id} className={css.item}>
            <img src={`https://image.tmdb.org/t/p/w200/${poster_path}`} alt={title} />
            <p>{title}</p>
          </li>
        );
      })}
    </ul>
  );
}
