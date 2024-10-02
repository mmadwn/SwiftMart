import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProductsAsync } from './productsSlicer';
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
                <Link key={product.id} to={`/products/${product.id}`} className="bg-white rounded-lg shadow-md p-4 flex flex-col"> {/* Wrap product in Link */}
                    <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-2 rounded" />
                    <h3 className="text-lg font-semibold truncate">{product.title}</h3>
                    <p className="text-blue-600 font-bold">${product.price}</p>
                    <p className="text-sm text-gray-600">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
                </Link>
            ))}
        </div>
    );
}
