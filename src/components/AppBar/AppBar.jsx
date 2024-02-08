import { NavLink, Outlet, Link } from 'react-router-dom';
import { BiSolidCameraMovie } from 'react-icons/bi';
import clsx from 'clsx';
import css from './AppBar.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function AppBar() {
  return (
    <header className={css.header}>
      <Link to="/" className={css.logo}>
        <BiSolidCameraMovie size="35" /> Film library
      </Link>

      <nav className={css.nav}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          Movies
        </NavLink>
      </nav>

      <Outlet />
    </header>
  );
}
