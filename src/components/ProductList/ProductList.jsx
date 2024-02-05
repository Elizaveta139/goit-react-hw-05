import { Link, useLocation } from 'react-router-dom';
import css from './ProductList.module.css';

export const ProductList = ({ products }) => {
  const location = useLocation();

  return (
    <div className={css.container}>
      {products.map(product => (
        <div key={product.id} className={css.cardWrapper}>
          <Link to={`${product.id}`} state={{ from: location }}>
            <img src="https://via.placeholder.com/200x100" alt="" />
            <h3 className={css.productName}>{product.name}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};
