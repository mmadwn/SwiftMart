import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

function ProductItem({ product }) {
  return (
    <Link to={`/products/${product.id}`} key={product.id} className="flex-shrink-0 w-96 group">
      <div className="w-full h-96 mb-4 rounded-lg overflow-hidden p-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="text-xl font-semibold truncate mb-2">{product.title}</h3>
      <p className="text-blue-600 font-bold text-2xl mb-2">${product.price.toFixed(2)}</p>
      <p className="text-base text-gray-600 flex items-center">
        <FaStar className="text-yellow-500 mr-2" />
        {product.rating.rate} ({product.rating.count} reviews)
      </p>
    </Link>
  );
}

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductItem;
