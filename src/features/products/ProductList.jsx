import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProductsAsync } from './productsSlice'; // Import the async thunk
import PropTypes from 'prop-types';
import Spinner from '../../components/common/Spinner'; // Import Spinner
import ErrorPage from '../../components/common/ErrorPage'; // Import ErrorPage
import ProductItem from './ProductItem'; // Import the ProductItem component

export default function ProductList({ category }) {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);
    
    // Use the category to select the appropriate products
    const filteredProducts = useSelector(state => state.products[`${category}Products`] || []);

    useEffect(() => {
        dispatch(fetchProductsAsync());
    }, [dispatch]);

    // Ui for loading and error
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner message="Loading products..." /> {/* Show loading spinner with message */}
            </div>
        );
    }
    if (error) {
        return <ErrorPage errorMessage={error} />; // Show error page
    }

    // Ui for the Product List
    return (
        <div className="mx-auto p-8">
            <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="w-full">
                            <ProductItem product={product} /> {/* Use the ProductItem component */}
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-8">
                        <p className="text-xl text-gray-600 font-semibold sm:text-2xl md:text-3xl">No items available at the moment</p>
                        <p className="mt-2 text-gray-500">Please try another category or check back later.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

ProductList.propTypes = {
    category: PropTypes.string.isRequired,
};