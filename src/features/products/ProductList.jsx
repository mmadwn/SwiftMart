import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProductsAsync } from './productsSlice';
import { Link } from 'react-router-dom'; // Import Link

export default function ProductList() {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products.allProducts);
    console.log(allProducts);

    useEffect(() => {
        dispatch(fetchProductsAsync());
    }, [dispatch]);

    return (
        <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {allProducts.map((product) => (
                <Link key={product.id} to={`/products/${product.id}`} className="flex flex-col"> {/* Removed background and border */}
                    <img src={product.image} alt={product.title} className="w-48 h-auto object-cover mb-2 rounded" /> {/* Ensure image fits well */}
                    <h3 className="text-lg font-semibold truncate">{product.title}</h3>
                    <p className="text-blue-600 font-bold">${product.price}</p>
                    <p className="text-sm text-gray-600">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
                </Link>
            ))}
        </div>
    );
}
