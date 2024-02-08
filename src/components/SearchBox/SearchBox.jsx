import { HiSearch } from 'react-icons/hi';
import css from './SearchBox.module.css';

export default function SearchBox({ value, onChange }) {
  return (
    <div className={css.wrapper}>
      <input
        className={css.input}
        type="text"
        placeholder="Please enter the name of the movie"
        value={value}
        onChange={e => onChange(e.target.value)}
      />

      <button type="submit" className={css.btnForm}>
        <HiSearch size="24" />
      </button>
    </div>
  );
}
