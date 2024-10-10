import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync } from "../features/products/productsSlice";
import { Link } from "react-router-dom";
import video from "../assets/videos/hero.mp4";
import Spinner from "../components/common/Spinner";
import ErrorPage from "../components/common/ErrorPage";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProductItem from "../features/products/ProductItem"; 

export default function HomePage() {
  const dispatch = useDispatch();
  const menClothing = useSelector((state) => state.products.mensProducts);
  const womenClothing = useSelector((state) => state.products.womensProducts);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  // State to manage scrollbar visibility
  const [isMenScrollbarVisible, setMenScrollbarVisible] = useState(false);
  const [isWomenScrollbarVisible, setWomenScrollbarVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  // UI for loading and error
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

  // UI for the Home Page
  return (
    <div className="home-page bg-white text-gray-800">
      {/* Hero Section */}
      <section className="hero-section px-10">
        <div className="hero-container">
          {/* Video Section */}
          <div className="video-container h-screen">
            <video
              src={video}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
          </div>
          {/* Text Section */}
          <div className="text-section bg-white py-12">
            <div className="container mx-auto text-center">
              <p className="text-sm mb-2">New Arrivals</p>
              <h1 className="text-5xl font-bold mb-4">
                Discover Your Signature Style
              </h1>
              <p className="text-lg mb-6">
                Wear confidence. It&apos;s the perfect fit for every occasion.
              </p>
              <Link to="/products" className="inline-block">
                <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors text-lg font-semibold">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <div className="featured-section mx-auto py-16 px-10">
        {/* Men Section */}
        <section className="men-section mb-16">
          <div className="flex justify-between items-center mb-8 px-10">
            <h2 className="text-3xl font-bold">Men&apos;s Clothing</h2>
            <div className="flex space-x-4">
              <button
                className="bg-gray-200 p-3 rounded-full text-xl hover:bg-gray-300 transition-colors"
                aria-label="Scroll products left"
                onClick={() => {
                  const container = document.querySelector(".men-product-list");
                  container.scrollBy({ left: -400, behavior: "smooth" });
                }}
              >
                <IoIosArrowBack />
              </button>
              <button
                className="bg-gray-200 p-3 rounded-full text-xl hover:bg-gray-300 transition-colors"
                aria-label="Scroll products right"
                onClick={() => {
                  const container = document.querySelector(".men-product-list");
                  container.scrollBy({ left: 400, behavior: "smooth" });
                }}
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>

          {/* Product Items */}
          <div
            className={`men-product-list flex overflow-x-auto space-x-12 pb-8 scroll-smooth px-10 ${
              isMenScrollbarVisible ? "scrollbar-visible" : "scrollbar-hide"
            }`}
            onMouseEnter={() => setMenScrollbarVisible(true)} // Show scrollbar on mouse enter
            onMouseLeave={() => setMenScrollbarVisible(false)} // Hide scrollbar on mouse leave
          >
            {menClothing.map((product) => (
              <ProductItem product={product} key={product.id} /> // Use the new ProductItem component
            ))}
          </div>
        </section>

        {/* Women Section */}
        <section className="women-section">
          <div className="flex justify-between items-center mb-8 px-10">
            <h2 className="text-3xl font-bold">Women&apos;s Clothing</h2>
            <div className="flex space-x-4">
              <button
                className="bg-gray-200 p-3 rounded-full text-xl hover:bg-gray-300 transition-colors"
                aria-label="Scroll products left"
                onClick={() => {
                  const container = document.querySelector(".women-product-list");
                  container.scrollBy({ left: -400, behavior: "smooth" });
                }}
              >
                <IoIosArrowBack />
              </button>
              <button
                className="bg-gray-200 p-3 rounded-full text-xl hover:bg-gray-300 transition-colors"
                aria-label="Scroll products right"
                onClick={() => {
                  const container = document.querySelector(".women-product-list");
                  container.scrollBy({ left: 400, behavior: "smooth" });
                }}
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>

          {/* Product Items */}
          <div
            className={`women-product-list flex overflow-x-auto space-x-12 pb-8 scroll-smooth px-10 ${
              isWomenScrollbarVisible ? "scrollbar-visible" : "scrollbar-hide"
            }`}
            onMouseEnter={() => setWomenScrollbarVisible(true)}
            onMouseLeave={() => setWomenScrollbarVisible(false)}
          >
            {womenClothing.map((product) => (
              <ProductItem product={product} key={product.id} /> // Use the new ProductItem component
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}