import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../cart/cartSlice';
import { useEffect } from 'react';
import { fetchProductsAsync, setSelectedProduct } from './productsSlice';
import PropTypes from 'prop-types';
import Spinner from '../../components/common/Spinner';
import ErrorPage from '../../components/common/ErrorPage';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const product = useSelector((state) => state.products.allProducts.find(p => p.id === parseInt(id)));
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        dispatch(fetchProductsAsync());
    }, [dispatch]);

    useEffect(() => {
        if (product) {
            dispatch(setSelectedProduct(product));
        }
    }, [product, dispatch]);

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            navigate('/auth');
        } else {
            dispatch(addToCart({ ...product, quantity: 1 }));
        }
    };

    // Ui for loading and error
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner message="Loading product details..." /> {/* Show loading spinner with message */}
            </div>
        );
    }

    if (error || !product) {
        return <ErrorPage errorMessage="Product not found." />; // Show error page if product is not found
    }

    // UI for product details
    return (
        <div className="product-detail p-4 max-w-4xl mx-auto">
            <div className="flex items-center">
                <img src={product.image} alt={product.title} className="w-64 h-64 object-contain mb-8" />
                <div className="ml-8 flex-1">
                    <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
                    <p className="text-2xl text-blue-600 font-bold mb-4">${product.price}</p>
                    <div className="flex items-center mb-4">
                        <span className="text-yellow-500 mr-2">★</span>
                        <p className="text-gray-600">{product.rating.rate} ({product.rating.count} reviews)</p>
                    </div>
                    <p className="text-gray-700 mb-6">{product.description}</p>
                    {/* Display available quantity */}
                    <p className="text-lg font-semibold mb-4">Available Quantity: {product.quantity}</p>
                    <button 
                        onClick={handleAddToCart}
                        className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-full transition duration-300"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

// Add prop validation
ProductDetail.propTypes = {
    category: PropTypes.string
};

export default ProductDetail;
