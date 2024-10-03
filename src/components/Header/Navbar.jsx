import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Logo from "../../assets/images/logo.webp";
import { FaSearch } from "react-icons/fa";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate
  const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux store

  console.log(cartItems);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity

  const handleCartClick = () => {
    navigate("/cart"); // Navigate to CartPage; ProtectedRoute will handle authentication
  };

  return (
    <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 lg:px-12 py-2">
      <div className="flex items-center w-1/3">
        <div className="w-10 h-10 sm:w-12 sm:h-12">
          <Link to="/">
            <img src={Logo} alt="website logo" className="w-full h-full" />
          </Link>
        </div>
      </div>

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden text-gray-700 hover:text-gray-900"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <nav className={`${isMenuOpen ? 'block' : 'hidden'} w-1/3 lg:flex lg:items-center lg:w-auto mt-4 lg:mt-0`}>
        <ul className="flex flex-col lg:flex-row items-center justify-center gap-4 font-semibold">
          <li><Link to="/products/category/electronics" className="block py-2 lg:py-0">Electronics</Link></li> 
          <li><Link to="/products/category/jewelry" className="block py-2 lg:py-0">Jewelry</Link></li> 
          <li><Link to="/products/category/mens-clothing" className="block py-2 lg:py-0">Men&apos;s Clothing</Link></li> 
          <li><Link to="/products/category/womens-clothing" className="block py-2 lg:py-0">Women&apos;s Clothing</Link></li>
        </ul>
      </nav>

      <div className="flex items-center gap-4 mt-4 lg:mt-0 w-1/3 justify-end relative"> {/* Add relative positioning */}
        <div className="relative flex-grow max-w-xs">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-8 pr-2 py-1 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button onClick={handleCartClick} className="text-2xl text-gray-700 hover:text-gray-900 relative"> {/* Change Link to button */}
          <LiaShoppingBagSolid />
          {itemCount > 0 && ( // Show counter if there are items in the cart
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
