import { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import AppBar from '../AppBar/AppBar';
import Home from '../../pages/Home';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';
import NotFound from '../../pages/NotFound';

import css from './App.module.css';

export default function App() {
  return (
    <>
      <div className={css.container}>
        <AppBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
