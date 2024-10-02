import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAsync } from '../features/products/productsSlicer';

export default function HomePage() {
  const dispatch = useDispatch();
  const menClothing = useSelector((state) => state.products.mensProducts);
  const womenClothing = useSelector((state) => state.products.womensProducts);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <div className="home-page flex flex-col">
      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="error text-center text-red-500">{error}</p>}
        
      <div className="video-container w-full mb-8">
        {/* Video element will be added here later */}
      </div>
      
      <div className="flex flex-col space-y-8">
        <section className="featured-section">
          <h2 className="text-2xl font-bold mb-4">Men&apos;s Clothing</h2>
          <div className="product-list flex flex-row overflow-x-auto space-x-4">
            {menClothing.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex-shrink-0 w-80">
                <img src={product.image} alt={product.title} className="w-full h-[30rem] object-cover mb-2 rounded" />
                <h3 className="text-lg font-semibold truncate">{product.title}</h3>
                <p className="text-blue-600 font-bold">${product.price}</p>
                <p className="text-sm text-gray-600">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
              </div>
            ))}
          </div>
        </section>

        <section className="new-this-week-section">
          <h2 className="text-2xl font-bold mb-4">Women&apos;s Clothing</h2>
          <div className="product-list flex flex-row overflow-x-auto space-x-4">
            {womenClothing.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex-shrink-0 w-72">
                <img src={product.image} alt={product.title} className="w-full h-56 object-cover mb-2 rounded" />
                <h3 className="text-lg font-semibold truncate">{product.title}</h3>
                <p className="text-blue-600 font-bold">${product.price}</p>
                <p className="text-sm text-gray-600">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
