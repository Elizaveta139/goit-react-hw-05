import { HiSearch } from 'react-icons/hi';
import toast from 'react-hot-toast';
import css from './SearchBox.module.css';

export default function SearchBox({ onSearch }) {
  function handleSubmit(e) {
    e.preventDefault();

    const data = e.target.elements.query.value;
    console.log('data', data);

    if (data.trim() === '') {
      toast.error('Enter text to search for movies!');
      return;
    }

    onSearch(data);
    e.target.reset();
  }

  return (
    <div className={css.wrapper}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          placeholder="Please enter the name of the movie"
          name="query"
          autoComplete="off"
          autoFocus
        />

        <button type="submit" className={css.btnForm}>
          <HiSearch size="28" />
        </button>
      </form>
    </div>
  );
}
