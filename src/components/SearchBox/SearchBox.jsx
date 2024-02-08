import { HiSearch } from 'react-icons/hi';
import css from './SearchBox.module.css';

export default function SearchBox({ value, onChange }) {
  // function handleSubmit(e) {
  //   e.preventDefault();

  //   const data = e.target.elements.query.value;

  //   if (data.trim() === '') {
  //     toast.error('Enter text to search for images!');
  //     return;
  //   }

  //   onSearch(data);
  //   e.target.reset();
  // }

  return (
    <div className={css.wrapper}>
      <form className={css.form}>
        <input
          className={css.input}
          type="text"
          placeholder="Please enter the name of the movie"
          value={value}
          onChange={e => onChange(e.target.value)}
        />

        <button type="submit" className={css.btnForm}>
          <HiSearch size="28" />
        </button>
      </form>
    </div>
  );
}
