import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { FaSearch } from "react-icons/fa";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { useState } from "react";
import { useSelector } from "react-redux";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 lg:px-12 py-2">
      {/*Left side of the navbar */}
      <div className="flex items-center w-full sm:w-1/3 mb-4 sm:mb-0">
        <Link to="/" className="w-16 sm:w-20 sm:h-20 flex-shrink-0">
          <img
            src={Logo}
            alt="website logo"
            className="w-full h-full object-contain"
          />
        </Link>
      </div>

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="sm:hidden text-gray-700 hover:text-gray-900 absolute right-4 top-4"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/*Center side of the navbar */}
      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } w-full sm:w-1/3 sm:flex sm:items-center sm:justify-center mt-4 sm:mt-0`}
      >
        <ul className="flex flex-col sm:flex-row items-center justify-center gap-4 font-semibold">
          {["Electronics", "Jewelry", "Men's Clothing", "Women's Clothing"].map(
            (category) => (
              <li key={category}>
                <Link
                  to={`/products/category/${category
                    .toLowerCase()
                    .replace("'s", "s")
                    .replace(" ", "-")}`}
                  className="block py-2 sm:py-0 relative group"
                >
                  <span className="relative inline-block">
                    {category}
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>

      {/*Right side of the navbar */}
      <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full sm:w-1/3 justify-end">
        <div className="relative flex-grow max-w-xs">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-8 pr-2 py-1 rounded-full border border-gray-300 focus:outline-none focus:border-black hover:bg-gray-100"
          />
        </div>
        <button
          onClick={handleCartClick}
          className="text-2xl text-gray-700 hover:bg-gray-200 p-1 rounded-full relative"
        >
          <LiaShoppingBagSolid />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
