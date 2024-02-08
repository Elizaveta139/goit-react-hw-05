import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppBar from '../AppBar/AppBar';
import NotFound from '../../pages/NotFound/NotFound';
import Loader from '../Loader/Loader';

import css from './App.module.css';

const Home = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));

export default function App() {
  return (
    <>
      <AppBar />
      <div className={css.container}>
        <Suspense fallback={<Loader onLoading={true} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="movies" element={<MoviesPage />} />
            <Route path="movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}
