import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader({ onLoading }) {
  return (
    <ThreeDots
      visible={onLoading}
      height="80"
      width="80"
      color="black"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        display: 'block',
        marginTop: '10px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      wrapperClass={css.testClass}
    />
  );
}
