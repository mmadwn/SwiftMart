import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.webp"
import { FaSearch } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';

function Navbar() {
  return (
    <div className="flex items-center justify-between px-6">
      <div className="w-20 h-20">
        <Link to="/">
          <img src={Logo} alt="website logo" />
        </Link>
      </div>

      <nav className="flex-grow">
        <ul className="flex items-center justify-center gap-4">
          <li>
            <Link to="/">Electronics</Link>
          </li>
          <li>
            <Link to="/">Jewelry</Link>
          </li>
          <li>
            <Link to="/">Men&apos;s Clothing</Link>
          </li>
          <li>
            <Link to="/">Women&apos;s Clothing</Link>
          </li>
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-2 py-1 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Link to="/cart" className="text-2xl text-gray-700 hover:text-gray-900">
          <IoCartOutline />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
