import { Link } from 'react-router-dom';
import css from './NotFound.module.css';

export default function NotFound() {
  return (
    <>
      <p className={css.notFound}>NotFound page</p>
      <Link to="/" className={css.active}>
        Go to the home page
      </Link>
    </>
  );
}
