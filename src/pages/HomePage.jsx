import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync } from "../features/products/productsSlice";
import { FaStar } from "react-icons/fa"; 
import { Link } from "react-router-dom"; 
import video from "../assets/videos/hero.mp4"
import Spinner from "../components/common/Spinner"; 
import ErrorPage from "../components/common/ErrorPage"; 

export default function HomePage() {
  const dispatch = useDispatch();
  const menClothing = useSelector((state) => state.products.mensProducts);
  const womenClothing = useSelector((state) => state.products.womensProducts);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  // Ui for loading and error
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner message="Loading products..." />
      </div>
    );
  }

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  // Ui for the Home Page
  return (
    <div className="home-page flex flex-col bg-white text-gray-800">
      <div className="video-container w-full mb-8 relative">
        <section className="video-section">
          <video
            src={video}
            autoPlay
            loop
            muted
            className="w-full h-[90vh] object-cover" // Changed height to 80vh
          />
        </section>

        <section className="text-section absolute bottom-0 left-0 w-full p-8 bg-black bg-opacity-50 text-white">
          <p className="text-sm mb-2">New Arrivals</p>
          <h2 className="text-4xl font-bold mb-2">
            &ldquo;Discover Your Signature Style&rdquo;
          </h2>
          <p className="text-sm mb-4">
            &ldquo;Wear confidence. It&apos;s the perfect fit for every
            occasion.&rdquo;
          </p>
          <Link to="/products" className="inline-block">
            <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
              Shop Now
            </button>
          </Link>
        </section>
      </div>

      <div className="flex flex-col space-y-8 px-4">
        <section className="featured-section">
          <h2 className="text-2xl font-bold mb-4">Men&apos;s Clothing</h2>
          <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {" "}
            {/* Use grid layout for products */}
            {menClothing.map((product) => (
              <Link
                to={`/products/${product.id}`}
                key={product.id}
                className="border border-transparent hover:border-black rounded-lg p-4 transition-all duration-300"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-auto h-96 object-cover mb-2 rounded"
                />
                <h3 className="text-lg font-semibold truncate">
                  {product.title}
                </h3>
                <p className="text-blue-600 font-bold">${product.price}</p>
                <p className="text-sm text-gray-600 flex items-center">
                  <FaStar className="text-yellow-500 mr-1" />
                  {product.rating.rate} ({product.rating.count} reviews)
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="new-this-week-section">
          <h2 className="text-2xl font-bold mb-4">Women&apos;s Clothing</h2>
          <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {" "}
            {/* Use grid layout for products */}
            {womenClothing.map((product) => (
              <Link
                to={`/products/${product.id}`}
                key={product.id}
                className="border border-transparent hover:border-black rounded-lg p-4 transition-all duration-300"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-auto h-72 object-cover mb-2 rounded"
                />
                <h3 className="text-lg font-semibold truncate">
                  {product.title}
                </h3>
                <p className="text-blue-600 font-bold">${product.price}</p>
                <p className="text-sm text-gray-600 flex items-center">
                  <FaStar className="text-yellow-500 mr-1" />
                  {product.rating.rate} ({product.rating.count} reviews)
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
